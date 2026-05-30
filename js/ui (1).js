// ui.js — All DOM rendering. No direct Firebase or API calls.

function renderMessage(role, content) {
  var container = document.getElementById("messages-container");
  if (!container) return;

  var wrapper = document.createElement("div");
  wrapper.className = "message-wrapper " + (role === "user" ? "message-user-wrapper" : "message-assistant-wrapper");

  if (role === "assistant") {
    var avatar = document.createElement("div");
    avatar.className = "cade-avatar";
    avatar.textContent = "C";
    wrapper.appendChild(avatar);
  }

  var bubble = document.createElement("div");
  bubble.className = role === "user" ? "message-bubble message-user" : "message-bubble message-assistant";
  bubble.textContent = content;
  wrapper.appendChild(bubble);

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  var container = document.getElementById("messages-container");
  if (!container || document.getElementById("typing-indicator")) return;

  var wrapper = document.createElement("div");
  wrapper.id = "typing-indicator";
  wrapper.className = "message-wrapper message-assistant-wrapper";

  var avatar = document.createElement("div");
  avatar.className = "cade-avatar";
  avatar.textContent = "C";
  wrapper.appendChild(avatar);

  var bubble = document.createElement("div");
  bubble.className = "message-bubble message-assistant typing-bubble";
  bubble.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  wrapper.appendChild(bubble);

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
  var el = document.getElementById("typing-indicator");
  if (el) el.parentNode.removeChild(el);
}

function showWarningBanner(message) {
  var banner = document.getElementById("warning-banner");
  if (!banner) return;
  var textEl = banner.querySelector(".warning-text");
  if (textEl) textEl.textContent = message;
  banner.style.display = "flex";
}

function hideWarningBanner() {
  var banner = document.getElementById("warning-banner");
  if (banner) banner.style.display = "none";
}

function setTabActive(tabName) {
  var buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(function(btn) { btn.classList.remove("active"); });
  var active = document.querySelector("[data-tab='" + tabName + "']");
  if (active) active.classList.add("active");

  var panels = document.querySelectorAll(".tab-panel");
  panels.forEach(function(p) { p.style.display = "none"; });
  var panel = document.getElementById("panel-" + tabName);
  if (panel) panel.style.display = "flex";
}

function renderProfile(profile) {
  var container = document.getElementById("profile-content");
  if (!container) return;
  container.innerHTML = "";

  if (!profile) {
    container.innerHTML = '<p class="empty-state">Profile not loaded.</p>';
    return;
  }

  // Org situation urgency card
  var org = profile.organizationalSituation || {};
  if (org.urgencyNote) {
    var urgCard = document.createElement("div");
    urgCard.className = "urgency-card";
    urgCard.innerHTML = "<strong>⚠ Urgent Situation</strong><p>" + escapeHtml(org.urgencyNote) + "</p>";
    if (org.managerStatus) urgCard.innerHTML += "<p><strong>Manager:</strong> " + escapeHtml(org.managerStatus) + "</p>";
    if (org.directorStatus) urgCard.innerHTML += "<p><strong>Director:</strong> " + escapeHtml(org.directorStatus) + "</p>";
    container.appendChild(urgCard);
  }

  // Identity
  var id = profile.identity || {};
  var idHtml = "<p><strong>Role:</strong> " + esc(id.currentRole) + " at " + esc(id.organization) + "</p>" +
    "<p><strong>Location:</strong> " + esc(id.location) + "</p>" +
    "<p><strong>Tenure:</strong> " + esc(id.tenureStart) + " to present</p>" +
    "<p><strong>Email:</strong> " + esc(id.email) + "</p>";
  container.appendChild(makeCard("Professional Identity", idHtml, true));

  // Education
  var edu = profile.education || [];
  var eduHtml = edu.map(function(e) {
    return "<p><strong>" + esc(e.degree) + "</strong> — " + esc(e.institution) +
      (e.completed ? " (completed " + esc(e.completed) + ")" : "") +
      (e.graduated ? " (graduated " + esc(e.graduated) + ")" : "") +
      (e.gpa ? ", GPA " + esc(e.gpa) : "") +
      (e.honors ? " — " + esc(e.honors) : "") + "</p>";
  }).join("");
  container.appendChild(makeCard("Education", eduHtml, true));

  // Target Roles
  var roles = profile.targetRoles || [];
  var rolesHtml = roles.map(function(r) {
    var badge = (r.triggerMet && !r.reEngaged) ?
      '<span class="badge badge-action">Re-engage now</span>' : "";
    var statusBadge = '<span class="badge badge-status">' + esc(r.status) + '</span>';
    return '<div class="role-card">' +
      '<div class="role-header">' + statusBadge + badge + '<strong>' + esc(r.title) + '</strong></div>' +
      '<p>' + esc(r.description) + '</p>' +
      (r.decisionMakers && r.decisionMakers.length > 0 ? '<p><strong>Decision-makers:</strong> ' + esc(r.decisionMakers.join(", ")) + '</p>' : '') +
      (r.lastConversation ? '<p><strong>Last conversation:</strong> ' + esc(r.lastConversation) + '</p>' : '') +
      (r.agreedTrigger ? '<p><strong>Agreed trigger:</strong> ' + esc(r.agreedTrigger) + ' | Trigger met: ' + (r.triggerMet ? '✓ Yes' : 'No') + ' | Re-engaged: ' + (r.reEngaged ? 'Yes' : '✗ No') + '</p>' : '') +
      (r.notes ? '<p class="role-note">' + esc(r.notes) + '</p>' : '') +
      '</div>';
  }).join("");
  container.appendChild(makeCard("Target Roles", rolesHtml, true));

  // Skills
  var skills = profile.skills || {};
  var skillsHtml = "";
  if ((skills.current || []).length > 0) {
    skillsHtml += '<h4 class="skill-heading skill-strength">Strengths</h4><ul>';
    (skills.current || []).forEach(function(s) {
      skillsHtml += '<li><strong>' + esc(s.name) + '</strong> [' + esc(s.level) + ']' + (s.context ? ' — ' + esc(s.context) : '') + '</li>';
    });
    skillsHtml += '</ul>';
  }
  if ((skills.inProgress || []).length > 0) {
    skillsHtml += '<h4 class="skill-heading skill-progress">In Progress</h4><ul>';
    (skills.inProgress || []).forEach(function(s) {
      skillsHtml += '<li><strong>' + esc(s.name) + '</strong> — ' + esc(s.level) + ' (priority: ' + esc(s.priority) + ')</li>';
    });
    skillsHtml += '</ul>';
  }
  if ((skills.gaps || []).length > 0) {
    skillsHtml += '<h4 class="skill-heading skill-gap">Gaps</h4><ul>';
    (skills.gaps || []).forEach(function(s) {
      skillsHtml += '<li class="gap-' + esc(s.priority) + '"><strong>[' + esc(s.priority).toUpperCase() + ']</strong> ' + esc(s.name) + (s.context ? ' — ' + esc(s.context) : '') + '</li>';
    });
    skillsHtml += '</ul>';
  }
  container.appendChild(makeCard("Skills", skillsHtml, false));

  // Accomplishments
  var acc = profile.accomplishments || [];
  if (acc.length > 0) {
    var accHtml = '<p class="acc-note">Most entries need quantification — a key coaching priority.</p><ul>';
    acc.forEach(function(a) {
      accHtml += '<li>' + esc(a.description) +
        (a.metrics ? ' <span class="acc-metric">' + esc(a.metrics) + '</span>' : '') +
        (!a.quantified ? ' <span class="acc-unquantified">needs numbers</span>' : '') + '</li>';
    });
    accHtml += '</ul>';
    container.appendChild(makeCard("Accomplishments Library", accHtml, false));
  }

  // Goals
  var goals = profile.goals || {};
  var goalsHtml = "";
  if (goals.shortTerm) goalsHtml += '<p><strong>Short-term:</strong> ' + esc(goals.shortTerm) + '</p>';
  if (goals.mediumTerm) goalsHtml += '<p><strong>Medium-term:</strong> ' + esc(goals.mediumTerm) + '</p>';
  if (goals.longTerm) goalsHtml += '<p><strong>Long-term:</strong> ' + esc(goals.longTerm) + '</p>';
  if (goalsHtml) container.appendChild(makeCard("Goals", goalsHtml, false));

  // Compensation
  var comp = profile.compensation || {};
  var compHtml = '<p><strong>Current:</strong> ' + (comp.current ? '$' + comp.current : 'Not captured') + '</p>';
  if (comp.targetRange && (comp.targetRange.min || comp.targetRange.max)) {
    compHtml += '<p><strong>Target:</strong> $' + (comp.targetRange.min || '?') + ' – $' + (comp.targetRange.max || '?') + '</p>';
  } else {
    compHtml += '<p><strong>Target:</strong> Not defined — market research needed</p>';
  }
  compHtml += '<p><strong>Market researched:</strong> ' + (comp.marketResearched ? 'Yes' : 'No') + '</p>';
  container.appendChild(makeCard("Compensation", compHtml, false));

  // Immediate Priorities
  var actions = profile.immediateActions || [];
  if (actions.length > 0) {
    var actHtml = '<ol>';
    actions.forEach(function(a) { actHtml += '<li>' + esc(a.action) + '</li>'; });
    actHtml += '</ol>';
    container.appendChild(makeCard("Immediate Priorities", actHtml, true));
  }

  // Open Profile Gaps
  var gaps = profile.openGaps || [];
  if (gaps.length > 0) {
    var gapHtml = '<ul>';
    gaps.forEach(function(g) { gapHtml += '<li>' + esc(g) + '</li>'; });
    gapHtml += '</ul>';
    container.appendChild(makeCard("Open Profile Gaps", gapHtml, false));
  }
}

function renderDocuments(documents) {
  var container = document.getElementById("documents-content");
  if (!container) return;
  container.innerHTML = "";

  var docs = documents || [];
  if (docs.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No documents yet.</p><p>Ask CADE in the Coach tab to generate talking points, a promotion case, self-review content, a skill plan, or compensation negotiation prep.</p></div>';
    return;
  }

  // Sort newest first
  var sorted = docs.slice().sort(function(a, b) {
    var da = a._id || a.date || 0;
    var db2 = b._id || b.date || 0;
    return da > db2 ? -1 : 1;
  });

  sorted.forEach(function(doc) {
    var header = '<div class="doc-meta"><span class="badge badge-type">' + esc(doc.type || "document") + '</span> <span class="doc-date">' + esc(doc.date || "") + '</span>' + (doc.version > 1 ? ' <span class="badge badge-version">v' + doc.version + '</span>' : '') + '</div><strong>' + esc(doc.title || "Untitled") + '</strong>';
    var body = '<pre class="doc-content">' + esc(doc.content || "") + '</pre>';
    container.appendChild(makeCard(null, header + body, false, "doc-card"));
  });
}

function showSetupScreen() {
  var setup = document.getElementById("setup-screen");
  var app = document.getElementById("app");
  var loading = document.getElementById("loading-screen");
  if (loading) loading.style.display = "none";
  if (app) app.style.display = "none";
  if (setup) setup.style.display = "flex";
}

function showLoadingScreen() {
  var loading = document.getElementById("loading-screen");
  var app = document.getElementById("app");
  if (loading) loading.style.display = "flex";
  if (app) app.style.display = "none";
}

function hideLoadingScreen() {
  var loading = document.getElementById("loading-screen");
  var app = document.getElementById("app");
  if (loading) loading.style.display = "none";
  if (app) app.style.display = "flex";
}

// --- Helpers ---

function makeCard(title, bodyHtml, defaultOpen, extraClass) {
  var card = document.createElement("div");
  card.className = "profile-card" + (extraClass ? " " + extraClass : "");

  if (title) {
    var details = document.createElement("details");
    if (defaultOpen) details.open = true;
    var summary = document.createElement("summary");
    summary.className = "card-summary";
    summary.textContent = title;
    details.appendChild(summary);
    var body = document.createElement("div");
    body.className = "card-body";
    body.innerHTML = bodyHtml;
    details.appendChild(body);
    card.appendChild(details);
  } else {
    card.innerHTML = bodyHtml;
  }

  return card;
}

function esc(str) { return escapeHtml(str || ""); }

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
