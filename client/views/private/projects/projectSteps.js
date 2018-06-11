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

        if(!project) return;

        const nodeStructure = tranforma(project.steps).em().diagrama();

        if(!nodeStructure || !Object.keys(nodeStructure).length) return;

        self.nodeStructure.set(nodeStructure);
        self.threeNodes.set(project.steps);
    });
});

Template.projectSteps.onRendered(function() {

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const nodeStructure = self.nodeStructure.get();

        if (!nodeStructure || !Object.keys(nodeStructure).length) return;

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

        const containerClasses = document.querySelector('#stepsContainer').classList;

        containerClasses.remove('animated');
        containerClasses.remove('fadeInLeft');

        new Treant(chart_config, () => {

            containerClasses.add('animated');
            containerClasses.add('fadeInLeft');
        }, $);
    });

    window.addEventListener('resize', function(event) {

        self.nodeStructure.set(self.nodeStructure.get());
    });

});

Template.projectSteps.helpers({

    getProjectId() {

        return FlowRouter.getParam('id');
    },

    projectHasSteps() {

        return Object.keys(Template.instance().nodeStructure.get()).length;
    }
});

Template.projectSteps.events({

    'click .stepBtn, click .firstStepBtn': function (e, t) {

        new Confirmation({
            message: "Escolha entre criar ou escolher uma etapa existente",
            title: "Adicionar etapa",
            cancelText: "Biblioteca",
			cancel: true,
            okText: "Nova",
            success: true, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
        }, (choose) => {


                const fatherId = e.target.dataset.stepid;
                const push = e.target.dataset.push;

                Session.set('fatherId', fatherId);
                Session.set('push', push);

                if(choose) {

                    Modal.show('stepsNewEditModal');
                    return;
                }

                Modal.show('stepsChooseModal');

            }
        );

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

        Modal.show('stepsNewEditModal');
    },

    'click .editStepAnchor': function(e, t) {

        e.preventDefault();
        const threeId = e.target.dataset.threeid;

        const threeNodes = Template.instance().threeNodes.get();

        const step = encontraNodo(threeId).em(threeNodes);

        Session.set('threeId', threeId);
        Modal.show('stepsNewEditModal', {
            step: step,
            editMode: true
        });
    }
});

function tranforma(threeNodes) {

    return {
        em() {
            return {
                diagrama() {

                    if(!threeNodes || !Array.isArray(threeNodes) || !threeNodes.length) return [];

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
            };
        }
    };
}

function encontraNodo(threeId) {
    return {
        em(nodeThree) {
            return nodeThree.reduce((ant, pos, key, arr) => {

                if (ant) return ant;

                if (pos.threeId == threeId) {
                    ant = pos.stepNode;
                    return ant;
                }

                if (pos.stepNode.children && pos.stepNode.children.length) {

                    ant = encontraNodo(threeId).em(pos.stepNode.children);
                }

                return ant;

            }, false);
        }
    };
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
            };
        }
    };
}

function remove(threeId) {

    return {
        from: (fatherId) => {
            return {
                in: (threeNodes) => {
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
            };
        }

    };

}