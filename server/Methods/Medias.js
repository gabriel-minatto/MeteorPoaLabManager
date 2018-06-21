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

    insertMachineMedia(files) {

        if ( !files || (!files.manual && !files.image) ) return;

        if(files.image) {

            Medias.insert({

                title: `Capa de ${files.title}`,
                fileId: files.image,
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

    insertStepImage(id, title) {

        if ( !id ) return;

        Medias.insert({

            title: `Imagem da etapa ${title}`,
            fileId: id,
            createdAt: new Date(),
            owner: Meteor.user()
        });

    },

    insertStepManual(files) {

        if ( !files || !files.manual ) return;

        if(files.manual) {

            Medias.insert({

                title: `Documento da etapa ${files.title}`,
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