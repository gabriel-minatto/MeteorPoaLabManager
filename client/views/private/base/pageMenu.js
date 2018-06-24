Template.pageMenu.helpers({

    getNavBarLinks() {

        const menus = [
            ['projects', 'Projetos'],
            ['steps-library', 'Etapas'],
            ['media-library', 'Mídias'],
            ['machines', 'Máquinas'],
            ['reports', 'Reporte/Bug'],
            ['logout', 'Sair']
        ];

        if (Blaze._globalHelpers.checkUserIsInRole('admin')) {

            menus.unshift(['administration', 'Administração']);
        }
        return menus;
    },

    getActiveLink(routeName) {

        return routeName == FlowRouter.getRouteName();
    }
});