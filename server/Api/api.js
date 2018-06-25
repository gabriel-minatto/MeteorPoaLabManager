const collections = {
    medias: Medias,
    mediaFiles: MediaFiles
};

Meteor.startup(function () {
    api();
});

const api = () => {

    Api = new Restivus({
        useDefaultAuth: true,
        version: 'v1',
        prettyJson: true,
        auth: {
            user() {

                const userToken = this.request.headers['auth-token'];

                if (!userToken) return false;

                const user = Meteor.users.findOne({
                    'apiToken': userToken
                });

                return {
                    user: user || false
                };
            }
        }

    });

    Api.addRoute('media-files', { authRequired: true }, {
        post: function () {

            if (!this.user || !this.bodyParams.file) {

                return { status: 'error', message: 'Parametros nao encontrados na requisicao' };
            }

            const file = this.bodyParams.file || {};
            const title = this.bodyParams.title || "Arquivo enviado via api";

            try {

                const newFile = new FS.File(file);
                newFile.name = () => title;

                const fileCFS = MediaFiles.insert(newFile);
                if (!fileCFS) {

                    return { status: 'error', message: 'Erro ao criar o arquivo' };
                }

                Medias.insert({

                    title: title,
                    fileId: fileCFS._id,
                    createdAt: new Date(),
                    owner: this.user
                });

            } catch (err) {

                console.log(err);
                return { status: 'error', message: 'Erro ao salvar o arquivo' };
            }

            return { status: 'ok', message: 'Arquivo inserido com sucesso' };

        }
    });

};

