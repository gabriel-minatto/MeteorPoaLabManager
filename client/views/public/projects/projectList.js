Template.projectList.onCreated(function() {

    this.filtro = new ReactiveVar(false);

    subsGlobal.subscribe('publishedProjects');
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
            return Projects.find({}, { sort: { updatedAt : -1 } });

        return Projects.find(filtro, { sort: { updatedAt : -1 } });
    },

    getProjectCover(id) {

        return ProjectCovers.findOne({ _id: id });
    },

    formatDescription(desc) {
        return `${desc.slice(0, 100)}${(desc.length > 100 ? '...Mais' : '' )}`
    },

    canEditPost() {

        if(!Meteor.user()) return false;

        const canEdit = (this.owner._id == Meteor.userId() ||
            Blaze._globalHelpers.checkUserIsInRole('admin'));

        return canEdit;
    }
});

Template.projectList.events({

    'click .projectFilter': function (e, t) {
        e.preventDefault();
        let param = e.target.dataset.filter;

        const filtro = {};

        if (param == 'userProjects')
            filtro['owner._id'] =  Meteor.userId();

        t.filtro.set(filtro);
    }
});