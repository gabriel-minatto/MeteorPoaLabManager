Meteor.methods({

    insertProjectMedia(files) {

        if ( !files || (!files.manual && !files.cover) ) return;

        if(files.cover) {

            Medias.insert({

                title: `Capa de ${files.title}`,
                fileId: files.cover,
                createdAt: new Date(),
                owner: Meteor.user()
            });
        }

        if(files.manual) {

            Medias.insert({

                title: `Documento de ${files.title}`,
                fileId: files.manual,
                createdAt: new Date(),
                owner: Meteor.user()
            });
        }

    },

    deleteMedia(id) {

        Medias.remove({ _id: id });
    }
});