var fs = require('fs');
var model = require('model.js');
var ko = require('knockout');


module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: {
			template: fs.readFileSync('implementations/knockout/login/login.html', 'utf8'),
			viewModel: function() {
				var _this = this;

				_this.username = ko.observable('');
				_this.login = function() {
					var username = _this.username();
					if (username) {
						model.saveCurrentUser(username);
						stateRouter.go('app');
					}
				};
			}
		}
	});
};
