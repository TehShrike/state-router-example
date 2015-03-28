module.exports = function (h, context, helpers) {
	var username = context.username

	function onlogout(e) {
		helpers.emitter.emit('save tasks')
	}

	return h('div', [
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
						h('li', h('a', {
							href: helpers.makePath('login'),
							action: '',
							onclick: onlogout
						}, 'Log out'))
					])
				]),
				h('div.nav.navbar-right',
					h('p.navbar-text', [
						'Logged in as ', username
					])
				)
			])
		]),

		h('ui-view')
	])
}
