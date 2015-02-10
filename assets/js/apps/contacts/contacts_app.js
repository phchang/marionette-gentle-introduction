ContactManager.module('ContactsApp',
    function (ContactsApp, ContactManager, Backbone, Marionette, $, _) {

      ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          contacts: 'listContacts'
        }
      });

      var API = {
        listContacts: function () {
          ContactsApp.List.Controller.listContacts();
        }
      };

      // todo deprecated, what to use here instead?
      ContactManager.addInitializer(function () {
        new ContactsApp.Router({
          controller: API
        })
      })
    });