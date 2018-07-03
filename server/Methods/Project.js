Meteor.methods({

    updateProject(id, set) {

        if (!id || !set) {
            throw new Meteor.Error("Ocorreu um erro ao atualizar o projeto.");
        };

        return Projects.update({_id: id}, {
            $set: set
        });
    },

    updateStepInProject({ threeId, projectId, result }) {

        if(!threeId || !projectId || result == 1) {

            throw new Meteor.Error('Ocorreu um erro ao atualizar a etapa.');
        }

        const doc = Steps.findOne({ _id: result });

        atualizarStepProjeto({ doc, threeId, projectId });
        return true;

    },

    insertStepInProject(doc, { projectId, fatherId, push }) {

        if(projectId == undefined || fatherId == undefined) {

            throw new Meteor.Error("Ocorreu um erro ao inserir a etapa.");
        }

        const project = Projects.findOne({ _id: projectId });

        const newChild = {
            fatherId: fatherId,
            threeId: Random.id(),
            stepNode: doc
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
    }

});


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

function atualizarStepProjeto({ doc, threeId, projectId }) {

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