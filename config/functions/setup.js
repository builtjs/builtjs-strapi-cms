const setup = require('./../../setup/lib');

module.exports = async () => {
  const shouldImportSeedData = await setup.isFirstRun(strapi);
  if (shouldImportSeedData) {
    try {
      await setup.importData(strapi);
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } 
};