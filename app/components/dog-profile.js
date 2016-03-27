import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  actions: {
    delete: function(dog){
      dog.deleteRecord();
      dog.save();
    },
    edit: function() {
      this.set('isEditing', true);
    },
    save: function(dog) {
      this.set('isEditing', false);
      dog.save();
    }
  }
});
