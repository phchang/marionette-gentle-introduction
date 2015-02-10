ContactManager.module('ContactsApp.List',
    function(List, ContactManager, Bacbone, Marionette, $, _) {

      List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',

        events: {
          click: 'highlightName',
          'click a.js-show': 'showClicked',
          'click button.js-delete': 'deleteClicked'
        },

        highlightName: function (e) {
          e.preventDefault();
          this.$el.toggleClass('warning');
        },

        showClicked: function (e) {
          e.preventDefault();
          e.stopPropagation();
          this.trigger('contact:show', this.model);
        },

        deleteClicked: function (e) {
          e.stopPropagation();
          this.trigger('contact:delete', this.model);
        },

        remove: function () {
          this.$el.fadeOut(function () {
            Marionette.ItemView.prototype.remove.call(self);
          });
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