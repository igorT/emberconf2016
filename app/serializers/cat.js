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
    let attributes = {
      ownerName: cat.owner_name,
      name: cat.name,
      age: cat.age,
      image: cat.image
    };
    let relationships = {
      catFriends: {
        data: cat.relationships.cat_friends.map((friend) => ({ type: 'cat', id: friend }))
      }
    };
    let normalized = { type: type.modelName, attributes, relationships, id:cat.id };
    return normalized;
  }
});
