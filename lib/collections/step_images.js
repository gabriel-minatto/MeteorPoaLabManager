StepImages = new FS.Collection("stepImages", {
    stores: [new FS.Store.GridFS("stepImagesStore")],
    filter: {
        maxSize: 20971520,
        allow: {
            contentTypes: ['image/*'],
            extensions: ['jpg', 'jpeg', 'gif', 'png']
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

StepImages.allow({
    download: function () {
        return true;
    },
    fetch: null
});