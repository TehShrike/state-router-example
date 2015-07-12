require('array.prototype.findindex');
var fs = require('fs');
var model = require('model.js');
var ko = require('knockout');


module.exports = function(stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: fs.readFileSync('implementations/knockout/app/app.html', 'utf8'),
		resolve: function resolve(data, parameters, cb) {
			var username = model.getCurrentUser().name;
			if (!username) {
				cb.redirect('login');
			} else {
				cb(null, {
					username: ko.observable(username),
					logout: function() {
						model.saveCurrentUser(null);
						stateRouter.go('login');
						return false;
					}
				});
			}
		}
	});

	require('./about/about')(stateRouter);
	require('./topics/topics')(stateRouter);
};
