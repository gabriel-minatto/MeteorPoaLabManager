// Run this when the meteor app is started
Meteor.startup(function () {

    subsGlobal = new SubsManager({
        cacheLimit: 30,
        expireIn: 60
    });

    Meteor.autorun(function () {
        document.title = `PoaLab Doc's`;
    });

});
