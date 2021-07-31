const setup = require("..");
const createEntry = require("../create-entry");
const fileUtils = require("../file-utils");
const { layout } = require("../../../.data/data.json");

async function importLayoutData(strapi) {
    const files = await fileUtils.getFilesData(layout.files);
    await createEntry(strapi, layout.collectionName, layout.data, files);
}

module.exports = importLayoutData;