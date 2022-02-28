
'use strict';

/**
 * social-link controller.
 */

const { createCoreController } = require('@strapi/strapi').factories;
  
module.exports = createCoreController('api::social-link.social-link', ({ strapi }) => ({
  async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany('api::social-link.social-link', {
          ...query,
          populate: {"icon":true}
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);

  }
}));
