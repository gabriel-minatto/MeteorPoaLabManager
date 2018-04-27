// PUBLIC
FlowRouter.route('/', {
    name: 'index',
    action: function (params, queryParams) {
        BlazeLayout.render('publicLayout', {
            content: 'index'
        });
    }
});

FlowRouter.route('/login', {
    name: "login",
    action: function (params, queryParams) {
        BlazeLayout.render('publicLayout', {
            content: "login"
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


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');