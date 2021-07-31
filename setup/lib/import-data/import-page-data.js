const setup = require("..");
const createEntry = require("../create-entry");
const fileUtils = require("../file-utils");
const { pages } = require("./../../../.data/data.json");

async function importPageData(strapi) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const files = await fileUtils.getFilesData(page.files);
    await createEntry(strapi, page.collectionName, page.data, files);
  }
}

module.exports = importPageData;