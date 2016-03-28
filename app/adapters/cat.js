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
  }
});
