import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('cats');
  this.route('dogs');
  this.route('cat', { path: '/cat/:id' });
  this.route('dog', { path: '/dog/:id' });
});

export default Router;
