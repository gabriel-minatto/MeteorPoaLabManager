import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Steps = new Mongo.Collection('steps');

Steps.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Título",
        max: 200
    },
    instructions: {
        type: String,
        label: "Instruções",
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 6
            }
        }
    },
    embedContent: {
        type: Array,
        label: 'Conteúdo Externo (embed code)',
        optional: true
    },
    'embedContent.$': {
        type: String,
        label: 'Embed Code',
        autoform: {
            afFieldInput: {
                type: "text",
                options: {}
            }
        },
        optional: true
    },
    imagesIds: {
        type: Array,
        label: "Imagens (selecione uma ou mais)",
        optional: true
    },
    'imagesIds.$': {
        type: String,
        optional: true
    },
    manualId: {
        type: String,
        label: "Manual/Doc",
        optional: true
    },
    owner: {
        type: Object,
        blackbox: true,
        optional: true
    },
    createdAt: {
        type: Date,
        optional: true
    },
    updatedAt: {
        type: Date,
        optional: true
    },
    active: {
        type: Boolean,
        label: "Ativo"
    }
}, {
    tracker: Tracker
}));