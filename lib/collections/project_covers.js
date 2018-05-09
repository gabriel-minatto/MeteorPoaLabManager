ProjectCovers = new FS.Collection("projectCovers", {
    stores: [new FS.Store.GridFS("projectCoversStore")]
});

ProjectCovers.allow({
    download: function () {
        return true;
    },
    fetch: null
});