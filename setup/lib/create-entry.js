/**
 * Create an entry and attach files if there are any
 * @param {*} strapi 
 * @param {*} slug 
 * @param {*} data
 * @param {*} files 
 */
async function createEntry(strapi, slug, data, files) {
  try {
    const createdEntry = await strapi.query(slug).create(data);
    if (files) {
      await strapi.entityService.uploadFiles(createdEntry, files, {
        model: slug
      });
    }

  } catch (e) {
    console.log(e);
  }
}
module.exports = createEntry;