import Ember from 'ember';

export default Ember.Component.extend({
  cat: null,
  isEditing: false,
  disableEdit: Ember.computed('canEdit', function(){
    return !this.get('canEdit');
  }),
  actions: {
    edit: function(){
      this.set('isEditing', true);
    },

    delete: function() {
      this.get('cat').deleteRecord();
      this.get('cat').save();
    },

   save: function(){
    this.get('cat').save();
    this.set('isEditing', false);
   }
  }
});
