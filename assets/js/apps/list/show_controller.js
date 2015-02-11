ContactManager.module('ContactsApp.Show',
    function (Show, ContactManager, Backbone, Marionette, $, _) {
      Show.Controller = {
        showContact: function (id) {

          var contact = ContactManager.request('contact:entity', id);

          var contactView;

          console.log('show controller / contact = ', contact);
          if (contact === undefined) {
            contactView = new Show.MissingContact();
          } else {
            contactView = new Show.Contact({
              model: contact
            });
          }

          ContactManager.mainRegion.show(contactView);
        }
      };
    });