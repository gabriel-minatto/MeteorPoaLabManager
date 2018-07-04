import { Meteor } from 'meteor/meteor';

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

                const adminToken = this.request.headers['auth-token'];
                const userEmail = this.request.headers['auth-email'];
                const userPassword = this.request.headers['auth-password'];

                if (!adminToken) return false;

                const user = Meteor.users.findOne({
                    'apiToken': adminToken
                });

                if(!user) return false;

                const isValidLogin = ApiPassword.validate({ email: userEmail, password: userPassword });

                if(!isValidLogin) return false;

                const userObj = Meteor.users.findOne({ "emails.address" : userEmail });

                return {
                    user: userObj || false
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

    Api.addRoute('check-credentials', { authRequired: true }, {

        post: function () {

            if (!this.user) {

                return { status: 'error', message: 'Usuario nao encontrado' };
            }

            return { status: 'ok', message: 'Credenciais corretas' };

        }
    });

};

