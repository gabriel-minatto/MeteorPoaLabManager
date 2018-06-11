Template.projectSee.onCreated(function() {

    this.threeNodes = new ReactiveVar(false);
    this.nodeStructure = new ReactiveVar(false);
    this.project = new ReactiveVar(false);

    subsGlobal.subscribe('publishedProjects');
    subsGlobal.subscribe('activeUserSteps');
    subsGlobal.subscribe('allStepImages');

    const self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const id = FlowRouter.getParam('id');
        const project = Projects.findOne({ _id: id });

        if(!id || !project) return;

        const nodeStructure = tranforma(project.steps).em().diagrama();

        self.nodeStructure.set(nodeStructure);
        self.threeNodes.set(project.steps);
        self.project.set(project);
    });
});

Template.projectSee.onRendered(function () {

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

Template.projectSee.helpers({

    getProjectId() {

        return FlowRouter.getParam('id');
    },

    projectHasSteps() {

        return Object.keys(Template.instance().nodeStructure.get()).length;
    },

    getProject() {

        return Template.instance().project.get();
    }
});

Template.projectSee.events({

    'click .step-node': function(e, t) {

        const threeId = e.target.dataset.threeid;
        const project = Template.instance().project.get();
        const step = encontraNodo(threeId).em(project.steps);

        Modal.show('stepsSeeModal', { step:step });
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
                        const newNode = {
                            innerHTML: UI.toHTMLWithData(Template.stepBox, {
                                step: nodo,
                                routeName: 'project-see',
                                threeId: val.threeId,
                                hideBack: true,
                                nodeControls: false
                            })
                        };

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
