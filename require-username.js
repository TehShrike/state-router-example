module.exports = function resolve(data, parameters, cb) {
	if (!data.username) {
		cb.redirect('login')
	} else {
		cb(null, {})
	}
}
