var spaces = require('level-spaces')
var Promise = require('promise')
var uuid4 = require('random-uuid-v4')

/*
- list all topics
- add single topic
- delete single topic (if resolved)
- add task to topic
- mark task as complete
- delete task
*/
module.exports = function(db) {
	var topicsDb = spaces(db, 'topic')
	var taskDb = spaces(db, 'task')


	function listTopics() {
		return new Promise(function(resolve, reject) {
			var topics = []
			topicsDb.createReadStream().on('data', function(data) {
				topics.push({
					id: data.key,
					name: data.value
				})
			}).on('error', function(err) {
				reject(err)
			}).on('end', function() {
				resolve(topics)
			})
		})
	}

	function addTopic(name) {
		var id = uuid4()
		return Promise.denodeify(topicsDb.put.bind(topicsDb))(id, {
			tasks: []
		})
	}

	function listTasks(topicId) {
		return Promise.denodeify(topicsDb.get.bind(topicsDb))(topicId).then(function(topic) {
			return topic.tasks
		})
	}

	function addTask(topicId, taskName) {

	}

	function taskCompleted(topicId, taskId) {

	}

	function deleteTask(topicId, taskId) {

	}

	return {

	}
}
