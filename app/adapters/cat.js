import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  findAll(store, type) {
    return Ember.$.get('/api/cats').then((data) => {
      let jsonArray = data.cats;
      let normalized = { data: jsonArray.map((cat) => ({ type: 'cat', id: cat.id, attributes:cat })) };
      return normalized;
    });
  },

  findRecord(store, type, id) {
    return Ember.$.get('/api/cats/' + id).then((data) => {
      let catJSON = data.cat;
      return { data: { id: catJSON.id, type: 'cat', attributes: catJSON } };
    });
  },

  deleteRecord(store, type, snapshot) {
    return Ember.$.ajax({
      url:'/api/cats/' + snapshot.id,
      type: 'DELETE'
    }).then((data) => {
      return null;
    });
  },

  updateRecord(store, type, snapshot) {
    let toSend = { cat: snapshot.attributes() };
    toSend['cat'].id = snapshot.id;
    return Ember.$.ajax({
      url:'/api/cats/' + snapshot.id,
      type: 'PUT',
      data: JSON.stringify(toSend)
    }).then((data) => {
      return null;
    });
  }

});
