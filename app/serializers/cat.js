import DS from 'ember-data';
import ApplicationSerializer from './application';
import Ember from 'ember';
export default ApplicationSerializer.extend({
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
  }

});
