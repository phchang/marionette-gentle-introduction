ContactManager.module('ContactsApp',
    function (ContactsApp, ContactManager, Backbone, Marionette, $, _) {

      ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          contacts: 'listContacts',
          'contacts/:id': 'showContact',
          'contacts/:id/edit': 'editContact'
        }
      });

      // this is just a convenience to separate out the declaration from the
      // assignment of the controller (see below)
      var API = {
        listContacts: function () {
          ContactsApp.List.Controller.listContacts();
        },

        showContact: function (id) {
          ContactsApp.Show.Controller.showContact(id);
        },

        editContact: function (id) {
          ContactsApp.Edit.Controller.editContact(id);
        }
      };

      ContactManager.on('contacts:list', function () {
        ContactManager.navigate('contacts');
        API.listContacts();
      });

      ContactManager.on('contact:show', function (id) {
        console.log('contacts_app.js contacts:list event was captured');
        ContactManager.navigate('contacts/' + id);
        API.showContact(id);
      });

      ContactManager.on('contact:edit', function (id) {
        ContactManager.navigate('contacts/' + id + '/edit');
        API.editContact(id);
      });

      // todo deprecated, what to use here instead?
      ContactManager.addInitializer(function () {
        new ContactsApp.Router({
          controller: API
        })
      })
    });
