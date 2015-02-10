ContactManager.module('ContactsApp.List',
    function (List, ContactManager, Backbone, Marionette, $, _) {

      List.Controller = {
        listContacts: function () {
          var contacts = ContactManager.request('contact:entities');

          var contactsListView = new List.Contacts2({
            collection: contacts
          });

          ContactManager.mainRegion.show(contactsListView);
        }
      }

    });