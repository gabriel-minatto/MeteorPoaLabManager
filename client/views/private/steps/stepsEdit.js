Template.stepsEdit.onCreated(function () {

    this.step = new ReactiveVar({});

    subsGlobal.subscribe('activeUserSteps');

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        if(Template.currentData().step) {

            const step = Template.currentData().step;
            self.step.set(step);
            return;
        }

        const id = FlowRouter.getParam('id');

        const step = Steps.findOne({ _id: id });

        self.step.set(step);

    });
});

Template.stepsEdit.helpers({

    getStep() {

        return Template.instance().step.get();
    }
});

Template.stepsEdit.events({

    'click #imagesInput': function(e, t) {

        const imageInput = document.querySelector('input[data-schema-key="imagesIds"]');
        const selectedInput = document.querySelector('#imagesIdsMedia');

        if(imageInput.files && imageInput.files.length) {

            $(imageInput).trigger('click', { clickable:true });
            return;
        }

        if(selectedInput && selectedInput.value) {

            Modal.show('mediaChooseModal');
            return;
        }

        new Confirmation({
            message: "Escolha entre enviar novos arquivos ou escolher em suas mídias",
            title: "Adicionar imagens",
            cancelText: "Mídias",
			cancel: true,
            okText: "Novos",
            success: true, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
        }, (choose) => {

                if(choose) {

                    //if someone is seeing this, sorry for using jquery
                    $(imageInput).trigger('click', { clickable:true });
                    return;
                }
                Modal.allowMultiple = true;
                Modal.show('mediaChooseModal');

            }
        );

    },

    'click input[data-schema-key="imagesIds"]': function(e, t, args) {

        if (!args || !args.clickable) {

            e.preventDefault();
        }
    }
});