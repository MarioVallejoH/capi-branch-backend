'use strict';
module.exports = function (app) {
    var userController = require('../../data/controllers/user_controller');
    var taskController = require('../../data/controllers/task_controllers');
    // todoList Routes
    app.route('/task/all')
        .get(userController.loginRequired, taskController.getAll);
    app.route('/task/create')
        .post(userController.loginRequired, taskController.create);
    app.route('/task/delete')
        .delete(userController.loginRequired, taskController.delete);
    app.route('/task/update')
        .put(userController.loginRequired, taskController.update);
    app.route('/auth/userData')
        .post(userController.loginRequired, userController.profile);
    app.route('/auth/register')
        .post(userController.register);
    app.route('/auth/sign_in')
        .post(userController.sign_in);
};