MachineImages = new FS.Collection("machineImages", {
    stores: [new FS.Store.GridFS("machineImagesStore")]
});

MachineImages.allow({
    download: function () {
        return true;
    },
    fetch: null
});