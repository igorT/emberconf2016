import DS from 'ember-data';
import Ember from 'ember';

export default DS.Serializer.extend({
  keyForType(type) {
    return Ember.String.pluralize(type.modelName);
  },

  keyForAttribute(key) {
    return Ember.String.underscore(key);
  },

  serialize(snapshot, options) {
    let serialized = {};
    snapshot.eachAttribute(function(name, meta) {
      serialized[this.keyForAttribute(name)] = snapshot.attr(name);
    }, this);
    serialized.relationships = {};
    snapshot.eachRelationship(function(name, meta) {
      if (meta.kind === 'hasMany') {
        serialized.relationships[this.keyForAttribute(name)] = snapshot.hasMany(name, { ids: true});
      }
    }, this);
    serialized.id = snapshot.id;
    return serialized;
  },

  normalizeResponse(store, type, data, id, requestType) {
    if (requestType === 'findAll') {
      let jsonArray = data[this.keyForType(type)];
      let normalized = { data: jsonArray.map((cat) => this.normalize(type, cat)) };
      return normalized;
    } else if (requestType === 'findRecord') {
      let json = data[type.modelName];
      return { data: this.normalize(type, json) };
    }
  },

  normalize(type, hash) {
    let attributes = {};
    type.eachAttribute(function(name, meta) {
      attributes[name] = hash[this.keyForAttribute(name)];
    }, this);
    let relationships = {};
    type.eachRelationship(function(name, meta) {
      if (meta.kind === 'hasMany') {
        relationships[name] = {
          data: hash.relationships[this.keyForAttribute(name)].map((id) => ({ type: meta.type, id: id }))
        };
      }
    }, this);

    return { type: type.modelName, id: hash.id, attributes, relationships };
  }
});
