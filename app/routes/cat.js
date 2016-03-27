import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    //return {"id":"1","name":"cat1","image":"http://24.media.tumblr.com/tumblr_m4j2e7Fd7M1qejbiro1_1280.jpg","owner_name":"Paul","relationships":{"cat_friends":[2,3],"best_friend":3}};
    return $.get('api/cats/1').then((data) => { return data.cat; });
  }
});
