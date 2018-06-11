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