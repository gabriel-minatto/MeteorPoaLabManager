Template.projectList.onCreated(function() {

    this.filtro = new ReactiveVar(false);

    subsGlobal.subscribe('allProjects');
    subsGlobal.subscribe('allProjectCovers');

    let self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

    });
});

Template.projectList.helpers({

    getProjects() {

        let filtro = Template.instance().filtro.get();
        if (!filtro)
            return Projects.find().fetch();

        return Projects.find(filtro).fetch();
    },

    getProjectCover(id) {

        return ProjectCovers.findOne({ _id: id });
    },

    formatDescription(desc) {
        return `${desc.slice(0, 100)}${(desc.length > 100 ? '...Mais' : '' )}`
    }
});

Template.projectList.events({

    'click .projectFilter': function (e, t) {
        e.preventDefault();
        let param = e.target.dataset.filter;

        const filtro = {};

        if (param == 'userProjects'){

            filtro['owner._id'] = Meteor.userId();
        }

        t.filtro.set(filtro);
    }
});