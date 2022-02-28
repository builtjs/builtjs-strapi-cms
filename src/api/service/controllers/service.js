
'use strict';

/**
 * service controller.
 */

const { createCoreController } = require('@strapi/strapi').factories;
  
module.exports = createCoreController('api::service.service', ({ strapi }) => ({
  async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany('api::service.service', {
          ...query,
          populate: {"contentSections":{"populate":{"shareImage":true,"preheading":true,"image":true,"buttonLinks":true}}}
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);

  }
}));
