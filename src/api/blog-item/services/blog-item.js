'use strict';

/**
 * blog-item service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blog-item.blog-item');
