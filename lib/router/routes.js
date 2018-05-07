// PUBLIC
FlowRouter.route('/', {
    name: 'index',
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: 'index'
        });
    }
});

FlowRouter.route('/projetos', {
    name: "projetos",
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: "projetos",
        });
    }
});


// PRIVATES
FlowRouter.route('/home', {
    name: "home",
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function (params, queryParams) {

        const user = Meteor.userId();

        if (!user) FlowRouter.go('index');

        Meteor.call('checkUserIsInRole', user, ['default-group'], function (err, isInRole) {

            if(err || isInRole) return;

            Meteor.call('assignUserToRole', user, ['default-group']);
        });

        BlazeLayout.render('mainLayout', {
            content: "homepage",
        });
    }
});

FlowRouter.route('/maquinas', {
    name: "machines",
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: "machine-list",
        });
    }
});

FlowRouter.route('/nova-maquina', {
    name: "new-machine",
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function (params, queryParams) {

        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Toast.error("Você não possui permissão para acessar essa área do site.",
                    "Acesso negado");
            FlowRouter.redirect('/maquinas');
        }

        BlazeLayout.render('mainLayout', {
            content: "machine-list",
        });
    }
});

FlowRouter.route('/meus-projetos', {
    name: "my-projects",
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {
            content: "my-projects",
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