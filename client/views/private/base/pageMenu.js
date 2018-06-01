Template.pageMenu.helpers({

    getNavBarLinks() {

        return [
            ['home', 'Home'],
            ['machines', 'Máquinas'],
            ['projects', 'Projetos'],
            ['steps-library', 'Etapas'],
            ['contact', 'Contato/BugReport'],
            ['logout', 'Sair']
        ];
    },

    getActiveLink(routeName) {

        return routeName == FlowRouter.getRouteName();
    }
});