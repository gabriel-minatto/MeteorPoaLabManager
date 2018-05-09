ProjectManuals = new FS.Collection("projectManuals", {
    stores: [new FS.Store.GridFS("projectManualsStore")],
    filter: {
        maxSize: 20971520,
        allow: {
            contentTypes: ['application/pdf', 'application/msword', 'text/*'],
            extensions: ['pdf', 'txt', 'doc']
        },
        onInvalid: function (msg) {
            if (Meteor.isClient) {

                Toast.error("Formato e/ou tamanho (máx 20mb) inválido(s)",
                    "Arquivo não enviado");
            }
            console.log(msg);
        }
    }
});

ProjectManuals.allow({
    download: function () {
        return true;
    },
    fetch: null
});