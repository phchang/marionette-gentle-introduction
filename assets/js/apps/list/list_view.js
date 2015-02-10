ContactManager.module('ContactsApp.List',
    function(List, ContactManager, Bacbone, Marionette, $, _) {

      List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item'
      });

      List.Contact2 = Marionette.ItemView.extend({
        tagName: 'li',
        template: '#contact-list-item-2'
      });

      List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#contact-list',
        childView: List.Contact,
        childViewContainer: 'tbody'
      });

      List.Contacts2 = Marionette.CompositeView.extend({
        template: '#contact-list-2',
        childView: List.Contact2,
        childViewContainer: 'ul'
      });
    });