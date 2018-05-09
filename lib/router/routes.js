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


// PRIVATES
const privateRoutes = FlowRouter.group({
    triggersEnter: [
        AccountsTemplates.ensureSignedIn,
        async (context, redirect) => {

            const isInRole = await Meteor.callPromise('checkUserIsInRoles', ['default-group']);

            if (!isInRole && context.route.name != 'home'){
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

        if(!isInRole){
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

privateRoutes.route('/sair', {
    name: "logout",
    action: function (params, queryParams) {

        AccountsTemplates.logout();
        FlowRouter.go(FlowRouter.path('index'));
    }
});

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