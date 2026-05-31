var db = {

  _url: function(key) {
    return CADE_CONFIG.firebase.databaseURL + "/" + CADE_CONFIG.userPath + "/" + key + ".json";
  },

  _toArray: function(val) {
    if (!val || typeof val !== "object" || Array.isArray(val)) return val;
    var keys = Object.keys(val);
    if (keys.length === 0) return [];
    var isPushKeys = keys.every(function(k) { return k.charAt(0) === "-" && k.length > 10; });
    return isPushKeys ? keys.map(function(k) { return val[k]; }) : val;
  },

  get: function(key) {
    var self = this;
    return fetch(self._url(key))
      .then(function(r) { return r.json(); })
      .then(function(d) { return self._toArray(d); })
      .catch(function(e) { console.warn("[db.get]", key, e); return null; });
  },

  set: function(key, value) {
    return fetch(this._url(key), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value)
    })
      .then(function(r) { return r.json(); })
      .catch(function(e) { console.warn("[db.set]", key, e); return null; });
  },

  update: function(key, patch) {
    return fetch(this._url(key), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    })
      .then(function(r) { return r.json(); })
      .catch(function(e) { console.warn("[db.update]", key, e); return null; });
  },

  push: function(key, item) {
    return fetch(this._url(key), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(function(r) { return r.json(); })
      .catch(function(e) { console.warn("[db.push]", key, e); return null; });
  },

  delete: function(key) {
    return fetch(this._url(key), { method: "DELETE" })
      .then(function() { return true; })
      .catch(function(e) { console.warn("[db.delete]", key, e); return null; });
  }

};
