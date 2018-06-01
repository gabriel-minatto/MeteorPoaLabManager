Template.registerHelper('formatDateToBrText', (data) => {

    if (!data) return false;

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
});

Template.registerHelper('formatDateToBrTextWithTime', (data) => {

    if (!data) return false;

    const minutes = data.getMinutes() > 9 ? data.getMinutes() : '0' + data.getMinutes();

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}:${minutes}`;
});