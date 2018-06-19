import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Medias = new Mongo.Collection('medias');

Medias.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Nome",
        max: 200
    },
    fileId: {
        type: String
    },
    owner: {
        type: Object,
        blackbox: true,
        optional: true
    },
    createdAt: {
        type: Date,
        optional: true
    }
}, {
    tracker: Tracker
}));