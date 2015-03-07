module.exports = function (h, context, helpers) {
	var model = context.model
	var stateRouter = context.stateRouter

	function onlogout(e) {
		console.log('LOGOUT')
		model.saveCurrentUser(null)
		stateRouter.go('login')
		helpers.killEvent(e)
	}

	console.log('rendering app')

	return h('div#app-template', [
		h("nav.navbar.navbar-default", [
			h("div.container-fluid", [
				h("div.navbar-header", [
					h("ul.nav.navbar-nav", [
						h('li', { class: helpers.active('app.topics') }, [
							h('a', { href:  helpers.makePath('app.topics') }, 'Basic todo app!')
						]),
						h('li', { class: helpers.active('app.about')}, [
							h('a', { href:  helpers.makePath('app.about') }, 'About the state router')
						]),
						h('li', h('a', { href: helpers.makePath('login'), onclick: onlogout }, 'Log out'))
					])
				]),
				h('div.nav.navbar-right',
					h('p.navbar-text', [
						'Logged in as ', model.getCurrentUser().name
					])
				)
			])
		]),

		h('ui-view')
	])
}
