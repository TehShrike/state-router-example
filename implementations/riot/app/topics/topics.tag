<topics>
	<div class="container">
		<div class="row">
			<div class="col-sm-4">
				<div class="list-group">
					<span each="{ topics }">
					<a href="{ parent.opts.makePath('app.topics.tasks', 'topicId', id) }"
							class="list-group-item">
						{name} <span class="badge">{ tasksUndone[id] }</span>
					</a>
					</span>
				</div>
				<form action="" onsubmit="{ onAddTopic }">
					<div class="table">
						<div class="table-row-group">
							<div class="table-row">
								<div class="table-cell">
									<input if="{ addingTopic }" type="text" class="new-topic-name form-control" placeholder="Topic name" name="newTopic">
								</div>
								<div class="table-cell" style="width: 60px; vertical-align: top">
									<button type="submit" class="btn btn-default pull-right">Add</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="col-sm-8">
				<ui-view></ui-view>
			</div>
		</div>
	</div>

	this.addingTopic = false

	onAddTopic() {
		var newTopicName = this.newTopic.value
		if (this.addingTopic && newTopicName) {
			this.newTopic.value = ''
			this.addTopic(newTopicName)
		}

		this.addingTopic = !this.addingTopic
		this.update()

		if (this.addingTopic) {
			this.setFocusOnAddTopicEdit()
		}

		return false
	}
</topics>
