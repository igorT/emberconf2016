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
    return Ember.$.get(this.baseURLFor(type)).then((data) =>
      {
      let payload = data[this.keyForModelName(type.modelName)];
      let normalized = {
        data: payload.map((record) => ({ type: type.modelName, id: record.id, attributes: record }))
      };
      return normalized;
    });
  },

  findRecord(store, type, id){
    return Ember.$.get(this.baseURLFor(type) + id).then((data) =>{
      let payload = data[type.modelName];
      let normalized = { data: { type: type.modelName, id: payload.id, attributes: payload } };
      return normalized;
    });
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
