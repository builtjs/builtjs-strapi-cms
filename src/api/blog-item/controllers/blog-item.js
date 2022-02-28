
'use strict';

/**
 * blog-item controller.
 */

const { createCoreController } = require('@strapi/strapi').factories;
  
module.exports = createCoreController('api::blog-item.blog-item', ({ strapi }) => ({
  async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany('api::blog-item.blog-item', {
          ...query,
          populate: {"image":true,"author":{"populate":{"profileImage":true}}}
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);

  }
}));
