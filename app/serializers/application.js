import DS from 'ember-data';
import Ember from 'ember';

export default DS.Serializer.extend({
  keyForModelName(modelName, isPlural) {
    if (isPlural) {
      return Ember.String.pluralize(modelName);
    } else {
      return modelName;
    }
  },
  normalizeResponse(store, type, data, id, requestType) {
    if (requestType === 'findAll') {
      let payload = data[this.keyForModelName(type.modelName, true)];
      let normalized = {
        data: payload.map((record) => this.normalize(type, record))
      };
      return normalized;
    } else {
      let payload = data[this.keyForModelName(type.modelName, false)];
      return { data: this.normalize(type, payload) };
    }
  },

  normalize(type, hash) {
   return { type: type.modelName, id: hash.id, attributes: hash };
  },

  serialize(snapshot, options) {
    let serialized = snapshot.attributes();
    serialized.id = snapshot.id;
    return serialized;
  }

});
