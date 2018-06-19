Meteor.publish('allMediaFiles', function () {

    return MediaFiles.find();
});