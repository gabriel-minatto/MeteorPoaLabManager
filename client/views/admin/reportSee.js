Template.reportSee.onCreated(function() {

    this.report = new ReactiveVar(false);

    subsGlobal.subscribe('allReportsDesc');
    subsGlobal.subscribe('allReportFiles');

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const args = Template.currentData();

        if(!args || !args.reportId) return;

        const report = Reports.findOne({ _id:args.reportId });

        if(!report) return;

        if (report.filesIds && report.filesIds.length) {

            report.files = report.filesIds.map(id => {

                const reportFile = ReportFiles.findOne({ _id:id });
                if (reportFile) {

                    return {
                        name: reportFile.name(),
                        size: reportFile.size(),
                        url: reportFile.url({ store:'reportFilesStore' })
                    };
                }

                return false;
            }).filter(f => f);
        }

        self.report.set(report);

    });

});

Template.reportSee.helpers({

    getReport() {

        return Template.instance().report.get();
    },

    getReportFiles() {

        const report = Template.instance().report.get();
        if (!report || !report.files || !report.files.length) return [];

        return report.files;
    },

    getOwnerEmail() {

        const report = Template.instance().report.get();

        if (!report
            || !report.owner
            || !report.owner.emails
            || !report.owner.emails.length)
                return '';

        return report.owner.emails[0].address;
    },

    getOwnerName() {

        const report = Template.instance().report.get();

        if (!report
            || !report.owner
            || !report.owner.username)
                return '';

        return report.owner.username;
    },

    getOwnerRoles() {

        const report = Template.instance().report.get();

        if (!report
            || !report.owner
            || !report.owner.roles
            || !report.owner.roles.length)
                return '';

        return report.owner.roles.join(', ');
    },

    formatSize(size) {

        return (size / 1024).toFixed(2);
    }


});