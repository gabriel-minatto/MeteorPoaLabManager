Meteor.methods({

    insertProjectMedia(files) {

        if ( !files || (!files.manual && !files.cover) ) return;

        if(files.cover) {

            const coverCFS = MediaFiles.insert(new FS.File(files.cover));

            if (coverCFS) {

                Medias.insert({

                    title: `Capa de ${files.title}`,
                    fileId: coverCFS._id,
                    createdAt: new Date(),
                    owner: Meteor.user()
                });
            }

        }

        if(files.manual) {

            const manualCFS = MediaFiles.insert(new FS.File(files.manual));

            if(manualCFS){

                Medias.insert({

                    title: `Documento de ${files.title}`,
                    fileId: manualCFS._id,
                    createdAt: new Date(),
                    owner: Meteor.user()
                });
            }

        }

    },

    insertMachineMedia(files) {

        if ( !files || (!files.manual && !files.image) ) return;

        if(files.image) {

            const imageCFS = MediaFiles.insert(new FS.File(files.image));

            if (imageCFS) {

                Medias.insert({

                    title: `Imagem de ${files.title}`,
                    fileId: imageCFS._id,
                    createdAt: new Date(),
                    owner: Meteor.user()
                });

            }
        }

        if(files.manual) {

            const manualCFS = MediaFiles.insert(new FS.File(files.manual));

            if(manualCFS){

                Medias.insert({

                    title: `Documento de ${files.title}`,
                    fileId: manualCFS._id,
                    createdAt: new Date(),
                    owner: Meteor.user()
                });
            }

        }

    },

    insertStepImage(file, key, title) {

        if ( !file || !key || !title ) return;

        const imageCFS = MediaFiles.insert(new FS.File(file));

        if (imageCFS) {

            return Medias.insert({

                title: `Imagem #${key} de ${title}`,
                fileId: imageCFS._id,
                createdAt: new Date(),
                owner: Meteor.user()
            });

        }

    },

    insertStepMedia(files) {

        if ( !files || !files.manual ) return;

        if(files.manual) {

            const manualCFS = MediaFiles.insert(new FS.File(files.manual));

            if(manualCFS){

                Medias.insert({

                    title: `Documento de ${files.title}`,
                    fileId: manualCFS._id,
                    createdAt: new Date(),
                    owner: Meteor.user()
                });
            }

        }

    },

    deleteMedia(id) {

        Medias.remove({ _id: id });
    }
});