Template.searchBar.onCreated(function() {

    this.searchBar = new ReactiveVar("");
    this.searchResults = new ReactiveVar({});

    subsGlobal.subscribe('publishedProjects');

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const searchValue = self.searchBar.get();

        if(!searchValue){
            self.searchResults.set([]);
            return;
        }

        const filter = {
            $or: [
                { title: new RegExp(searchValue, 'gi') },
                { description: new RegExp(searchValue, 'gi') }
            ]
        };

        const results = Projects.find(filter).fetch();

        self.searchResults.set(results);


    });

});

Template.searchBar.helpers({

    searchHasResult() {
        return Template.instance().searchResults.get().length;
    },

    getSearchResults() {
        return Template.instance().searchResults.get();
    }
});

Template.searchBar.events({

    'keyup #searchBar': function(e, t) {

        t.searchBar.set(e.target.value);
    }
});