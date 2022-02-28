
'use strict';

/**
 * author controller.
 */

const { createCoreController } = require('@strapi/strapi').factories;
  
module.exports = createCoreController('api::author.author', ({ strapi }) => ({
  async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany('api::author.author', {
          ...query,
          populate: {"profileImage":true,"blogItems":true}
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);

  }
}));
