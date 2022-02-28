
'use strict';

/**
 * benefit controller.
 */

const { createCoreController } = require('@strapi/strapi').factories;
  
module.exports = createCoreController('api::benefit.benefit', ({ strapi }) => ({
  async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany('api::benefit.benefit', {
          ...query,
          populate: {"preheading":true,"image":true,"buttonLinks":true}
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);

  }
}));
