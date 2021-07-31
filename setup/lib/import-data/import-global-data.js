const setup = require("..");
const createEntry = require("../create-entry");
const fileUtils = require("../file-utils");
const { global } = require("../../../.data/data.json");

async function importGlobalData(strapi) {
    const files = await fileUtils.getFilesData(global.files);
    await createEntry(strapi, global.collectionName, global.data, files);
}

module.exports = importGlobalData;