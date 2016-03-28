import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  ownerName: DS.attr(),
  image: DS.attr(),
  age: DS.attr('number'),
  realAge: Ember.computed('age', function() {
    let age = this.get('age');
    if (age === 0 ) {
      return 0;
    } else if (age === 1) {
      return 15;
    } else if (age === 2) {
      return 25;
    } else {
      return 25 + (age - 2) * 4;
    }
  })
});
