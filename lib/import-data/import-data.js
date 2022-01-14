const importPageData = require('./import-page-data');
const importEntityData = require('./import-entity-data');
const importLayoutData = require('./import-layout-data');
const importGlobalData = require('./import-global-data');
const setPublicPermissions = require('./../set-public-permissions');

const permissions = require('./../../.data/permissions');

async function importData(strapi) {
    // Allow read of application content types
    await setPublicPermissions(strapi, permissions);
    // Create all entries
    await importGlobalData(strapi);
    console.log('-----done import global data-------');
    await importLayoutData(strapi);
    // console.log('-----done import layout data-------');
    await importPageData(strapi);
    // console.log('-----done import page data-------');
    await importEntityData(strapi);
    // console.log('-----done import entity data-------');
  };

module.exports = importData;