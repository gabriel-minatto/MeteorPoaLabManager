StepImages = new FS.Collection("stepImages", {
    stores: [new FS.Store.GridFS("stepImagesStore")]
});

StepImages.allow({
    download: function () {
        return true;
    },
    fetch: null
});