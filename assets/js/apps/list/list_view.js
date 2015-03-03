ContactManager.module('ContactsApp.List',
    function(List, ContactManager, Bacbone, Marionette, $, _) {

      /* p.141
       * _Regions_ are areas that will remain displayed (semi-) permanently as
       * the user navigates. Ex. A region to display the nav menu.
       *
       * Layouts are more like 'super views'–they behave like views but 
       * in addition have areas where you can display sub-views. Layouts are
       * meant to disappear when a uer navigates somewhere else and that view
       * is no longer necessary.
       */
      List.Layout = Marionette.LayoutView.extend({
        template: '#contact-list-layout',

        // panel region represents 'control panel' area
        regions: {
          panelRegion: '#panel-region',
          contactsRegion: '#contacts-region'
        }
      });

      List.Panel = Marionette.ItemView.extend({
        template: '#contact-list-panel',

        triggers: {
          'click button.js-new': 'contact:new'
        }
      });
      
      List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',

        triggers: {
          'click a.js-show': 'contact:show',
          'click a.js-edit': 'contact:edit',
          'click button.js-delete': 'contact:delete'
        },

        // moved from events hash to triggers
        // 'click a.js-show': 'showClicked',
        // 'click a.js-edit': 'editClicked',
        // 'click button.js-delete': 'deleteClicked'
        events: {
          click: 'highlightName'
        },

        highlightName: function (e) {
          e.preventDefault();
          this.$el.toggleClass('warning');
        },


        /*
         * P.153 "[...] the triggers hash prevents the default event action,
         * and stops the event propagation"
         *
         * "By default all triggers are stopped with preventDefault and
         * stopPropagation methods."
         */
        // showClicked: function (e) {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   this.trigger('contact:show', this.model);
        // },

        // editClicked: function(e) {
        //   console.log('inside editClicked');
        //   e.preventDefault();
        //   e.stopPropagation();
        //   this.trigger('contact:edit', this.model);
        // },

        // deleteClicked: function (e) {
        //   e.stopPropagation();
        //   this.trigger('contact:delete', this.model);
        // },

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
        childViewContainer: 'tbody',

        initialize: function() {
          // collectionEvents hash could also be used here
          this.listenTo(this.collection, "reset", function() {
            this.attachHtml = function(collectionView, childView, index) {
              collectionView.$el.append(childView.el);
            };
          });
        },

        onRenderCollection: function() {
          this.attachHtml = function(collectionView, childView, index) {
            collectionView.$el.prepend(childView.el);
          };
        }
      });
    });
