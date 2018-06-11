//Auth Routes
AccountsTemplates.configureRoute('signIn', {
    layoutType: 'blaze',
    name: 'login',
    path: '/login',
    layoutTemplate: 'mainLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'projects'
});

AccountsTemplates.configureRoute('signUp', {
    layoutType: 'blaze',
    name: 'cadastrar',
    path: '/cadastrar',
    layoutTemplate: 'mainLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'projects'
});

AccountsTemplates.configureRoute('forgotPwd', {
    layoutType: 'blaze',
    name: 'esqueci-senha',
    path: '/esqueci-senha',
    layoutTemplate: 'mainLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'login'
});

AccountsTemplates.configureRoute('changePwd', {
    layoutType: 'blaze',
    name: 'trocar-senha',
    path: '/trocar-senha',
    layoutTemplate: 'mainLayout',
    layoutRegions: {
        content: 'autenticationLayout'
    },
    redirect: 'projects'
});

/*AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');*/