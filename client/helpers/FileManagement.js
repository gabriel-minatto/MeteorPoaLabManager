Template.registerHelper('tranformToBase64', async (file) => {

    if (!file) return false;

    const temporaryFileReader = new FileReader();

    const result = await new Promise((resolve, reject) => {

      temporaryFileReader.onerror = () => {

        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onloadend = () => {

        resolve(temporaryFileReader.result);
      };

      temporaryFileReader.readAsDataURL(file);
    });

    return result;

});