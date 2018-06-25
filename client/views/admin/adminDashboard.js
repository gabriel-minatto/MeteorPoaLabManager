Template.adminDashboard.onCreated(function(){

    this.contentTemplate = new ReactiveVar(false);

    subsGlobal.subscribe('allUsers');

    const self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

        self.contentTemplate.set('homeAdmin');

    });

});

Template.adminDashboard.helpers({

    getContentTemplate() {

        return Template.instance().contentTemplate.get();
    }

});

Template.adminDashboard.events({

    'click .adminSwitcher': function(e, t) {

        t.contentTemplate.set(e.target.dataset.filter);
    }
});