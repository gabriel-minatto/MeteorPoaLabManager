Template.reportsAdmin.onCreated(function() {

    this.reports = new ReactiveVar(false);

    subsGlobal.subscribe('allReportsDesc');

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const reports = Reports.find({}, { sort: { createdAt: -1 } }).fetch();

        if(!reports || !reports.length) return;

        self.reports.set(reports);

    });
});

Template.reportsAdmin.helpers({

    getReports() {

        return Template.instance().reports.get();
    },

    formatDescription(desc) {
        return desc.slice(0, 80);
    },

    getOwner() {

        return this.owner.emails[0].address;
    }

});

Template.reportsAdmin.events({

    'click .finishReport': function(e, t) {

        Meteor.call('finishReport', e.target.dataset.reportid);
    }
});