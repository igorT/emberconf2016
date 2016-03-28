import DS from 'ember-data';
import Ember from 'ember';

export default DS.Serializer.extend({
  keyForType(type) {
    return Ember.String.pluralize(type.modelName);
  },

  serialize(snapshot, options) {

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
    return { type: type.modelName, id: hash.id, attributes: hash };
  }
});
