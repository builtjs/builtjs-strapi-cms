'use strict';
const setup = require('./../lib');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    (async() => {
      // const shouldImportSeedData = await setup.isFirstRun(strapi);
      // if (shouldImportSeedData) {
        try {
          await setup.importData(strapi);
        } catch (error) {
          console.log('Could not import seed data');
          console.error(error);
        }
      // }
    })()
   
  },
};


// const setup = require('./../lib');

// module.exports = async () => {
//   console.log('...........setup.................');
//   // const shouldImportSeedData = await setup.isFirstRun(strapi);
//   // if (shouldImportSeedData) {
//   //   try {
//   //     await setup.importData(strapi);
//   //   } catch (error) {
//   //     console.log('Could not import seed data');
//   //     console.error(error);
//   //   }
//   // } 
// };
