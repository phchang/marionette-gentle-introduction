ContactManager.module('ContactsApp.Edit',
  function (Edit, ContactManager, Backbone, Marionette, $, _) {
    //Edit.Contact = Marionette.ItemView.extend({
    console.log('ContactManager = ', ContactManager);
    console.log('ContactManager.ContactsApp = ', ContactManager.ContactsApp.Common);
    Edit.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({

      initialize: function() {
        this.title = 'Edit ' + this.model.get('firstName');
        this.title += ' ' + this.model.get('lastName');
      }
    });
});
