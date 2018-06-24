// PUBLIC
const publicRoutes = FlowRouter.group({});

publicRoutes.route('/', {
    name: 'index',
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: 'index'
        });
    }
});

publicRoutes.route('/projetos', {
    name: "projects",
    triggersEnter: [
        async (context, redirect) => {

            if(!Meteor.user()) return;

            let isInRole = await Meteor.callPromise('checkUserIsInRoles', ['default-group']);

            if (!isInRole) {
                Meteor.call('assignUserToRole', ['default-group']);
                isInRole = true;
            }
        }
    ],
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: "projectList",
        });
    }
});

publicRoutes.route('/projetos/:id', {
    name: "project-see",
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: "projectSee",
        });
    }
});

FlowRouter.notFound = {
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: "notFound",
        });
    }
};