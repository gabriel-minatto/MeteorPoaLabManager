import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Projects = new Mongo.Collection('projects');

Projects.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Nome",
        max: 200
    },
    description: {
        type: String,
        label: "Descrição",
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 6
            }
        }
    },
    public: {
        type: Boolean,
        label: "Público"
    },
    coverId: {
        type: String,
        label: "Capa"
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
        label: "Ativa",
        optional: true
    }
}, {
    tracker: Tracker
}));