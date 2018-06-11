Template.projectList.onCreated(function() {

    this.filtro = new ReactiveVar(false);
    this.projects = new ReactiveVar(false);
    this.projectCovers = new ReactiveDict(false);

    subsGlobal.subscribe('publishedProjects');
    subsGlobal.subscribe('allProjectCovers');

    let self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

        const filtro = self.filtro.get();
        const projects = Projects.find(
            (filtro || {}), //filtro se == true ou obj vazio
            { sort: { updatedAt : -1 } }
        ).fetch();

        if(!projects || !projects.length) return;

        projects.forEach(p => {

            if(!p.coverId) return;

            const pc = ProjectCovers.findOne({ _id: p.coverId });
            self.projectCovers.set(p.coverId,
                pc  ? pc.url({ store: 'projectCoversStore' })
                    : false
            );
        });

        self.projects.set(projects);
});
});

Template.projectList.helpers({

    getProjects() {

        return Template.instance().projects.get();
    },

    getProjectCover(id) {

        return Template.instance().projectCovers.get(id);
    },

    formatDescription(desc) {
        return `${desc.slice(0, 100)}${(desc.length > 100 ? '...Mais' : '' )}`;
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