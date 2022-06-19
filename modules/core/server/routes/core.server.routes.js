'use strict';

module.exports = function (app) {
  
  // Root routing
  var core = require('../controllers/core.server.controller');
  app.route('/products/get-products-by-keyword')
  .get(core.getProductsByKeyword)

  app.route('/orders/order-done')
  .put(core.orderDone)

  app.route('/contacts/create-contact')
  .put(core.createContact)

  app.route('/comments/create-comment')
  .put(core.createComment)
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
