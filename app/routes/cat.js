import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.$.get('/api/cats/' + params.id).then((data) => data.cat);
  }
});
