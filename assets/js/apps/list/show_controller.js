ContactManager.module('ContactsApp.Show',
    function (Show, ContactManager, Backbone, Marionette, $, _) {
      Show.Controller = {
        showContact: function (id) {

          var fetchingContact = ContactManager.request('contact:entity', id);

          $.when(fetchingContact).done(function (contact) {
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
          });
        }
      };
    });