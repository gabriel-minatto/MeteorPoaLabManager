// PRIVATES
const privateRoutes = FlowRouter.group({
    triggersEnter: [
        AccountsTemplates.ensureSignedIn,
        async (context, redirect) => {

            const isInRole = await Meteor.callPromise('checkUserIsInRoles', ['default-group']);

            if (!isInRole && context.route.name != 'home') {
                Toast.error("Você não possui permissão para acessar essa área do site.",
                    "Acesso negado");
                FlowRouter.go(FlowRouter.path('home'));
            }

        }
    ]
});

privateRoutes.route('/home', {
    name: "home",
    action: async function (params, queryParams) {

        const isInRole = await Meteor.callPromise('checkUserIsInRoles', ['default-group']);

        if (!isInRole) {
            Meteor.call('assignUserToRole', ['default-group']);
        }

        BlazeLayout.render('mainLayout', {
            content: "homepage",
        });
    }
});

privateRoutes.route('/maquinas', {
    name: "machines",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "machineList",
        });
    }
});

privateRoutes.route('/maquinas/:id', {
    name: "machine-see",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "machineSee",
        });
    }
});

privateRoutes.route('/novo-projeto', {
    name: "project-new",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "projectNew",
        });
    }
});

privateRoutes.route('/editar-projeto/:id', {
    name: "project-edit",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "projectEdit",
        });
    }
});

privateRoutes.route('/projetos/gerenciar-etapas/:id', {
    name: "project-steps",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "projectStepsManage",
        });
    }
});

privateRoutes.route('/sair', {
    name: "logout",
    action: function (params, queryParams) {

        AccountsTemplates.logout();
        FlowRouter.go(FlowRouter.path('index'));
    }
});
