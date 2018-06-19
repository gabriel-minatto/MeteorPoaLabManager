Template.mediaLibrary.onCreated(function(){

    this.medias = new ReactiveVar(false);

    subsGlobal.subscribe('userMedias');
    subsGlobal.subscribe('allMediaFiles');

    const self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

        const medias = Medias.find({},  { sort: { createdAt : -1 } }).fetch();

        if(!medias || !medias.length) return;

        const mediaFiles = medias.map(m => {

            if(!m.fileId) return;

            const mediaFile = MediaFiles.findOne({ _id: m.fileId });

            if(!mediaFile) return false;

            m.url = mediaFile.url({ store: 'mediaFilesStore' });

            return m;

        }).filter(m => m);

        self.medias.set(mediaFiles);

    });

});

Template.mediaLibrary.helpers({

    getMediaFiles() {

        if(Template.instance().medias.get().length)
            return Template.instance().medias.get().map(a => JSON.stringify(a));

        return [];
    }
});

Template.mediaLibrary.events({

    'click #newFileBtn': function(e, t) {

        Modal.show('mediaNewModal');
    }

});