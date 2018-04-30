// PUBLIC
FlowRouter.route('/', {
    name: 'index',
    action: function (params, queryParams) {
        BlazeLayout.render('publicLayout', {
            content: 'index'
        });
    }
});

FlowRouter.route('/projetos', {
    name: "projetos",
    action: function (params, queryParams) {
        BlazeLayout.render('publicLayout', {
            content: "projetos",
        });
    }
});


// PRIVATES
FlowRouter.route('/home', {
    name: "home",
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function (params, queryParams) {
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
    layoutTemplate: 'publicLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'home'
});

AccountsTemplates.configureRoute('signUp', {
    layoutType: 'blaze',
    name: 'cadastrar',
    path: '/cadastrar',
    layoutTemplate: 'publicLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'home'
});

AccountsTemplates.configureRoute('forgotPwd', {
    layoutType: 'blaze',
    name: 'esqueci-senha',
    path: '/esqueci-senha',
    layoutTemplate: 'publicLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'index'
});

/*AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');*/