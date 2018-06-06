Template.pageMenu.helpers({

    getNavBarLinks() {

        return [
            ['home', 'Home'],
            ['machines', 'Máquinas'],
            ['projects', 'Projetos'],
            ['steps-library', 'Etapas'],
            ['reports', 'Reporte/Bug'],
            ['logout', 'Sair']
        ];
    },

    getActiveLink(routeName) {

        return routeName == FlowRouter.getRouteName();
    }
});