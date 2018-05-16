Template.pageMenu.helpers({

    getNavBarLinks() {

        return [
            ['home', 'Home'],
            ['machines', 'Máquinas'],
            ['projects', 'Projetos'],
            ['steps-library', 'Etapas'],
            ['logout', 'Sair']
        ];
    },

    getActiveLink(routeName) {

        return routeName == FlowRouter.getRouteName();
    }
});