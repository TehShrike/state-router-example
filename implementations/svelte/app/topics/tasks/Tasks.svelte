<script>
	import { createEventDispatcher } from 'svelte'

const dispatch = createEventDispatcher()

export let topic
export let tasks
export let newTaskName = ``

const ifThenStr = (test, result) => test ? result : ``

// [svelte-upgrade suggestion]
// review these functions and remove unnecessary 'export' keywords
export function complete(taskIndex) {
	__this.setTaskDone(taskIndex, true)
}

export function restore(taskIndex) {
	__this.setTaskDone(taskIndex, false)
}
</script>

<h1>{topic.name}</h1>

<table class="table table-striped">
	<thead>
		<tr>
			<th>
				Task name
			</th>
			<th style="width: 100px">
				Complete
			</th>
			<th style="width: 87px">
				Remove
			</th>
		</tr>
	</thead>
	<tbody>
		{#each tasks as task, i}
			<tr>
				<td class="{ifThenStr(task.done, 'text-muted')} center-y">
					<span class="center-y">
						{task.name}
						{#if task.done}
							<span class="glyphicon glyphicon-ok text-success done-checkbox"></span>
						{/if}
					</span>

				</td>
				<td>
					{#if task.done}
						<button class="btn btn-primary full-width" on:click="{() => restore(i)}">Restore</button>
					{:else}
						<button class="btn btn-success full-width" on:click="{() => complete(i)}">Complete</button>
					{/if}
				</td>
				<td>
					<button class="btn btn-danger full-width" on:click="{() => dispatch('remove', i)}">
						Remove
					</button>
				</td>
			</tr>
		{/each}
		<tr>
			<td>
				<input
					type="text"
					class="form-control add-new-task"
					placeholder="New task"
					bind:value="{newTaskName}"
					on:keyup="{event => dispatch('newTaskKeyup', event)}"
				>
			</td>
		</tr>
	</tbody>
</table>

<style>
	.done-checkbox::before {
		margin-left: .2em;
	}
</style>
