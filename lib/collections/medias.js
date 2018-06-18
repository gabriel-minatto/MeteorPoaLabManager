import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Medias = new Mongo.Collection('medias');

Medias.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Nome",
        max: 200
    },
    createdAt: {
        type: Date,
        optional: true
    }
}, {
    tracker: Tracker
}));