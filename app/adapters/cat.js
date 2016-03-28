import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  findAll(/*store, type*/) {
    return Ember.$.get('api/cats').then((data) =>
      {
      let payload = data.cats;
      let normalized = {
        data: payload.map((cat) => ({ type: 'cat', id: cat.id, attributes: cat }))
      };
      return normalized;
    });
  },

  findRecord(store, type, id){
    return Ember.$.get('api/cats/' + id).then((data) =>{
      let payload = data.cat;
      let normalized = { data: { type: 'cat', id: payload.id, attributes: payload } };
      return normalized;
    });
  }
});
