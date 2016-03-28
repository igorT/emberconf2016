import DS from 'ember-data';
import Ember from 'ember';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse: function(store, type, data, id, requestType) {
    if (requestType === 'findAll') {
      return {
        data: data.cats.map((cat) => this.normalize(type, cat))
      };
    } else if (requestType === 'findRecord') {
      return {
        data: this.normalize(type, data.cat)
      };
    }
  },

  normalize(type, cat) {
    let attributes = cat;
    attributes.ownerName = attributes.owner_name;
    let normalized = { type: type.modelName, attributes: cat, id:cat.id };
    return normalized;
  }
});
