Template.autoForm.onRendered(function () {

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const checkboxes = Array.from(
            document.querySelectorAll("input[type='checkbox']")
        );

        if (!checkboxes || !checkboxes.length) return;

        checkboxes.forEach(inpt => new Switchery(inpt));

        //try to avoid duplicate entries during the page loading
        document.querySelectorAll('.form-group .checkbox label span.switchery:nth-child(3)').forEach(item => item.remove());
    });
});