Template.projectSteps.onCreated(function() {

    this.threeNodes = new ReactiveVar(false);
    this.nodeStructure = new ReactiveVar(false);

    subsGlobal.subscribe('publishedProjects');
    subsGlobal.subscribe('activeUserSteps');
    subsGlobal.subscribe('allStepImages');

    const self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const id = FlowRouter.getParam('id');

        const project = Projects.findOne({ _id: id });

        const nodeStructure = tranforma(project.steps).em().diagrama();

        self.nodeStructure.set(nodeStructure);
        self.threeNodes.set(project.steps);
    });
})

Template.projectSteps.onRendered(function() {

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const nodeStructure = self.nodeStructure.get();

        if (!nodeStructure) return;

        const chart_config = {
            chart: {
                container: "#stepsContainer",
                connectors: {
                    type: 'step'
                },
                node: {
                    HTMLclass: 'step-node'
                },
                scrollbar: "fancy"
            },
            nodeStructure: nodeStructure

        };

        new Treant(chart_config, null, $);
    });

});

Template.projectSteps.helpers({

    getProjectId() {

        return FlowRouter.getParam('id');
    }
});

Template.projectSteps.events({

    'click .stepBtn': function (e, t) {

        const threeNodes = Template.instance().threeNodes.get();
        const fatherId = e.target.dataset.stepid;
        const push = e.target.dataset.push;

        FlowRouter.setQueryParams({
            fatherId: fatherId,
            push: push
        });

        Modal.show('stepsNewModal', {
            hideBack: true
        });

        /*const step = Steps.findOne({_id:"2GvPtnHXR82hJwsGx"});
        const newChild = {
            fatherId: fatherId,
            stepNode: step,
            threeId: Random.id()
        };

        const newNodeThree = procura(fatherId)
            .em(threeNodes)
            .insere(newChild, push);

        const id = FlowRouter.getParam('id');

        Meteor.call('updateProject', id, {
            steps: newNodeThree
        });*/

    },

    'click .deleteStepBtn': function(e, t) {
        const threeNodes = Template.instance().threeNodes.get();
        const fatherId = e.target.dataset.stepid;
        const threeId = e.target.dataset.threeid;

        const newNodeThree = remove(threeId)
            .from(fatherId)
            .in(threeNodes);

        const id = FlowRouter.getParam('id');

        Meteor.call('updateProject', id, {
            steps: newNodeThree
        });
    },

    'click #newStepModalBtn': function(e, t) {

        Modal.show('stepsNewModal', { hideBack : true });
    }
});

function tranforma(threeNodes) {
    return {
        em() {
            return {
                diagrama() {
                    const mapNode = threeNodes.map((val, ind, arr) => {
                        const nodo = val.stepNode;
                        const nodeControls = {
                            left: (threeNodes[0].fatherId ? true : false),
                            right: (threeNodes[0].fatherId ? true : false),
                            down: (!nodo.children),
                            fatherId: val.fatherId,
                            threeId: val.threeId
                        };
                        const newNode = {
                            innerHTML: UI.toHTMLWithData(Template.stepBox, {
                                step: nodo,
                                routeName: 'steps-edit',
                                nodeControls: nodeControls
                            })
                        }

                        if (!nodo.children) return newNode;

                        newNode.children = tranforma(nodo.children).em().diagrama();

                        return newNode;
                    });
                    if (!threeNodes[0].fatherId) return mapNode[0];

                    return mapNode;
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

function remove(threeId) {

    return {
        from: (fatherId) => {
            return { in: (threeNodes) => {
                    let stop = false;
                    return threeNodes.map((val, ind, arr) => {

                        if (stop) return val;

                        const nodo = val.stepNode;

                        if (!nodo.children) return val;

                        if (val.threeId == fatherId) {

                            nodo.children =
                                nodo.children.filter(v => v.threeId != threeId);

                            if (!nodo.children.length) {
                                delete nodo.children;
                            }
                            stop = true;
                            val.stepNode = nodo;
                            return val;
                        }

                        nodo.children = remove(threeId)
                            .from(fatherId)
                            .in(nodo.children);

                        val.stepNode = nodo;
                        return val;
                    });
                }
            }
        }

    }

}