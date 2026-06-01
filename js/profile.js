// profile.js — Seed profile data, context building, and profile CRUD.

var SEED_PROFILE = {
  identity: {
    name: "Brandon Wesch",
    location: "St. Petersburg, FL",
    currentRole: "Marketing Database Analyst",
    organization: "OneBlood, Inc.",
    organizationType: "Non-profit blood bank",
    tenureStart: "November 2020",
    email: "Brandon.Wesch@me.com"
  },
  education: [
    {
      degree: "MBA in Data Analytics",
      institution: "University of South Florida",
      completed: "May 2026",
      honors: "Recently completed — key trigger for data science role conversation"
    },
    {
      degree: "Bachelor of Business Administration in Marketing",
      institution: "University of North Florida",
      graduated: "2020",
      gpa: "3.6",
      honors: "Cum Laude",
      minors: ["Economics", "Digital Marketing and Analytics"]
    }
  ],
  certifications: [
    { name: "Google Analytics", status: "certified" },
    { name: "Tableau", status: "beginner — one dashboard built from MBA coursework, self-described minimal experience" },
    { name: "SQL", status: "beginner certification in progress, almost complete" },
    { name: "Microsoft Office", status: "proficient" },
    { name: "InVita HemaConnect CRM", status: "experienced user" }
  ],
  currentWork: {
    summary: "Works closely with direct manager on targeted marketing campaigns including data extraction, list generation, and evaluating campaign effectiveness. Compiles and analyzes donor and marketing data to determine ROI, identify target demographics, and adjust marketing strategy. Creates donor communications and partners with regional Marketing Administrators. Provides ad hoc reporting to management and continuously works to improve database accuracy and efficiency.",
    keyActivities: [
      "Data extraction and targeted list generation for donor campaigns",
      "Campaign ROI analysis and strategy adjustment",
      "Donor demographic analysis and segmentation",
      "Ad hoc reporting to management",
      "Database accuracy and efficiency improvements",
      "Donor communication creation",
      "Coordination with regional Marketing Administrators"
    ]
  },
  organizationalSituation: {
    summary: "Critical transition moment. Former direct manager recently let go — Brandon now reports without a direct manager. Director (one level above) goes on maternity leave in August 2026, approximately 8 weeks away. This creates both an opportunity and a deadline: any organizational decisions about Brandon's role need to happen before the director leaves.",
    managerStatus: "Former manager recently let go. Brandon currently reports without a direct manager in place.",
    directorStatus: "Currently in role but going on maternity leave in August 2026 — approximately 8 weeks away.",
    vpRelationship: "Multiple direct career conversations. Aware of MBA completion goal and data science role discussion. Key advocate. Brandon's read: positive, has demonstrated investment in Brandon's growth.",
    dataScienceDirector: "Cross-functional, directly engaged. Has been part of the data science role conversation. Building medallion architecture (bronze/silver/gold data layers). Brandon's read: TBD.",
    urgencyNote: "The director goes on maternity leave in August 2026. All organizational decisions about a new role structure must happen within the next 8 weeks. This is the effective deadline."
  },
  targetRoles: [
    {
      id: "data-science-liaison",
      title: "Data Science Liaison Role (New)",
      type: "new role creation",
      priority: "primary",
      status: "actively pursuing",
      description: "Brandon would serve as a liaison between the Data Science group and business functions such as marketing. The Director of Data Science is building a medallion architecture. Brandon would have access to specific data tables, extract data, and surface insights and recommendations for business functions. A translator role — someone who understands the business domain deeply (Brandon has this) and the data layer well enough to work within it.",
      decisionMakers: ["VP", "Director of Data Science"],
      lastConversation: "1-2 months ago",
      agreedTrigger: "MBA completion",
      triggerMet: true,
      reEngaged: false,
      actionLog: [],
      notes: "The agreed trigger has been met. Brandon needs to re-open this conversation immediately. The VP and Data Science Director both need to be engaged."
    },
    {
      id: "combined-role",
      title: "Combined Role — Data Science Liaison + Marketing Database Management",
      type: "promotion / expanded scope",
      priority: "primary",
      status: "actively pursuing",
      description: "Brandon's vision to combine the data science liaison role with the marketing database management responsibilities left behind by his former manager's departure. More of a promotion than a lateral move, with broader scope and appropriate title and compensation. Strategically smart because: (1) the manager role won't be filled on its own, (2) someone needs to cover those responsibilities, (3) Brandon is the logical candidate, (4) proposing it positions him as a solution to two organizational problems at once, (5) creates stronger compensation argument.",
      decisionMakers: ["VP", "Director of Data Science"],
      lastConversation: "Not yet raised — concept in Brandon's mind only",
      agreedTrigger: null,
      triggerMet: false,
      reEngaged: false,
      actionLog: [],
      notes: "This conversation needs to happen before the director goes on maternity leave in August. CADE's immediate coaching priority is helping Brandon prepare and initiate this conversation."
    },
    {
      id: "external-market",
      title: "External Market",
      type: "passive watch",
      priority: "passive",
      status: "watching",
      description: "Watching the external market passively. No active applications. External awareness maintained to support internal benchmarking and compensation strategy and to be ready if internal paths stall.",
      decisionMakers: [],
      lastConversation: null,
      agreedTrigger: null,
      triggerMet: false,
      reEngaged: false,
      actionLog: [],
      notes: ""
    }
  ],
  skills: {
    current: [
      { name: "Donor marketing domain knowledge", level: "strong", context: "4.5 years deep organizational context — genuine competitive advantage for internal roles" },
      { name: "Marketing database management", level: "strong", context: "Data extraction, list generation, segmentation, campaign analysis, ROI measurement — doing this daily" },
      { name: "Ad hoc reporting", level: "strong", context: "Provides regular reporting to management" },
      { name: "Donor campaign communications", level: "experienced" },
      { name: "Cross-functional collaboration", level: "practiced", context: "Works with regional Marketing Administrators and other functions" },
      { name: "Microsoft Office", level: "proficient" },
      { name: "Google Analytics", level: "certified" },
      { name: "HemaConnect CRM", level: "experienced" }
    ],
    inProgress: [
      { name: "SQL", level: "beginner certification almost complete", priority: "high" },
      { name: "Tableau", level: "beginner — one dashboard built", priority: "medium" }
    ],
    gaps: [
      { name: "SQL (intermediate to advanced)", priority: "high", context: "Currently at beginner level. Liaison role requires more than beginner SQL to work with data tables meaningfully." },
      { name: "Medallion architecture concepts", priority: "high", context: "Needs working knowledge of bronze/silver/gold data layers. Can be learned through research and conversation with the Data Science director." },
      { name: "Python", priority: "medium", context: "Not yet started. Useful for data science adjacent role. Lower priority than SQL but important medium-term." },
      { name: "Data pipeline and ETL basics", priority: "medium", context: "Understanding how data moves and transforms will make Brandon more effective as a liaison." },
      { name: "Tableau (intermediate)", priority: "medium", context: "Needs development beyond one dashboard. Data visualization is core to insight-surfacing function." },
      { name: "Statistical analysis basics", priority: "low", context: "MBA in data analytics likely covers some of this. Extent to be confirmed." },
      { name: "Database structural oversight and governance", priority: "medium", context: "Currently operates within the database but has not owned its structure. Natural to grow into given tenure." },
      { name: "Data privacy and compliance", priority: "medium", context: "Manager role JD cites data protection regulations and internal governance. Not currently in Brandon's profile." },
      { name: "KPI design and strategic reporting", priority: "medium", context: "Brandon does ad hoc reporting today. Manager role requires more proactive KPI ownership and strategic framing." }
    ]
  },
  accomplishments: [
    { description: "Campaign analytics and ROI: analyzed marketing and donor data to determine ROI and adjust strategy.", quantified: false, tags: ["oneblood", "marketing"], note: "Need: what campaigns, what scale, what ROI findings, what strategy changes resulted?" },
    { description: "Database enhancement: worked continuously to improve donor database for accuracy and efficiency.", quantified: false, tags: ["oneblood", "database"], note: "Need: what improvements specifically? What was the scope and impact?" },
    { description: "Demographic targeting: compiled data to determine appropriate demographics for targeted campaigns.", quantified: false, tags: ["oneblood", "marketing"], note: "Need: campaign reach, donors targeted, measurable outcomes?" },
    { description: "Ad hoc reporting: provided timely and accurate reporting to management.", quantified: false, tags: ["oneblood", "reporting"], note: "Need: frequency, what decisions were informed?" },
    { description: "Donor communications: created donor marketing communications.", quantified: false, tags: ["oneblood", "communications"], note: "Need: channels, volume, response/engagement data?" },
    { description: "Cross-functional coordination: worked with regional Marketing Administrators to schedule communications.", quantified: false, tags: ["oneblood", "collaboration"], note: "Need: how many regions, coordination complexity?" },
    { description: "Nordstrom recognition: recognized by store management for outstanding performance, project management, and positive attitude.", quantified: false, date: "July 2018, March 2019", tags: ["nordstrom"] },
    { description: "Fraternity leadership: Founding Father of Delta Sigma Phi chapter. Alumni and Family Relations Chairman. Raised $3,100 for the American Red Cross.", quantified: true, metrics: "$3,100 raised for American Red Cross", tags: ["leadership"] },
    { description: "Founding member of UNF Cycling Club.", quantified: false, tags: ["leadership"] }
  ],
  keyPeople: [
    { name: "VP (name TBD)", role: "VP", organization: "OneBlood", relationship: "direct and established — multiple career conversations", brandonsRead: "Positive. Has demonstrated investment in Brandon's growth. Aware of MBA completion goal and data science role discussion. Key advocate.", lastContact: "recent", notes: "Key decision-maker for both target roles. Re-engagement conversation needed now." },
    { name: "Director of Data Science (name TBD)", role: "Director of Data Science", organization: "OneBlood", relationship: "cross-functional, engaged", brandonsRead: "TBD — to be captured in coaching", lastContact: "1-2 months ago", notes: "Building medallion architecture. Directly engaged in data science role conversation." },
    { name: "Director (name TBD)", role: "Director (between manager and VP)", organization: "OneBlood", relationship: "direct report chain", brandonsRead: "TBD — to be captured in coaching", lastContact: "recent", notes: "Going on maternity leave in August 2026. Creates gap in org structure and time constraint on decisions." }
  ],
  goals: {
    shortTerm: "Re-engage the data science role conversation with VP and Data Science Director now that MBA is complete. Propose the combined role concept (data science liaison plus marketing database management) as a promotion. Secure a new title and compensation increase before the director goes on maternity leave in August.",
    mediumTerm: "Be established in the new combined role with clear ownership of both the data science liaison function and marketing database management. Advance SQL and Tableau skills to intermediate level. Begin learning Python and medallion architecture concepts.",
    longTerm: "To be developed in coaching. Initial indication is advancement into senior analytics or data leadership within the healthcare/non-profit sector or transition to a more senior data role in a larger organization."
  },
  compensation: {
    current: null,
    currentBreakdown: { base: null, bonus: null, equity: null },
    targetRange: { min: null, max: null },
    marketResearched: false,
    marketReferences: []
  },
  resume: {
    mbaOnResume: false,
    quantified: false,
    lastUpdated: null,
    priorities: [
      "Add MBA from USF immediately — most glaring omission given it was the agreed trigger for the data science role conversation",
      "Quantify OneBlood accomplishments — nearly 5 years of meaningful data work described with no numbers",
      "Update skills section to reflect SQL progress, MBA analytics coursework, and depth of Tableau training",
      "Consider removing or de-emphasizing Nordstrom Rack — increasingly irrelevant at this career stage"
    ]
  },
  immediateActions: [
    { priority: 1, action: "Prepare and initiate the combined role conversation with the VP. The MBA trigger has been met. The manager departure creates the opening. The director maternity leave creates the deadline. This conversation needs to happen in the next 4–6 weeks." },
    { priority: 2, action: "Update the resume to reflect the MBA and quantified accomplishments. Should happen before or alongside the leadership conversation." },
    { priority: 3, action: "Define a compensation target for the combined role. Market research on data science liaison and marketing database manager roles in the Tampa Bay area." },
    { priority: 4, action: "Complete SQL certification. Finishing the beginner certification signals follow-through to leadership and closes the most visible skills gap." },
    { priority: 5, action: "Begin learning medallion architecture concepts so Brandon can speak intelligently with the Data Science Director about the technical environment he would work within." }
  ],
  openGaps: [
    "Names and deeper reads on key stakeholders (VP, Data Science Director, Director on maternity leave)",
    "Current compensation figure",
    "Brandon's read on organizational politics — who supports the combined role idea, who might resist it",
    "Any competing candidates or alternative organizational decisions leadership might be considering",
    "How the combined role conversation has been approached in the past — was it ever explicitly discussed or is it entirely Brandon's concept",
    "Brandon's own long-term career vision beyond the 3–6 month window",
    "Performance review history and feedback from leadership at OneBlood",
    "Any specific wins or data points from OneBlood that can be quantified for the accomplishments library"
  ],
  lastUpdated: "2026-05-30T00:00:00Z"
};

function buildContextBlock(profile, sessionSummaries) {
  var today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  var lines = [];

  lines.push("CADE COACHING SYSTEM");
  lines.push("You are CADE (Career Advancement and Development Engine), an AI career coach for Brandon Wesch. You are a trusted senior advisor, be direct, conversational, and concise. Talk like a trusted advisor in a real conversation — not a consultant writing a report. You never give generic career advice. Every response is grounded in Brandon's specific situation. You ask sharp clarifying questions. You proactively flag what Brandon may be missing. You generate structured documents when requested. You never start fresh — you know Brandon's full history.No preamble, no summaries of what you just said. Just get to the point.");
  lines.push("Today: " + today);
  lines.push("");

  // Identity
  var id = profile.identity || {};
  lines.push("IDENTITY");
  lines.push("Name: " + (id.name || "Brandon Wesch"));
  lines.push("Role: " + (id.currentRole || "Marketing Database Analyst") + " at " + (id.organization || "OneBlood") + " (" + (id.organizationType || "non-profit blood bank") + ")");
  lines.push("Location: " + (id.location || "St. Petersburg, FL"));
  lines.push("Tenure: " + (id.tenureStart || "November 2020") + " to present (~4.5 years)");
  lines.push("");

  // Education
  var edu = profile.education || [];
  lines.push("EDUCATION");
  edu.forEach(function(e) {
    var line = (e.degree || "") + " — " + (e.institution || "");
    if (e.completed) line += ", completed " + e.completed;
    if (e.graduated) line += ", graduated " + e.graduated;
    if (e.gpa) line += ", GPA " + e.gpa;
    if (e.honors) line += " (" + e.honors + ")";
    lines.push(line);
  });
  lines.push("");

  // Certifications
  var certs = profile.certifications || [];
  if (certs.length > 0) {
    lines.push("CERTIFICATIONS & TRAINING");
    certs.forEach(function(c) { lines.push("• " + c.name + ": " + c.status); });
    lines.push("");
  }

  // Organizational Situation — mark as urgent
  var org = profile.organizationalSituation || {};
  lines.push("ORGANIZATIONAL SITUATION ⚠ URGENT");
  if (org.summary) lines.push(org.summary);
  if (org.managerStatus) lines.push("Manager: " + org.managerStatus);
  if (org.directorStatus) lines.push("Director: " + org.directorStatus);
  if (org.vpRelationship) lines.push("VP: " + org.vpRelationship);
  if (org.dataScienceDirector) lines.push("Data Science Director: " + org.dataScienceDirector);
  if (org.urgencyNote) lines.push("DEADLINE: " + org.urgencyNote);
  lines.push("");

  // Target Roles
  var roles = profile.targetRoles || [];
  lines.push("TARGET ROLES");
  roles.forEach(function(r) {
    var badge = (r.triggerMet && !r.reEngaged) ? " *** ACTION REQUIRED — TRIGGER MET, NOT YET RE-ENGAGED ***" : "";
    lines.push("► " + r.title + " [" + r.status + "]" + badge);
    if (r.description) lines.push("  " + r.description);
    if (r.decisionMakers && r.decisionMakers.length > 0) lines.push("  Decision-makers: " + r.decisionMakers.join(", "));
    if (r.lastConversation) lines.push("  Last conversation: " + r.lastConversation);
    if (r.agreedTrigger) lines.push("  Agreed trigger: " + r.agreedTrigger + " | Met: " + (r.triggerMet ? "YES" : "no") + " | Re-engaged: " + (r.reEngaged ? "yes" : "NO"));
    if (r.notes) lines.push("  Note: " + r.notes);
    if (r.actionLog && r.actionLog.length > 0) {
      lines.push("  Actions: " + r.actionLog.map(function(a) { return a.date + ": " + a.action; }).join("; "));
    }
  });
  lines.push("");

  // Skills
  var skills = profile.skills || {};
  lines.push("SKILLS — CURRENT STRENGTHS");
  (skills.current || []).forEach(function(s) {
    lines.push("• " + s.name + " [" + s.level + "]" + (s.context ? " — " + s.context : ""));
  });
  lines.push("");
  lines.push("SKILLS — IN PROGRESS");
  (skills.inProgress || []).forEach(function(s) {
    lines.push("• " + s.name + " — " + s.level + " (priority: " + s.priority + ")");
  });
  lines.push("");
  lines.push("SKILLS — GAPS (priority)");
  (skills.gaps || []).filter(function(s) { return s.priority === "high"; }).forEach(function(s) {
    lines.push("• [HIGH] " + s.name + " — " + s.context);
  });
  (skills.gaps || []).filter(function(s) { return s.priority === "medium"; }).forEach(function(s) {
    lines.push("• [MED] " + s.name + " — " + s.context);
  });
  lines.push("");

  // Accomplishments
  var acc = profile.accomplishments || [];
  if (acc.length > 0) {
    lines.push("ACCOMPLISHMENTS LIBRARY (" + acc.length + " entries — most need quantification)");
    acc.forEach(function(a) {
      lines.push("• " + a.description + (a.metrics ? " [" + a.metrics + "]" : "") + (a.quantified ? "" : " [NOT YET QUANTIFIED]"));
    });
    lines.push("");
  }

  // Goals
  var goals = profile.goals || {};
  lines.push("GOALS");
  if (goals.shortTerm) lines.push("Short-term: " + goals.shortTerm);
  if (goals.mediumTerm) lines.push("Medium-term: " + goals.mediumTerm);
  if (goals.longTerm) lines.push("Long-term: " + goals.longTerm);
  lines.push("");

  // Compensation
  var comp = profile.compensation || {};
  lines.push("COMPENSATION");
  lines.push("Current: " + (comp.current ? "$" + comp.current : "not yet captured"));
  if (comp.targetRange && (comp.targetRange.min || comp.targetRange.max)) {
    lines.push("Target: $" + (comp.targetRange.min || "?") + " – $" + (comp.targetRange.max || "?"));
  } else {
    lines.push("Target: not yet defined — market research needed");
  }
  lines.push("Market researched: " + (comp.marketResearched ? "yes" : "no"));
  lines.push("");

  // Resume status
  var resume = profile.resume || {};
  lines.push("RESUME STATUS");
  lines.push("MBA on resume: " + (resume.mbaOnResume ? "yes" : "NO — missing"));
  lines.push("Accomplishments quantified: " + (resume.quantified ? "yes" : "NO — missing"));
  if (resume.priorities && resume.priorities.length > 0) {
    lines.push("Priorities: " + resume.priorities.slice(0, 2).join("; "));
  }
  lines.push("");

  // Immediate actions
  var actions = profile.immediateActions || [];
  if (actions.length > 0) {
    lines.push("IMMEDIATE COACHING PRIORITIES");
    actions.forEach(function(a) { lines.push(a.priority + ". " + a.action); });
    lines.push("");
  }

  // Open gaps
  var gaps = profile.openGaps || [];
  if (gaps.length > 0) {
    lines.push("OPEN PROFILE GAPS (ask about these at appropriate moments)");
    gaps.forEach(function(g) { lines.push("• " + g); });
    lines.push("");
  }

  // Key People
  var people = profile.keyPeople || [];
  if (people.length > 0) {
    lines.push("KEY PEOPLE");
    people.forEach(function(p) {
      lines.push("• " + p.name + " (" + p.role + "): " + (p.brandonsRead || "") + (p.notes ? " | " + p.notes : ""));
    });
    lines.push("");
  }

  // Session history
  var summaries = sessionSummaries || [];
  if (summaries.length > 0) {
    var recent = summaries.slice(-4);
    lines.push("RECENT SESSION HISTORY");
    recent.forEach(function(s) {
      lines.push("• [" + (s.date || "date unknown") + "] " + (s.summary || "no summary"));
    });
    lines.push("");
  }

  lines.push("COACHING INSTRUCTIONS: Be specific to Brandon's situation. Reference real details from his profile. Do not give generic career advice. Proactively surface what he may be missing. Ask clarifying questions when needed. Generate structured documents on request (talking points, promotion case, self-review, skill plan, compensation prep). When a profile update is needed, note it clearly at the end of your response with format: [PROFILE_UPDATE: field=value]");

  return lines.join("\n");
}

function getProfile() {
  return db.get("ca8_profile").then(function(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return db.set("ca8_profile", SEED_PROFILE).then(function() { return SEED_PROFILE; });
    }
    return data;
  }).catch(function() {
    return SEED_PROFILE;
  });
}

function saveProfile(profile) {
  return db.set("ca8_profile", profile);
}

function updateProfile(patch) {
  return db.update("ca8_profile", patch);
}
