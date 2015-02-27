ContactManager.module('ContactsApp.List',
    function(List, ContactManager, Bacbone, Marionette, $, _) {

      List.Layout = Marionette.LayoutView.extend({
        template: '#contact-list-layout',

        // panel region represents 'control panel' area
        regions: {
          panelRegion: '#panel-region',
          contactsRegion: '#contacts-region'
        }
      });

      List.Panel = Marionette.ItemView.extend({
        template: '#contact-list-panel'
      });
      
      List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',

        events: {
          click: 'highlightName',
          'click a.js-show': 'showClicked',
          'click a.js-edit': 'editClicked',
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

        editClicked: function(e) {
          console.log('inside editClicked');
          e.preventDefault();
          e.stopPropagation();
          this.trigger('contact:edit', this.model);
        },

        deleteClicked: function (e) {
          e.stopPropagation();
          this.trigger('contact:delete', this.model);
        },

        remove: function () {
          this.$el.fadeOut(function () {
            Marionette.ItemView.prototype.remove.call(self);
          });
        },

        flash: function(cssClass) {
          var $view = this.$el;
          $view.hide().toggleClass(cssClass).fadeIn(800, function() {
              setTimeout(function() {
                $view.toggleClass(cssClass);
              }, 500);
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
