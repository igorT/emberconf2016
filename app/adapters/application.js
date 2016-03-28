import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({
  namespace: 'api',
  baseURLForType(type) {
   let url = '';
   if (this.namespace) {
      url+= '/' + this.namespace;
    }
    url += '/' + this.keyForType(type);
    url += '/';
    return url;
  },

  keyForType(type) {
    return Ember.String.pluralize(type.modelName);
  },

  findAll(store, type) {
    return Ember.$.get(this.baseURLForType(type));
  },

  findRecord(store, type, id) {
    return Ember.$.get(this.baseURLForType(type) + id);
  },

  deleteRecord(store, type, snapshot) {
    return Ember.$.ajax({
      url:this.baseURLForType(type) + snapshot.id,
      type: 'DELETE'
    }).then((data) => {
      return null;
    });
  },

  updateRecord(store, type, snapshot) {
    let toSend = {};
    toSend[type.modelName] = snapshot.attributes();
    toSend[type.modelName].id = snapshot.id;
    return Ember.$.ajax({
      url: this.baseURLForType(type) + snapshot.id,
      type: 'PUT',
      data: JSON.stringify(toSend)
    }).then((data) => {
      return null;
    });
  }

  /*
  findAll(store, type) {

  ]
  */
});
