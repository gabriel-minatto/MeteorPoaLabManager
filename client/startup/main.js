// Run this when the meteor app is started
Meteor.startup(function () {

    subsGlobal = new SubsManager({
        cacheLimit: 30,
        expireIn: 60
    });

    Meteor.autorun(function () {
        document.title = `PoaLab Doc's`;
    });

    if(Meteor.user()) {

        (async () => {
            const isInRole = await Meteor.callPromise('checkUserIsInRoles', ['default-group']);

            if (!isInRole) {
                Meteor.call('assignUserToRole', ['default-group']);
            }

        })();
    }

});
