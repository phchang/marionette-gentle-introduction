var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: '#main-region'
});

ContactManager.on('start', function() {

  if (Backbone.history) {
    Backbone.history.start();

    if (Backbone.history.fragment === '') {
      Backbone.history.navigate('contacts');
      ContactManager.ContactsApp.List.Controller.listContacts();
    }
  }

  var ContactsAppList = ContactManager.module('ContactsApp.List');

  ContactsAppList.Controller.listContacts();

});

