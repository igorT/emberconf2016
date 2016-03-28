import DS from 'ember-data';
import Ember from 'ember';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse: function(store, type, data, id, requestType) {
    if (requestType === 'findAll') {
      return {
        data: data.dogs.map((cat) => this.normalize(type, cat))
      };
    } else if (requestType === 'findRecord') {
      return {
        data: this.normalize(type, data.dog)
      };
    }
  },

  serialize(snapshot, options) {
    return {
      id: snapshot.id,
      name: snapshot.attr('name'),
      age: snapshot.attr('age'),
      image: snapshot.attr('image'),
      plays_fetch: snapshot.attr('playsFetch'),
      likes_cats: snapshot.attr('likesCats'),
    };
  },


  normalize(type, cat) {
    let attributes = {
      name: cat.name,
      age: cat.age,
      image: cat.image,
      playsFetch: cat.plays_fetch,
      likesCats: cat.likes_cats
    };
    let normalized = { type: type.modelName, attributes, id:cat.id };
    return normalized;
  }
});
