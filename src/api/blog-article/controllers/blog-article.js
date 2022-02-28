
'use strict';

/**
 * blog-article controller.
 */

const { createCoreController } = require('@strapi/strapi').factories;
  
module.exports = createCoreController('api::blog-article.blog-article', ({ strapi }) => ({
  async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany('api::blog-article.blog-article', {
          ...query,
          populate: {"contentSections":{"populate":{}}}
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);

  }
}));
