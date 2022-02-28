
'use strict';

/**
 * contact controller.
 */

const { createCoreController } = require('@strapi/strapi').factories;
  
module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany('api::contact.contact', {
          ...query,
          populate: {"contentSections":{"populate":{"shareImage":true,"preheading":true,"contextualLinks":{"populate":{"icon":true}},"fields":true,"button":true}}}
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);

  }
}));
