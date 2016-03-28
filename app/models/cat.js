import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  ownerName: DS.attr(),
  image: DS.attr()
});
