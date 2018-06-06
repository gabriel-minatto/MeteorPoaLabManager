Meteor.publish('allReportsDesc', function () {

    return Reports.find({}, { sort: { createdAt: -1 } });
});