<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let topicsStore
	export let tasksUndoneStore
	export let asr

	let addingTopic = false
	let newTopic = ''
	let newTopicNameInput = null


	const addTopic = () => {
		if (addingTopic && newTopic) {
			dispatch('add-topic', newTopic)
			newTopic = ''
		} else if (!addingTopic) {
			newTopicNameInput.focus()
		}

		addingTopic = !addingTopic
	}

	const hiddenIfNot = bool => bool ? '' : 'hidden'
</script>

<div class="container">
	<div class="row">
		<div class="col-sm-4">
			<div class="list-group">
				{#each $topicsStore as topic}
					<a
						href="{ asr.makePath('app.topics.tasks', { topicId: topic.id }) }"
						class="list-group-item { asr.stateIsActive('app.topics.tasks', { topicId: topic.id }) ? 'active' : '' }"
					>
						{topic.name} <span class="badge">{ $tasksUndoneStore[topic.id] }</span>
					</a>
				{/each}
			</div>
			<form action="" onsubmit="return false" on:submit="{addTopic}">
				<div class="table">
					<div class="table-row-group">
						<div class="table-row">
							<div class="table-cell">
								<input
									type="text"
									bind:this={newTopicNameInput}
									class="form-control {hiddenIfNot(addingTopic)}"
									placeholder="Topic name"
									bind:value="{newTopic}"
								>
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
			<uiView></uiView>
		</div>
	</div>
</div>
