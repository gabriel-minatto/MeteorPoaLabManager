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

            const threeId = Session.get('threeId');

            if(!threeId || result == 1) return;

            const step = Steps.findOne({ _id: result });

            atualizarStepProjeto(step, threeId);

            Session.set('threeId', undefined);
            delete Session.keys.threeId;
            
        }
    },

    onSuccess(formType, result) {

        this.resetForm();

        if (FlowRouter.getRouteName() != 'project-steps') {

            FlowRouter.go('steps-library');
        }

        const projectId = FlowRouter.getParam('id');

        const fatherId = Session.get('fatherId');
        const push = Session.get('push');

        if(fatherId == undefined && push == undefined) return;

        const project = Projects.findOne({ _id: projectId });

        this.insertDoc._id = result;

        const newChild = {
            fatherId: fatherId,
            threeId: Random.id(),
            stepNode: this.insertDoc
        };

        if(!project.steps || !project.steps.length){
            newChild.fatherId = false;
        }

        const newNodeThree = procura(fatherId)
            .em(project.steps)
            .insere(newChild, push);

        Meteor.call('updateProject', projectId, {
            steps: newNodeThree
        });

        Session.set('fatherId', undefined);
        Session.set('push', undefined);
        delete Session.keys.fatherId;
        delete Session.keys.push;

    }
});

function atualizarStepProjeto(doc, threeId) {

    const projectId = FlowRouter.getParam('id');

    const project = Projects.findOne({
        _id: projectId
    });

    project.steps =
        atualiza(threeId)
        .em(project.steps)
        .por(doc);

    Meteor.call('updateProject', projectId, {
        steps: project.steps
    });

    Meteor.call('deleteStep', doc._id);

}

function atualiza(threeId) {
    return {
        em(threeNodes) {
            return {
                por(updatedStep) {
                    return threeNodes.reduce((ant, pos, key, arr) => {

                        if (threeId == pos.threeId) {

                            pos.stepNode = Object.assign(pos.stepNode, updatedStep);
                            ant.push(pos);
                            return ant;
                        }

                        if (pos.stepNode.children && pos.stepNode.children.length) {

                            pos.stepNode.children =
                                atualiza(threeId)
                                .em(pos.stepNode.children)
                                .por(updatedStep);
                        }

                        ant.push(pos);
                        return ant;

                    }, []);
                }
            }
        }
    }
}

function procura(fatherId) {

    return {
        em(threeNodes) {
            return {
                insere(newNode, push) {

                    if(!newNode.fatherId) return [newNode];

                    const newThree = [];
                    let stop = false;
                    threeNodes.forEach((val, ind) => {

                        if (stop) return newThree.push(val);

                        if (val.threeId == fatherId) {

                            if (!val.stepNode.children) {
                                val.stepNode.children = [];
                            }

                            if (push) {
                                val.stepNode.children.push(newNode);
                            } else {
                                val.stepNode.children.unshift(newNode);
                            }

                            newThree.push(val);
                            stop = true;
                            return;

                        }

                        if (!val.stepNode.children) {
                            newThree.push(val);
                            return;
                        }

                        val.stepNode.children = procura(fatherId)
                            .em(val.stepNode.children)
                            .insere(newNode, push);

                        newThree.push(val);

                    });

                    return newThree;
                }
            }
        }
    }
}