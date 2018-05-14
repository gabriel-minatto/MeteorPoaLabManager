import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Machines = new Mongo.Collection('machines');

Machines.attachSchema(new SimpleSchema({
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
    available: {
        type: Boolean,
        label: "Disponível"
    },
    imageId: {
        type: String,
        label: "Foto"
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