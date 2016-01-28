// 1. listen for an event: on-change="dispatchValue:ACTION_NAME"
// 2. a decorator that updates the text when the model changes: decorator="update-from:fieldName"

var value = require('dom-value')

module.exports = function setValue(node, content) {
	if (typeof content !== 'undefined') {
		value(node, content)
		console.log('content:', content)
	}
	return {
		teardown: function() {
			console.log('totes teardown')
		}
	}
}
