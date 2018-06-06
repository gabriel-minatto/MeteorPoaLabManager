Meteor.publish('allReportFiles', function () {

    return ReportFiles.find();
});