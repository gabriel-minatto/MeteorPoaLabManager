//ADMIN
const adminRoutes = FlowRouter.group({
    triggersEnter: [
        AccountsTemplates.ensureSignedIn,
        async (context, redirect) => {


            const isInRole = await Meteor.callPromise('checkUserIsInRoles', ['admin']);

            if (!isInRole) {
                Toast.error("Você não possui permissão para acessar essa área do site.",
                    "Acesso negado");
                FlowRouter.go(FlowRouter.path('projects'));
            }
        }
    ]
});

adminRoutes.route('/nova-maquina', {
    name: "new-machine",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "machineNew",
        });
    }
});

adminRoutes.route('/editar-maquina/:id', {
    name: "edit-machine",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "machineEdit",
        });
    }
});

adminRoutes.route('/administracao', {
    name: "administration",
    action: function (params, queryParams) {

        BlazeLayout.render('mainLayout', {
            content: "adminDashboard",
        });
    }
});
