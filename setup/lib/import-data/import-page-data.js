const createEntry = require("../create-entry");
const fileUtils = require("../file-utils");
const { pages } = require("./../../../.data/data.json");

async function importPageData(strapi) {
  if (!pages) {
    return;
  }
  for (let i = 0; i < pages.length; i++) {
    const pageData = pages[i];
    for (let i = 0; i < pageData.data.contentSections.length; i++) {
      const contentSection = pageData.data.contentSections[i];
      pageData.data.contentSections[i] = await uploadComponentFiles(
        contentSection,
        pageData
      );
    }
    const files = await fileUtils.getFilesData(pageData.files.page);
    await createEntry(strapi, pageData.collectionName, pageData.data, files);
  }

  async function uploadComponentFiles(obj, pageData) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (
          prop !== "__component" &&
          pageData.files.components &&
          pageData.files.components[prop]
        ) {
          let componentFilesData = obj[prop];
          for (var fileProp in pageData.files.components[prop]) {
            if (pageData.files.components[prop].hasOwnProperty(fileProp)) {
              let fileData = pageData.files.components[prop][fileProp];
              if (!Array.isArray(pageData.files.components[prop][fileProp])) {
                fileData = [pageData.files.components[prop][fileProp]];
              }
              let filesObj = await fileUtils.getFilesData(fileData);
              var files = Object.keys(filesObj).map((key) => {
                return filesObj[key];
              });
              let uploads = await strapi.plugins.upload.services.upload.upload({
                data: {},
                files: files,
              });
              if (Array.isArray(componentFilesData)) {
                for (let i = 0; i < componentFilesData.length; i++) {
                  componentFilesData[i][fileProp] = uploads[i].id;
                }
              } else {
                componentFilesData[fileProp] = uploads[0].id;
              }
            }
          }
        }
      }
    }
    return obj;
  }
}

module.exports = importPageData;