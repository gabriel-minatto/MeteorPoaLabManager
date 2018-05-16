

Template.projectSteps.onRendered(() => {

    const simple_chart_config = {
        chart: {
            container: "#stepsContainer"
        },

        nodeStructure: {
            text: {
                name: "Parent node"
            },
            children: [{
                    text: {
                        name: "First child"
                    }
                },
                {
                    text: {
                        name: "Second child"
                    }
                }
            ]
        }
    };

    var chart = new Treant(simple_chart_config, function() { alert( 'Tree Loaded' ) }, $ );

});

Template.projectSteps.helpers({

});