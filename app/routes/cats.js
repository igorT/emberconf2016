import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [{"id":"1","name":"cat1","image":"http://24.media.tumblr.com/tumblr_m4j2e7Fd7M1qejbiro1_1280.jpg","owner_name":"Paul","relationships":{"cat_friends":[2,3],"best_friend":3}},{"id":"2","name":"cat2","image":"http://24.media.tumblr.com/tumblr_lxrexcSVCh1qbd47zo1_1280.jpg","owner_name":"Joachim","relationships":{"cat_friends":[1,5],"best_friend":null}},{"id":"3","name":"cat3","image":"http://24.media.tumblr.com/x3Rmp1Hjoou8ifx3UMrV8ILfo1_500.jpg","owner_name":"Stefan","relationships":{"cat_friends":[1],"best_friend":1}},{"id":"4","name":"cat4","image":"http://25.media.tumblr.com/tumblr_lvc0n6lEl41qe42cbo1_1280.png","owner_name":"Matt","relationships":{"cat_friends":[5],"best_friend":5}},{"id":"5","name":"cat5","image":"http://24.media.tumblr.com/tumblr_lx7vafr8cy1r7lwjko1_250.gif","owner_name":"Igor","relationships":{"cat_friends":[4,2],"best_friend":4}},{"id":"6","name":"cat6","image":"http://25.media.tumblr.com/tumblr_lp9ovcC5Id1qiatdho1_1280.jpg","owner_name":"Igor","relationships":{"cat_friends":[],"best_friend":null}}];
  }
});
