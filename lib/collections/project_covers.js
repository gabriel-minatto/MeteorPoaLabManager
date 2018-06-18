ProjectCovers = new FS.Collection("projectCovers", {
    stores: [new FS.Store.GridFS("projectCoversStore")],
    filter: {
        maxSize: 20971520,
        allow: {
            contentTypes: ['image/*'],
            extensions: ['jpg', 'jpeg', 'gif']
        },
        onInvalid: function(msg) {
            if (Meteor.isClient) {

                Toast.error("Formato e/ou tamanho (máx 20mb) inválido(s)",
                    "Arquivo não enviado");
            }
            console.log(msg);
        }
    }
});

ProjectCovers.allow({
    download: function () {
        return true;
    },
    fetch: null
});