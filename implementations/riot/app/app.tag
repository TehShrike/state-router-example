<app>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<ul class="nav navbar-nav">
					<li class="{ active: opts.active('app.topics') }">
						<a href="{ opts.makePath('app.topics') }">Basic todo app!</a>
					</li>
					<li class="{ active: opts.active('app.about') }">
						<a href="{ opts.makePath('app.about') }">About the state router</a>
					</li>
					<li>
						<a href="{ opts.makePath('login') }" on-click="logout">"Log out"</a>
					</li>
				</ul>
			</div>
			<div class="nav navbar-right">
				<p class="navbar-text">
					Logged in as { currentUser.name }
				</p>
			</div>
		</div>
	</nav>

	<ui-view></ui-view>
</app>