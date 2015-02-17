var uuid4 = require('random-uuid-v4')
var EventEmitter = require('events').EventEmitter

var topics = []
var tasks = {}
var currentUser = {}

var emitter = new EventEmitter()

module.exports = emitter

emitter.getTopics = getTopics
emitter.getTopic = getTopic
emitter.addTopic = addTopic
emitter.removeTopic = removeTopic
emitter.getTasks = getTasks
emitter.saveTasks = saveTasks
emitter.saveTopics = saveTopics
emitter.getCurrentUser = getCurrentUser
emitter.saveCurrentUser = saveCurrentUser

function getTopics() {
	return topics
}

function getTopic(topicId) {
	return topics.find(function(topic) {
		return topic.id === topicId
	})
}

function addTopic(name) {
	var topic = {
		name: name,
		id: uuid4()
	}

	topics.push(topic)
	tasks[topic.id] = []

	return topic
}

function removeTopic(topicId) {
	var topics = getTopics()
	var index = topics.findIndex(function(topic) {
		return topic.id === topicId
	})
	topics.splice(index, 1)
	tasks[topicId] = null

	saveTopics()
	process.nextTick(function() {
		localStorage.removeItem(topicId)
	})
}

function getTasks(topicId) {
	if (topicId) {
		return tasks[topicId] || []
	} else {
		return tasks
	}
}

function saveTasks(topicId) {
	if (topicId) {
		process.nextTick(function() {
			localStorage.setItem(topicId, JSON.stringify(tasks[topicId]))
		})
		emitter.emit('tasks saved', topicId)
	} else {
		topics.forEach(function(topic) {
			saveTasks(topic.id)
		})
	}
}

function saveTopics() {
	process.nextTick(function() {
		localStorage.setItem('topics', JSON.stringify(topics))
	})
	emitter.emit('topics saved')
}

function getCurrentUser() {
	return currentUser
}

function saveCurrentUser(username) {
	if (typeof username !== 'undefined') {
		currentUser.name = username
	}
	if (currentUser.name) {
		localStorage.setItem('currentUserName', currentUser.name)
	} else {
		localStorage.removeItem('currentUserName')
	}
}

(function initialize() {
	var topicsJson = localStorage.getItem('topics')

	currentUser.name = localStorage.getItem('currentUserName')

	function loadTasks(topicId) {
		tasks[topicId] = JSON.parse(localStorage.getItem(topicId))
	}

	if (topicsJson) {
		topics = JSON.parse(topicsJson)
		topics.forEach(function(topic) {
			loadTasks(topic.id)
		})
	} else {
		initializeDummyData()
	}
})()

function initializeDummyData() {
	console.log('Initializing dummy data')

	topics = [{
		name: 'Important stuff',
		id: uuid4()
	}, {
		name: 'Not as important',
		id: uuid4()
	}]

	tasks = {}

	tasks[topics[0].id] = [{
		name: 'Put on pants',
		done: false
	}, {
		name: 'Visit chat room to see if you still pass the Turing test',
		done: false
	}]

	tasks[topics[1].id] = [{
		name: 'Make cupcakes',
		done: true
	}, {
		name: 'Eat cupcakes',
		done: true
	}, {
		name: 'Write forum post rant about how chocolate cupcakes are the only good kind of cupcake',
		done: false
	}]

	saveTopics()
	saveTasks()
}

