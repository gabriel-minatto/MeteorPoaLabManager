Template.pageMenu.onCreated(function() {

    this.actualSection = new ReactiveVar('home');
});

Template.pageMenu.helpers({

    getNavBarLinks() {

        return [
            ['home', 'Home'],
            ['machines', 'Máquinas'],
            ['projects', 'Projetos'],
            ['logout', 'Sair']
        ];
    },

    compareWithActualSection(routeName) {

        return Template.instance().actualSection.get() == routeName;
    }
});

Template.pageMenu.events({

    'click .pageMenuLink': function (e, t) {
        let event = document.createEvent('HTMLEvents');
        event.initEvent('click', true, false);
        document.querySelector('.navbar-toggler').dispatchEvent(event);

        t.actualSection.set(e.target.dataset.routename);
    }
});