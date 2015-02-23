<tasks>
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
			<tr each="{ tasks }">
				<!-- {#done}text-muted{/} -->
				<td class=" center-y">
					<span class="center-y">
						{name} &nbsp;<span if="{ done }" class="glyphicon glyphicon-ok text-success"></span>
					</span>

				</td>
				<td>
					<button if="{ done }" class="btn btn-primary full-width" on-click="restore(this)">Restore</button>
					<button if="{ !done }" class="btn btn-success full-width" on-click="complete(this)">Complete</button>
				</td>
				<td>
					<button class="btn btn-danger full-width" on-click="remove(this)">
						Remove
					</button>
				</td>
			</tr>
			<tr>
				<td>
					<input type="text" class="form-control add-new-task" placeholder="New task" onkeyup="{ newTaskKeyup }" name="newTaskName">
				</td>
			</tr>
		</tbody>
	</table>

	newTaskKeyup(e) {
		var newTaskName = this.newTaskName.value

		if (e.keyCode === 13 && newTaskName) {
			this.newTask(newTaskName)
		}
	}
</tasks>
