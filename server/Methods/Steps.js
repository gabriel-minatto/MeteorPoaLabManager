Meteor.methods({

    deleteStep(stepId) {

        if (!stepId) return;

        Steps.remove({ _id:stepId });
    },

    insertStepMediaImages(fileIds, stepId) {

        if (!fileIds) return;

        const insertedIds = fileIds.map(id => {

            const imgFS = MediaFiles.findOne({ _id:id });

            if (!imgFS) return false;

            const newImg = new FS.File();
            newImg.attachData(
                imgFS.createReadStream("mediaFiles"),
                {
                    type: imgFS.original.type
                }
            );
            newImg.name = () => imgFS.name();
            newImg.size = () => imgFS.size();

            const newImgObj = StepImages.insert(newImg);

            if (newImgObj && newImgObj._id) {

                return newImgObj._id;
            }

            return false;

        }).filter(id => id);

        if (!insertedIds || !insertedIds.length) return;

        const step = Steps.findOne({ _id: stepId });

        if(!step) return;

        if(!step.imagesIds || !Array.isArray(step.imagesIds))
            step.imagesIds = [];

        step.imagesIds = step.imagesIds.concat(insertedIds);

        Steps.update({ _id:stepId }, { $set: { imagesIds:step.imagesIds } });

    }

});