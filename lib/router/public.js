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