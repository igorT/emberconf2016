import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({
  namespace: 'api',

  baseURLFor(type) {
    return this.namespace + '/' + this.keyForModelName(type.modelName) + '/';
  },

  keyForModelName(modelName) {
    return Ember.String.pluralize(modelName);
  },

  findAll(store, type) {
    return Ember.$.get(this.baseURLFor(type));
  },

  findRecord(store, type, id){
    return Ember.$.get(this.baseURLFor(type) + id);
  },

  deleteRecord(store, type, snapshot) {
    return Ember.$.ajax(this.baseURLFor(type) + snapshot.id, {
      type: 'DELETE',
    }).then((data) => null);
  },

  updateRecord(store, type, snapshot) {
    let toSend = {};
    toSend[type.modelName] = snapshot.attributes();
    toSend[type.modelName].id = snapshot.id;
    return Ember.$.ajax(this.baseURLFor(type) + snapshot.id, {
      type: 'PUT',
      data: JSON.stringify(toSend)
    }).then((data) => null);
  },
});
