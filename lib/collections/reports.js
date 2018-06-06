import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Reports = new Mongo.Collection('reports');

Reports.attachSchema(new SimpleSchema({
    subject: {
        type: String,
        label: "Assunto",
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
    type: {
        type: String,
        label: "Tipo"
    },
    filesIds: {
        type: Array,
        label: "Prints/Capturas",
        optional: true
    },
    'filesIds.$': {
        type: String,
        label: "Prints/Capturas",
        optional: true
    },
    contact: {
        type: Object,
        label: "Contato",
        optional: true
    },
    'contact.email': {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email",
        autoform: {
            afFieldInput: {
                type: "email",
                placeholder: "example@example.com",
                options: {}
            }
        },
        optional: true
    },
    'contact.phone': {
        type: String,
        label: "Telefone",
        autoform: {
            type: "inputmask",
            afFieldInput: {
                mask: "(99) 99999-9999",
                maskOptions: {
                    clean: true
                },
                options: {}
            }
        },
        optional: true
    },
    'contact.other': {
        type: String,
        label: "Outro",
        autoform: {
            afFieldInput: {
                type: "text",
                options: {}
            }
        },
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
    }
}, {
    tracker: Tracker
}));