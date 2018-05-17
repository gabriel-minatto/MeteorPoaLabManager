Template.projectSteps.onCreated(function() {

    this.threeNodes = new ReactiveVar(false);

    subsGlobal.subscribe('activeUserSteps');
    subsGlobal.subscribe('allStepImages');

    const self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const id = FlowRouter.getParam('id');

        const project = Projects.findOne({
            _id: id
        });

        self.threeNodes.set(project.steps);
    });
})

Template.projectSteps.onRendered(function() {

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const threeNodes = self.threeNodes.get();

        const tranforma = (threeNodes) => {
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
                                    fatherId: val.fatherId
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
        };

        const nodeStructure = tranforma(threeNodes).em().diagrama();

        const chart_config = {
            chart: {
                container: "#stepsContainer",

                connectors: {
                    type: 'step'
                },

                node: {
                    HTMLclass: 'step-node'
                },
            },

            nodeStructure: nodeStructure

        };

        var chart = new Treant(chart_config, null, $);
    });

});

Template.projectSteps.events({

    'click .stepBtn': function (e, t) {

        const threeNodes = Template.instance().threeNodes.get();
        const fatherId = e.target.dataset.stepid;
        const push = e.target.dataset.push;
        console.log(threeNodes);
        //vqHhbpZ7aaoqRFPB4

        const procura = (fatherId) => {
            return {
                em(threeNodes) {
                    return {
                        insere(newNode, push) {
                            const newThree = [];
                            let stop = false;
                            threeNodes.forEach((val, ind) => {

                                if(stop) return newThree.push(val);

                                if(val.stepNode._id == fatherId){

                                    if(!val.stepNode.children){
                                        val.stepNode.children = [];
                                    }

                                    if(push){
                                        val.stepNode.children.push(newNode);
                                    }
                                    val.stepNode.children.unshift(newNode);

                                    newThree.push(val);
                                    stop = true;
                                    return;

                                }

                                if (!val.stepNode.children){
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
        };

        const step = Steps.findOne({_id:"vqHhbpZ7aaoqRFPB4"});
        const newChild = {
            fatherId: fatherId,
            stepNode: step
        };

        const newNodeThree = procura(fatherId)
            .em(threeNodes)
            .insere(newChild, push);

        const id = FlowRouter.getParam('id');

        const project = Projects.update({_id: id},{
            $set:{
                steps: newNodeThree
            }
        });

    },

    updateNode(){

    }
});