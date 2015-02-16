var uuid4 = require('random-uuid-v4')

var topics = [{
	name: 'Important stuff',
	id: uuid4()
}, {
	name: 'Not as important',
	id: uuid4()
}]

var tasks = {}

tasks[topics[0].id] = [{
	name: 'Put on pants',
	done: false
}, {
	name: 'Visit chat room to see if you still pass the Turing test',
	done: false
}]

tasks[topics[1].id] = [{
	name: 'Make cupcakes',
	done: false
}, {
	name: 'Eat cupcakes',
	done: false
}, {
	name: 'Write forum post rant about how chocolate cupcakes are the only good kind of cupcake',
	done: false
}]


module.exports = {
	getTopics: getTopics,
	getTopic: getTopic,
	addTopic: addTopic,
	removeTopic: removeTopic,
	getTasks: getTasks,
	saveTasks: saveTasks,
	saveTopics: saveTopics
}

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
	process.nextTick(function() {
		localStorage.setItem(topicId, JSON.stringify(tasks[topicId]))
	})
}

function saveTopics() {
	process.nextTick(function() {
		localStorage.setItem('topics', JSON.stringify(topics))
	})
}

(function initialize() {
	var topicsJson = localStorage.getItem('topics')

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
		done: false
	}, {
		name: 'Eat cupcakes',
		done: false
	}, {
		name: 'Write forum post rant about how chocolate cupcakes are the only good kind of cupcake',
		done: false
	}]
}

