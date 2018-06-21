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

            if (mediaFile.original && mediaFile.original.type && mediaFile.original.type.match(/image\/.*/g)) {
                m.cover = true;
            }

            return m;

        }).filter(m => m);

        self.medias.set(mediaFiles);

    });

});

Template.mediaLibrary.helpers({

    getMediaFiles() {

        return Template.instance().medias.get();
    },

    getMediaCover() {

        if(!this.cover) return "/images/file-default.png";

        return this.url;
    }
});

Template.mediaLibrary.events({

    'click #newFileBtn': function(e, t) {

        Modal.show('mediaNewModal');
    },

    'click .deleteMediaBtn': function(e, t) {

        const fileId = e.target.dataset.fileid;
        if(!fileId) return;

        new Confirmation({
            message: "Esta ação não pode ser desfeita.",
            title: "Você tem certeza?",
            cancelText: "Cancelar",
            okText: "Confirmar",
            success: false, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
        }, (ok) => {
            if(!ok) return;
            Meteor.call('deleteMedia', fileId);
        });
    }

});