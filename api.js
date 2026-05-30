// api.js — All Claude API calls. No system parameter — context injected into first user message.

var FALLBACK_GREETING = "Your MBA is done and the 8-week clock on your director's maternity leave is running. The data science role conversation hasn't been re-initiated since you finished your degree. What are we working on today?";

function buildApiMessages(conversationMessages, contextBlock) {
  var firstUserIdx = -1;
  for (var i = 0; i < conversationMessages.length; i++) {
    if (conversationMessages[i].role === "user") { firstUserIdx = i; break; }
  }
  if (firstUserIdx === -1) return [];
  var msgs = conversationMessages.slice(firstUserIdx);
  return msgs.map(function(m, i) {
    return {
      role: m.role,
      content: i === 0 ? (contextBlock + "\n\n---\n\n" + m.content) : m.content
    };
  });
}

function callClaudeWithRetry(messages, attempt) {
  attempt = attempt || 0;
  var delays = [2000, 5000, 10000];

  var totalChars = messages.reduce(function(sum, m) { return sum + (m.content || "").length; }, 0);
  if (totalChars > 150000) {
    var context = messages[0];
    var trimmed = messages.slice(Math.max(1, messages.length - 6));
    messages = [context].concat(trimmed);
    console.warn("[api] Context trimmed to manage window size");
  }

  return fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: CADE_CONFIG.model,
      max_tokens: 1000,
      messages: messages
    }),
    signal: AbortSignal.timeout ? AbortSignal.timeout(30000) : undefined
  })
    .then(function(res) {
      return res.text().then(function(text) {
        var data;
        try { data = JSON.parse(text); } catch(e) { throw new Error("Invalid JSON response from API"); }

        if (data.error) {
          var errType = data.error.type || "";
          if ((data.error.status === 429 || errType === "rate_limit_error" || errType === "overloaded_error") && attempt < 3) {
            return new Promise(function(resolve, reject) {
              setTimeout(function() {
                callClaudeWithRetry(messages, attempt + 1).then(resolve).catch(reject);
              }, delays[attempt]);
            });
          }
          throw new Error(data.error.message || "API error");
        }

        if (!data.content || !data.content[0] || !data.content[0].text) {
          console.warn("[api] Unexpected response shape", text.slice(0, 200));
          throw new Error("No response text from API");
        }
        return data.content[0].text;
      });
    });
}

function callClaude(messages) {
  return callClaudeWithRetry(messages, 0);
}

function generateGreeting(profile, sessionSummaries) {
  var ctx = buildContextBlock(profile, sessionSummaries);
  var isFirst = !sessionSummaries || sessionSummaries.length === 0;
  var prompt;
  if (isFirst) {
    prompt = ctx + "\n\n---\n\nThis is the very first session with Brandon. Generate a 2-3 sentence opening coaching message that acknowledges what you already know from his profile, surfaces the single most urgent item right now, and invites him to confirm details or dive in. Do not use his name. Be specific, not generic.";
  } else {
    prompt = ctx + "\n\n---\n\nGenerate a 2-3 sentence opening coaching message. Open with something specific to Brandon's current situation — not a generic greeting. Do not use his name. Reference something real and urgent that is happening in his career right now. End with a natural invitation to engage.";
  }

  return callClaude([{ role: "user", content: prompt }])
    .catch(function(err) {
      console.warn("[api] Greeting generation failed:", err.message);
      return FALLBACK_GREETING;
    });
}

function generateSessionSummary(messages, contextBlock) {
  var apiMsgs = buildApiMessages(messages, contextBlock);
  if (apiMsgs.length === 0) return Promise.resolve("Session summary unavailable");

  var summaryRequest = { role: "user", content: "In one sentence, summarize what was discussed in this coaching session and any actions agreed upon." };
  var fullMsgs = apiMsgs.concat([summaryRequest]);

  return callClaude(fullMsgs)
    .catch(function() { return "Session summary unavailable"; });
}
