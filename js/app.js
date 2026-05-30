// app.js — Main application logic. Entry point.

var profile = null;
var messages = [];
var sessions = [];
var documents = [];
var isLoading = false;
var contextBlock = "";
var sessionSaved = false;

function countUserMessages() {
  return messages.filter(function(m) { return m.role === "user"; }).length;
}

function saveSession() {
  if (countUserMessages() < 2) return Promise.resolve();
  var msgs = messages.slice();
  var ctx = contextBlock;
  return generateSessionSummary(msgs, ctx)
    .then(function(summary) {
      var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      var entry = {
        _id: Date.now(),
        date: today,
        summary: summary,
        messageCount: msgs.length
      };
      sessions.push(entry);
      return db.push("ca8_sessions", entry).then(function(result) {
        if (!result) {
          console.warn("[app] Session save to Firebase failed");
          showWarningBanner("Could not save session — changes may not persist");
        }
        // Update session count in header
        updateSessionCount();
      });
    })
    .catch(function(err) {
      console.warn("[app] saveSession error:", err);
    });
}

function updateSessionCount() {
  var el = document.getElementById("session-count");
  if (el) el.textContent = sessions.length + " session" + (sessions.length !== 1 ? "s" : "");
}

function detectDocument(text) {
  if (text.length < 600) return false;
  var keywords = ["talking points", "promotion case", "self-review", "skill plan", "skill development plan", "compensation prep", "negotiation prep", "performance review"];
  var lower = text.toLowerCase();
  return keywords.some(function(kw) { return lower.indexOf(kw) !== -1; });
}

function inferDocumentType(text) {
  var lower = text.toLowerCase();
  if (lower.indexOf("talking points") !== -1) return "talking points";
  if (lower.indexOf("promotion case") !== -1) return "promotion case";
  if (lower.indexOf("self-review") !== -1 || lower.indexOf("performance review") !== -1) return "self-review";
  if (lower.indexOf("skill") !== -1 && lower.indexOf("plan") !== -1) return "skill plan";
  if (lower.indexOf("compensation") !== -1 || lower.indexOf("negotiation") !== -1) return "compensation prep";
  return "other";
}

function saveDocument(content) {
  var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  var type = inferDocumentType(content);
  var titleMap = {
    "talking points": "Talking Points",
    "promotion case": "Promotion Case",
    "self-review": "Self-Review Content",
    "skill plan": "Skill Development Plan",
    "compensation prep": "Compensation Negotiation Prep",
    "other": "Document"
  };
  var doc = {
    _id: Date.now(),
    date: today,
    type: type,
    title: titleMap[type] + " — " + today,
    content: content,
    version: 1
  };
  documents.push(doc);
  return db.push("ca8_documents", doc).then(function(result) {
    if (!result) console.warn("[app] Document save failed");
    renderDocuments(documents);
  });
}

function sendMessage() {
  var input = document.getElementById("chat-input");
  if (!input) return;
  var text = input.value.trim();
  if (!text || isLoading) return;

  input.value = "";
  input.style.height = "auto";
  isLoading = true;
  var sendBtn = document.getElementById("send-btn");
  if (sendBtn) sendBtn.disabled = true;

  messages.push({ role: "user", content: text });
  renderMessage("user", text);
  showTypingIndicator();

  var apiMsgs = buildApiMessages(messages, contextBlock);

  callClaude(apiMsgs)
    .then(function(reply) {
      hideTypingIndicator();
      renderMessage("assistant", reply);
      messages.push({ role: "assistant", content: reply });

      if (detectDocument(reply)) {
        saveDocument(reply);
      }

      var userCount = countUserMessages();
      if (userCount > 0 && userCount % 6 === 0) {
        saveSession().then(function() { sessionSaved = true; });
      }
    })
    .catch(function(err) {
      hideTypingIndicator();
      var msg = err.message || "Unknown error";
      if (msg.indexOf("401") !== -1 || msg.toLowerCase().indexOf("auth") !== -1 || msg.toLowerCase().indexOf("invalid") !== -1) {
        showWarningBanner("API key issue — check your config.js");
      } else if (msg.indexOf("429") !== -1 || msg.toLowerCase().indexOf("rate") !== -1 || msg.toLowerCase().indexOf("credit") !== -1 || msg.toLowerCase().indexOf("billing") !== -1) {
        showWarningBanner("API credit exhausted — add credit at console.anthropic.com");
      } else {
        showWarningBanner("Send failed: " + msg);
      }
      renderMessage("assistant", "I ran into an issue — try sending again.");
    })
    .finally(function() {
      isLoading = false;
      if (sendBtn) sendBtn.disabled = false;
      if (input) input.focus();
    });
}

function getProfileWithRetry(attempt) {
  attempt = attempt || 0;
  return db.get("ca8_profile").then(function(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return db.set("ca8_profile", SEED_PROFILE).then(function() { return SEED_PROFILE; });
    }
    return data;
  }).catch(function(err) {
    if (attempt < 3) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          getProfileWithRetry(attempt + 1).then(resolve).catch(reject);
        }, 2000);
      });
    }
    console.warn("[app] Firebase unavailable after retries:", err);
    showWarningBanner("Firebase unavailable — using local profile. Check your network.");
    return SEED_PROFILE;
  });
}

function init() {
  if (typeof window.CADE_CONFIG === "undefined") {
    showSetupScreen();
    return;
  }

  showLoadingScreen();

  getProfileWithRetry(0)
    .then(function(p) {
      profile = p;
      return Promise.all([
        db.get("ca8_sessions").then(function(s) { sessions = s || []; }),
        db.get("ca8_documents").then(function(d) { documents = d || []; })
      ]);
    })
    .then(function() {
      contextBlock = buildContextBlock(profile, sessions);
      updateSessionCount();
      return generateGreeting(profile, sessions);
    })
    .then(function(greeting) {
      hideLoadingScreen();
      setTabActive("coach");
      renderMessage("assistant", greeting);
      messages.push({ role: "assistant", content: greeting });
      var input = document.getElementById("chat-input");
      if (input) input.focus();
    })
    .catch(function(err) {
      hideLoadingScreen();
      setTabActive("coach");
      renderMessage("assistant", FALLBACK_GREETING);
      messages.push({ role: "assistant", content: FALLBACK_GREETING });
      showWarningBanner("Error during startup: " + (err.message || "unknown error"));
      var input = document.getElementById("chat-input");
      if (input) input.focus();
    });
}

// Wire up event listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {

  // Send button
  var sendBtn = document.getElementById("send-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", function() { sendMessage(); });
  }

  // Chat input — Enter to send, Shift+Enter for newline, auto-resize
  var chatInput = document.getElementById("chat-input");
  if (chatInput) {
    chatInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    chatInput.addEventListener("input", function() {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 160) + "px";
    });
  }

  // Tab navigation
  var tabBtns = document.querySelectorAll(".tab-btn");
  var currentTab = "coach";
  tabBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var newTab = this.getAttribute("data-tab");
      if (newTab === currentTab) return;

      // Save session when leaving coach tab if enough messages
      if (currentTab === "coach" && countUserMessages() >= 3 && !sessionSaved) {
        saveSession().then(function() { sessionSaved = true; });
      }

      currentTab = newTab;
      setTabActive(newTab);

      if (newTab === "profile" && profile) {
        renderProfile(profile);
      }
      if (newTab === "documents") {
        renderDocuments(documents);
      }
    });
  });

  // Warning banner dismiss
  var bannerClose = document.getElementById("banner-close");
  if (bannerClose) {
    bannerClose.addEventListener("click", function() { hideWarningBanner(); });
  }

  // Boot
  init();
});
