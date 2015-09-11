require('array.prototype.findindex');
var fs = require('fs');
var model = require('model.js');
var ko = require('knockout');


module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: {
			template: fs.readFileSync('implementations/knockout/app/app.html', 'utf8'),
			viewModel: function() {
				var _this = this;
				_this.username = ko.observable('');
				_this.logout = function() {
					model.saveCurrentUser(null);
					stateRouter.go('login');
					return false;
				};
				_this.activate = function(username) {
					_this.username(username);
				}
			}
		},
		resolve: function resolve(data, parameters, cb) {
			var username = model.getCurrentUser().name;
			if (!username) {
				cb.redirect('login');
			} else {
				cb(null, { username: username });
			}
		},
		activate: function(context) {
			var viewModel = context.domApi.viewModel;
			viewModel.activate(context.content.username);
		}
	});

	require('./about/about')(stateRouter);
	require('./topics/topics')(stateRouter);
};
