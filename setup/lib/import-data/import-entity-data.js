const setup = require("..");
const createEntry = require("../create-entry");
const fileUtils = require("../file-utils");
const { entities } = require("./../../../.data/data.json");

async function importEntityData(strapi) {
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const files = await fileUtils.getFilesData(entity.files);
    await createEntry(strapi, entity.collectionName, entity.attributes, files);
  }
}

module.exports = importEntityData;