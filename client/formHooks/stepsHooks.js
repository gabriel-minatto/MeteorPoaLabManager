AutoForm.addHooks(['insertStepForm', 'updateStepForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

            if (doc.active == undefined) {
                doc.active = true;
            }            
            this.result(doc);
        },

        update(doc) {

            doc.$set.updatedAt = new Date();
            this.result(doc);
        }
    },
    
    after: {
        
        insert(err, result) {
            
            const params = {

                result: result,
                threeId: Session.get('threeId'),
                projectId: FlowRouter.getParam('id')
            };

            Meteor.call('updatedStepInProject', params, (err, res) => {

                if(!err) return;

                Toast.error(err.message.replace(/[\[\]]/g,''));
            });

            Session.set('threeId', undefined);
            delete Session.keys.threeId;

            Modal.hide();
            
        }
    },

    onSuccess(formType, result) {

        this.resetForm();

        if (FlowRouter.getRouteName() != 'project-steps') {

            FlowRouter.go('steps-library');
            return;
        }
        
        const params = {
            
            projectId: FlowRouter.getParam('id'),
            fatherId: Session.get('fatherId'),
            push: Session.get('push')
        };

        if(params.fatherId == undefined
            || params.projectId == undefined
            || Session.get('threeId') != undefined) {
            return;
        }

        this.insertDoc._id = result;

        Meteor.call('insertStepInProject', this.insertDoc, params, (err, res) => {

            if(!err) return;

            Toast.error(err.message.replace(/[\[\]]/g,''));
        });

        Session.set('fatherId', undefined);
        Session.set('push', undefined);
        delete Session.keys.fatherId;
        delete Session.keys.push;

        Modal.hide();
    }
});
