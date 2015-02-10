var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: '#main-region'
});

ContactManager.on('start', function() {

  var ContactsAppList = ContactManager.module('ContactsApp.List');

  ContactsAppList.Controller.listContacts();

});

