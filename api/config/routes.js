var controllers = require('../app/controllers')

module.exports = function (app) {
  //app.get( '/'                           , controllers.home);
  app.get( '/athletes'                   , controllers.athletes.list);
  app.post('/athletes'                   , controllers.athletes.create);
  //app.get( '/athlete/:id'                , controllers.athletes.get);
  //app.post('/athlete/:athleteId/comments', controllers.comments.create);
};