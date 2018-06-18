MediaFiles = new FS.Collection("mediaFiles", {
    stores: [new FS.Store.GridFS("mediaFilesStore")],
    filter: {
        maxSize: 20971520,
        allow: {
            contentTypes: ['application/pdf', 'application/msword', 'text/*', 'image/*'],
            extensions: ['pdf', 'txt', 'doc', 'gif', 'jpg', 'jpeg', 'png']
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

MachineManuals.allow({
    download: function () {
        return true;
    },
    fetch: null
});