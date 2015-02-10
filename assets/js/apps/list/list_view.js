ContactManager.module('ContactsApp.List',
    function(List, ContactManager, Bacbone, Marionette, $, _) {

      List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',

        events: {
          click: 'highlightName',
          'click button.js-delete': 'deleteClicked'
        },

        highlightName: function (e) {
          e.preventDefault();
          this.$el.toggleClass('warning');
        },

        deleteClicked: function (e) {
          e.stopPropagation();
          /*
            Although we don’t have direct access to the contacts collection,
            each model keeps a reference to its parent collection within the
            collection attribute. Therefore, we can access our contacts
            collection from within our Contact view instance with
            this.model.collection.
           */
          this.model.collection.remove(this.model);
        }
      });

      List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#contact-list',
        childView: List.Contact,
        childViewContainer: 'tbody'
      });
    });