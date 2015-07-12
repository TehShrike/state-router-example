var fs = require('fs');
var model = require('model.js');
var ko = require('knockout');


module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: fs.readFileSync('implementations/knockout/login/login.html', 'utf8'),
		resolve: function(data, parameters, callback) {
			var viewModel = {
				username: ko.observable(),
				login: function() {
					var username = viewModel.username();
					if (username) {
						model.saveCurrentUser(username);
						stateRouter.go('app');
					}
				}
			};
			callback(null, viewModel);
		}
	});
};
