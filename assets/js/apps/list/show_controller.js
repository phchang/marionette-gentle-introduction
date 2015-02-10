ContactManager.module('ContactsApp.Show',
    function (Show, ContactManager, Backbone, Marionette, $, _) {
      Show.Controller = {
        showContact: function (id) {

          var contacts = ContactManager.request('contact:entities');
          var contact = contacts.get(id);

          var contactView = new Show.Contact({
            model: contact
          });

          ContactManager.mainRegion.show(contactView);
        }
      };
    });