import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({
  findAll(store, type) {
    return $.get('/api/' + Ember.String.pluralize(type.modelName));
  },

  findRecord(store, type, id, snapshot) {
    return $.get('/api/' + Ember.String.pluralize(type.modelName) + '/' + id);
  },

  updateRecord(store, type, snapshot) {
    let key =  type.modelName === 'cat' ? 'cat' : 'dog';
    let toSend = {};
    toSend[key] = snapshot.serialize();
    return $.ajax({
      method: 'PUT',
      url: '/api/' + Ember.String.pluralize(type.modelName) + '/' + snapshot.id,
      data: JSON.stringify(toSend)
      }).then(function() { return null; });
  },

  deleteRecord(store, type, snapshot) {
    return $.ajax({
      method: 'DELETE',
      url: '/api/' + Ember.String.pluralize(type.modelName) + '/' + snapshot.id,
    }).then(function() { return null; });
  }
});
