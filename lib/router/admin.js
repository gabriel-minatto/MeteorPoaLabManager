//ADMIN
const adminRoutes = FlowRouter.group({
    triggersEnter: [
        AccountsTemplates.ensureSignedIn,
        async (context, redirect) => {


            const isInRole = await Meteor.callPromise('checkUserIsInRoles', ['admin']);

            if (!isInRole) {
                Toast.error("Você não possui permissão para acessar essa área do site.",
                    "Acesso negado");
                FlowRouter.go(FlowRouter.path('home'));
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

/*FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render('masterLayout', {
            footer: "footer",
            main: "pageNotFound",
            nav: "nav",
        });
    }
};*/


//Auth Routes
AccountsTemplates.configureRoute('signIn', {
    layoutType: 'blaze',
    name: 'login',
    path: '/login',
    layoutTemplate: 'mainLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'home'
});

AccountsTemplates.configureRoute('signUp', {
    layoutType: 'blaze',
    name: 'cadastrar',
    path: '/cadastrar',
    layoutTemplate: 'mainLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'home'
});

AccountsTemplates.configureRoute('forgotPwd', {
    layoutType: 'blaze',
    name: 'esqueci-senha',
    path: '/esqueci-senha',
    layoutTemplate: 'mainLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'index'
});

/*AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');*/