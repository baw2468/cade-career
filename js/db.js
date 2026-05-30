// db.js — Database abstraction layer. All Firebase access routes through this file only.

function FirebaseAdapter() {
  function baseUrl(key) {
    return CADE_CONFIG.firebase.databaseURL + "/" + CADE_CONFIG.userPath + "/" + key + ".json";
  }

  function maybeToArray(val) {
    if (!val || typeof val !== "object" || Array.isArray(val)) return val;
    var keys = Object.keys(val);
    if (keys.length === 0) return [];
    var allPushKeys = keys.every(function(k) {
      return k.charAt(0) === "-" && k.length > 10;
    });
    if (allPushKeys) return keys.map(function(k) { return val[k]; });
    return val;
  }

  this.get = function(key) {
    return fetch(baseUrl(key), { method: "GET" })
      .then(function(res) { return res.json(); })
      .then(function(data) { return maybeToArray(data); })
      .catch(function(err) { console.warn("[db.get] " + key, err); return null; });
  };

  this.set = function(key, value) {
    return fetch(baseUrl(key), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value)
    })
      .then(function(res) { return res.json(); })
      .catch(function(err) { console.warn("[db.set] " + key, err); return null; });
  };

  this.update = function(key, patch) {
    return fetch(baseUrl(key), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    })
      .then(function(res) { return res.json(); })
      .catch(function(err) { console.warn("[db.update] " + key, err); return null; });
  };

  this.push = function(key, item) {
    return fetch(baseUrl(key), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(function(res) { return res.json(); })
      .catch(function(err) { console.warn("[db.push] " + key, err); return null; });
  };

  this.delete = function(key) {
    return fetch(baseUrl(key), { method: "DELETE" })
      .then(function() { return true; })
      .catch(function(err) { console.warn("[db.delete] " + key, err); return null; });
  };
}

var db = new FirebaseAdapter();
