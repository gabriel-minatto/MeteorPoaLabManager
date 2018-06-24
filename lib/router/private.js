// PRIVATES
const privateRoutes = FlowRouter.group({
    triggersEnter: [
        AccountsTemplates.ensureSignedIn,
        async (context, redirect) => {

            let isInRole = await Meteor.callPromise('checkUserIsInRoles', ['default-group']);

            if (!isInRole) {
                Meteor.call('assignUserToRole', ['default-group']);
                isInRole = true;
            }

            if (!isInRole || !Meteor.user()) {
                Toast.error("Você não possui permissão para acessar essa área do site.",
                    "Acesso negado");
                FlowRouter.go(FlowRouter.path('projetos'));
            }

        }
    ]
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

privateRoutes.route('/etapas-projeto/:id', {
    name: "project-steps",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "projectSteps",
        });
    }
});

privateRoutes.route('/biblioteca-etapas', {
    name: "steps-library",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "stepsLibrary",
        });
    }
});

privateRoutes.route('/biblioteca-midias', {
    name: "media-library",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "mediaLibrary",
        });
    }
});

privateRoutes.route('/nova-etapa', {
    name: "steps-new",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "stepsNew",
        });
    }
});

privateRoutes.route('/editar-etapa/:id', {
    name: "steps-edit",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "stepsEdit",
        });
    }
});

privateRoutes.route('/reportes', {
    name: "reports",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "reports",
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
