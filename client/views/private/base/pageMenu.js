Template.pageMenu.helpers({

    getNavBarLinks() {

        return [
            ['projects', 'Projetos'],
            ['steps-library', 'Etapas'],
            ['media-library', 'Mídias'],
            ['machines', 'Máquinas'],
            ['reports', 'Reporte/Bug'],
            ['logout', 'Sair']
        ];
    },

    getActiveLink(routeName) {

        return routeName == FlowRouter.getRouteName();
    }
});