import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Reserves = new Mongo.Collection('reserves');

Reserves.attachSchema(new SimpleSchema({
    machineId: {
        type: String,
        label: "Máquina"
    },
    machine: {
        type: Object,
        blackbox: true,
        optional: true
    },
    reservedDate: {
        label: "Data/Hora",
        type: Date
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
    accepted: {
        type: Boolean,
        label: "Aceito",
        optional: true
    }
}, {
    tracker: Tracker
}));