ContactManager.module('ContactsApp.List',
    function (List, ContactManager, Backbone, Marionette, $, _) {

      List.Controller = {
        listContacts: function () {

          var loadingView = new ContactManager.Common.Views.Loading();
          ContactManager.mainRegion.show(loadingView);

          var fetchingContacts = ContactManager.request('contact:entities');

          var contactsListLayout = new List.Layout();
          var contactsListPanel = new List.Panel();


          $.when(fetchingContacts).done(function (contacts) {
            var contactsListView = new List.Contacts({
              collection: contacts
            });

            contactsListLayout.on('show', function() {
              contactsListLayout.panelRegion.show(contactsListPanel);
              contactsListLayout.contactsRegion.show(contactsListView);
            });

            contactsListView.on('childview:contact:delete',
                function (childView, model) {
                  model.destroy();
                });

            contactsListView.on('childview:contact:show',
                function (childView, model) {
                  ContactManager.trigger('contact:show', model.get('id'));
                });

            contactsListView.on('childview:contact:edit',
                function(childView, model) {
                  console.log('edit link clicked');

                  var view = new ContactManager.ContactsApp.Edit.Contact({
                    model: model,
                    asModal: true
                  });

                  view.on('form:submit', function(data) {
                    if (model.save(data)) {
                      childView.render();
                      ContactManager.dialogRegion.empty();
                      childView.flash('success');
                    } else {
                      view.triggerMethod('form:data:invalid',
                        model.validationError);
                    }
                  });
                  /* 
                     When Marionette triggers an event, it also executes the
                     related function if it's defined on the object. This block
                     can therefore moved to the view itself
                   */
                  //view.on('show', function() {
                  //  this.$el.dialog({
                  //    modal: true,
                  //    width: 'auto',
                  //    title: view.title
                  //  });
                  //});

                  ContactManager.dialogRegion.show(view);
                });

            // ContactManager.mainRegion.show(contactsListView);
            // replacing ^^^ with layout
            ContactManager.mainRegion.show(contactsListLayout);
          });
        }
      }
    });
