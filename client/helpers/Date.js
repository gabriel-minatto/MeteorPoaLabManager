Template.registerHelper('formatDateToBrText', (data) => {

    if (!data) return false;

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
});

Template.registerHelper('formatDateToBrTextWithTime', (data) => {

    if (!data) return false;

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`;
});