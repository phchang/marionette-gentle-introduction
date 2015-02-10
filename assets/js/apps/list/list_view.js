ContactManager.module('ContactsApp.List',
    function(List, ContactManager, Bacbone, Marionette, $, _) {

      List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item'
      });

      List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#contact-list',
        childView: List.Contact,
        childViewContainer: 'tbody'
      })
    });