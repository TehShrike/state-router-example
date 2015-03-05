module.exports = function (h, context) {

	function onlogout() {
		model.saveCurrentUser(null)
		stateRouter.go('login')

		// cancel propagation?
	}

	return h('div',
		h("nav.navbar.navbar-default",
			h("div.container-fluid",
				h("div.navbar-header",
					h("ul.nav.navbar-nav",
						h('li', { class: context.active() },
							h('a', { href: context.makePath('app.topics') }, 'Basic todo app!')
						),
						h('li', { class: context.active()},
							h('a', { href:  context.makePath('app.about') }, 'About the state router')
						),
						h('li',
							h('a', { href: context.makePath('login'), 'on-click': onlogout }, 'Log out')
						)
					)
				),
				h('div.nav.navbar-right',
					h('p.navbar-text',
						'Logged in as ', model.getCurrentUser().name
					)
				)
			)
		),

		h('ui-view')
	)
}
