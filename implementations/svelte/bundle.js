(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
var uuid4 = require('random-uuid-v4')
var EventEmitter = require('events').EventEmitter

var artificialDelay = 50

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
emitter.saveTask = saveTask

function getTopics(cb) {
	setTimeout(function() {
		cb(null, getTopicsSync())
	}, artificialDelay)
}

function getTopicsSync() {
	return JSON.parse(localStorage.getItem('topics'))
}

function getTopic(topicId, cb) {
	setTimeout(function() {
		cb(null, getTopicSync(topicId))
	}, artificialDelay)
}

function getTopicSync(topicId) {
	return getTopicsSync().find(function(topic) {
		return topic.id === topicId
	})
}

function addTopic(name) {
	var topic = {
		name: name,
		id: uuid4()
	}

	var topics = getTopicsSync()

	topics.push(topic)

	saveTasks(topic.id, [])
	saveTopics(topics)

	return topic
}

function removeTopic(topicId) {
	var topics = getTopicsSync()
	var index = topics.findIndex(function(topic) {
		return topic.id === topicId
	})
	topics.splice(index, 1)

	saveTopics(topics)
	process.nextTick(function() {
		localStorage.removeItem(topicId)
	})
}

function getTasks(topicId, cb) {
	if (typeof topicId === 'function') {
		cb = topicId
		topicId = null
	}

	setTimeout(function() {
		if (topicId) {
			cb(null, getTasksSync(topicId))
		} else {
			cb(null, getTasksMap())
		}
	}, artificialDelay)
}

function getTasksMap() {
	var topics = getTopicsSync()

	return topics.reduce(function(map, topic) {
		var topicId = topic.id
		map[topicId] = getTasksSync(topicId)
		return map
	}, {})
}

function getTasksSync(topicId) {
	var json = localStorage.getItem(topicId)
	return json ? JSON.parse(localStorage.getItem(topicId)) : []
}

function saveTask(topicId, newTaskName) {
	var topicTasks = getTasksSync(topicId)
	var task = {
		name: newTaskName,
		done: false
	}
	topicTasks.push(task)
	saveTasks(topicId, topicTasks)

	return task
}

function saveTasks(topicId, topicTasks) {
	localStorage.setItem(topicId, JSON.stringify(topicTasks))
	emitter.emit('tasks saved', topicId)
}

function saveTopics(topics) {
	localStorage.setItem('topics', JSON.stringify(topics))

	emitter.emit('topics saved')
}

function getCurrentUser() {
	return {
		name: localStorage.getItem('currentUserName')
	}
}

function saveCurrentUser(username) {
	if (username) {
		localStorage.setItem('currentUserName', username)
	} else {
		localStorage.removeItem('currentUserName')
	}
}

(function initialize() {
	if (!localStorage.getItem('topics')) {
		initializeDummyData()
	}
})()

function initializeDummyData() {
	console.log('Initializing dummy data')

	var topic1 = {
		name: 'Important stuff',
		id: uuid4()
	}
	var topic2 = {
		name: 'Not as important',
		id: uuid4()
	}

	saveTopics([ topic1, topic2 ])

	saveTasks(topic1.id, [{
		name: 'Put on pants',
		done: false
	}, {
		name: 'Visit chat room to see if you still pass the Turing test',
		done: false
	}])

	saveTasks(topic2.id, [{
		name: 'Make cupcakes',
		done: true
	}, {
		name: 'Eat cupcakes',
		done: true
	}, {
		name: 'Write forum post rant about how chocolate cupcakes are the only good kind of cupcake',
		done: false
	}])
}


}).call(this,require('_process'))
},{"_process":25,"events":28,"random-uuid-v4":39}],2:[function(require,module,exports){
'use strict';

function renderMainFragment ( root, component, target ) {
	var div = document.createElement( 'div' );
	div.className = "container";
	
	var div1 = document.createElement( 'div' );
	div1.className = "row";
	
	var div2 = document.createElement( 'div' );
	div2.className = "col-sm-offset-2 col-sm-8";
	
	var div3 = document.createElement( 'div' );
	div3.className = "jumbotron";
	
	var h1 = document.createElement( 'h1' );
	
	var text = document.createTextNode( "About this example" );
	h1.appendChild( text );
	
	div3.appendChild( h1 )
	
	div2.appendChild( div3 )
	
	div1.appendChild( div2 )
	
	div.appendChild( div1 )
	
	var text1 = document.createTextNode( "\n\t" );
	div.appendChild( text1 );
	
	var div4 = document.createElement( 'div' );
	div4.className = "row";
	
	var div5 = document.createElement( 'div' );
	div5.className = "col-sm-offset-3 col-sm-6";
	
	var p = document.createElement( 'p' );
	
	var text2 = document.createTextNode( "Pretty sweet, isn't it?  Here, let me give some examples or something." );
	p.appendChild( text2 );
	
	div5.appendChild( p )
	
	div4.appendChild( div5 )
	
	div.appendChild( div4 )
	
	target.appendChild( div )

	return {
		update: function ( changed, root ) {
			
		},

		teardown: function ( detach ) {
			if ( detach ) div.parentNode.removeChild( div );
			
			
			
			
			
			
			
			
			
			if ( detach ) text.parentNode.removeChild( text );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			
			
			
			
			
			
			if ( detach ) text2.parentNode.removeChild( text2 );
		}
	};
}

function about ( options ) {
	var component = this;
	var state = options.data || {};

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment( state, this, options.target );
}

module.exports = about;

},{}],3:[function(require,module,exports){
'use strict';

var component = require('./about.html');

module.exports = function (stateRouter) {
	stateRouter.addState({
		name: 'app.about',
		route: '/about',
		template: component
	});
};

},{"./about.html":2}],4:[function(require,module,exports){
'use strict';

function renderMainFragment ( root, component, target ) {
	var nav = document.createElement( 'nav' );
	nav.className = "navbar navbar-default";
	
	var div = document.createElement( 'div' );
	div.className = "container-fluid";
	
	var div1 = document.createElement( 'div' );
	div1.className = "navbar-header";
	
	var ul = document.createElement( 'ul' );
	ul.className = "nav navbar-nav";
	
	var li = document.createElement( 'li' );
	li.className = root.asr.stateIsActive('app.topics') ? 'active' : '';
	
	var a = document.createElement( 'a' );
	a.href = root.asr.makePath('app.topics');
	
	var text = document.createTextNode( "Basic todo app!" );
	a.appendChild( text );
	
	li.appendChild( a )
	
	ul.appendChild( li )
	
	var text1 = document.createTextNode( "\n\t\t\t\t" );
	ul.appendChild( text1 );
	
	var li1 = document.createElement( 'li' );
	li1.className = root.asr.stateIsActive('app.about') ? 'active' : '';
	
	var a1 = document.createElement( 'a' );
	a1.href = root.asr.makePath('app.about');
	
	var text2 = document.createTextNode( "About the state router" );
	a1.appendChild( text2 );
	
	li1.appendChild( a1 )
	
	ul.appendChild( li1 )
	
	var text3 = document.createTextNode( "\n\t\t\t\t" );
	ul.appendChild( text3 );
	
	var li2 = document.createElement( 'li' );
	
	var a2 = document.createElement( 'a' );
	a2.href = root.asr.makePath('login');
	function clickHandler ( event ) {
		component.fire('logout', event);
	}
	
	a2.addEventListener( 'click', clickHandler, false );
	
	var text4 = document.createTextNode( "\"Log out\"" );
	a2.appendChild( text4 );
	
	li2.appendChild( a2 )
	
	ul.appendChild( li2 )
	
	div1.appendChild( ul )
	
	div.appendChild( div1 )
	
	var text5 = document.createTextNode( "\n\t\t" );
	div.appendChild( text5 );
	
	var div2 = document.createElement( 'div' );
	div2.className = "nav navbar-right";
	
	var p = document.createElement( 'p' );
	p.className = "navbar-text";
	
	var text6 = document.createTextNode( "Logged in as " );
	p.appendChild( text6 );
	
	var text7 = document.createTextNode( root.currentUser.name );
	p.appendChild( text7 );
	
	div2.appendChild( p )
	
	div.appendChild( div2 )
	
	nav.appendChild( div )
	
	target.appendChild( nav )
	
	var text8 = document.createTextNode( "\n\n" );
	target.appendChild( text8 );
	
	var uiView = document.createElement( 'uiView' );
	
	target.appendChild( uiView )

	return {
		update: function ( changed, root ) {
			li.className = root.asr.stateIsActive('app.topics') ? 'active' : '';
			
			a.href = root.asr.makePath('app.topics');
			
			li1.className = root.asr.stateIsActive('app.about') ? 'active' : '';
			
			a1.href = root.asr.makePath('app.about');
			
			a2.href = root.asr.makePath('login');
			
			text7.data = root.currentUser.name;
		},

		teardown: function ( detach ) {
			if ( detach ) nav.parentNode.removeChild( nav );
			
			
			
			
			
			
			
			
			
			
			
			if ( detach ) text.parentNode.removeChild( text );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			
			
			
			
			if ( detach ) text2.parentNode.removeChild( text2 );
			
			if ( detach ) text3.parentNode.removeChild( text3 );
			
			
			
			a2.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) text4.parentNode.removeChild( text4 );
			
			if ( detach ) text5.parentNode.removeChild( text5 );
			
			
			
			
			
			if ( detach ) text6.parentNode.removeChild( text6 );
			
			if ( detach ) text8.parentNode.removeChild( text8 );
			
			if ( detach ) uiView.parentNode.removeChild( uiView );
		}
	};
}

function app ( options ) {
	var component = this;
	var state = options.data || {};

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment( state, this, options.target );
}

module.exports = app;

},{}],5:[function(require,module,exports){
'use strict';

var component = require('./app.html');
var model = require('model.js');

module.exports = function (stateRouter) {
	stateRouter.addState({
		name: 'app',
		route: '/app',
		defaultChild: 'topics',
		template: component,
		resolve: function resolve(data, parameters, cb) {
			var currentUser = model.getCurrentUser();

			if (currentUser.name) {
				cb(null, {
					currentUser: currentUser
				});
			} else {
				cb.redirect('login');
			}
		},
		activate: function activate(_ref) {
			var svelte = _ref.domApi;

			svelte.on('logout', function () {
				model.saveCurrentUser(null);
				stateRouter.go('login');
			});
		}
	});

	require('./about/about')(stateRouter);
	require('./topics/topics')(stateRouter);
};

},{"./about/about":3,"./app.html":4,"./topics/topics":10,"model.js":1}],6:[function(require,module,exports){
'use strict';

function renderMainFragment ( root, component, target ) {
	var p = document.createElement( 'p' );
	
	var text = document.createTextNode( "This is a very basic todo app\tto show off route states." );
	p.appendChild( text );
	
	target.appendChild( p )
	
	var text1 = document.createTextNode( "\n" );
	target.appendChild( text1 );
	
	var p1 = document.createElement( 'p' );
	
	var text2 = document.createTextNode( "Click on one of the topics on the left, and watch both the url and this half of the screen change, without anything else in the dom changing!" );
	p1.appendChild( text2 );
	
	target.appendChild( p1 )

	return {
		update: function ( changed, root ) {
			
		},

		teardown: function ( detach ) {
			if ( detach ) p.parentNode.removeChild( p );
			
			if ( detach ) text.parentNode.removeChild( text );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			if ( detach ) p1.parentNode.removeChild( p1 );
			
			if ( detach ) text2.parentNode.removeChild( text2 );
		}
	};
}

function notaskselected ( options ) {
	var component = this;
	var state = options.data || {};

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment( state, this, options.target );
}

module.exports = notaskselected;

},{}],7:[function(require,module,exports){
'use strict';

var template = (function () {
return {
	data: () => ({
		newTaskName: ''
	}),
	helpers: {
		ifThenStr: (test, result) => test ? result : ''
	},
	methods: {
		complete(taskIndex) {
			this.setTaskDone(taskIndex, true)
		},
		restore(taskIndex) {
			this.setTaskDone(taskIndex, false)
		}
	}
}
}());

let addedCss = false;
function addCss () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        \n\t.done-checkbox[svelte-1091693529]::before, [svelte-1091693529] .done-checkbox::before {\n\t\tmargin-left: .2em;\n\t}\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component, target ) {
	var h1 = document.createElement( 'h1' );
	h1.setAttribute( 'svelte-1091693529', '' );
	
	var text = document.createTextNode( root.topic.name );
	h1.appendChild( text );
	
	target.appendChild( h1 )
	
	var text1 = document.createTextNode( "\n\n" );
	target.appendChild( text1 );
	
	var table = document.createElement( 'table' );
	table.setAttribute( 'svelte-1091693529', '' );
	table.className = "table table-striped";
	
	var thead = document.createElement( 'thead' );
	
	var tr = document.createElement( 'tr' );
	
	var th = document.createElement( 'th' );
	
	var text2 = document.createTextNode( "Task name" );
	th.appendChild( text2 );
	
	tr.appendChild( th )
	
	var text3 = document.createTextNode( "\n\t\t\t" );
	tr.appendChild( text3 );
	
	var th1 = document.createElement( 'th' );
	th1.style.cssText = "width: 100px";
	
	var text4 = document.createTextNode( "Complete" );
	th1.appendChild( text4 );
	
	tr.appendChild( th1 )
	
	var text5 = document.createTextNode( "\n\t\t\t" );
	tr.appendChild( text5 );
	
	var th2 = document.createElement( 'th' );
	th2.style.cssText = "width: 87px";
	
	var text6 = document.createTextNode( "Remove" );
	th2.appendChild( text6 );
	
	tr.appendChild( th2 )
	
	thead.appendChild( tr )
	
	table.appendChild( thead )
	
	var text7 = document.createTextNode( "\n\t" );
	table.appendChild( text7 );
	
	var tbody = document.createElement( 'tbody' );
	
	var eachBlock_0_anchor = document.createComment( "#each tasks" );
	tbody.appendChild( eachBlock_0_anchor );
	
	var eachBlock_0_value = root.tasks;
	var eachBlock_0_fragment = document.createDocumentFragment();
	var eachBlock_0_iterations = [];
	
	for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
		eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
	}
	
	eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
	
	var text8 = document.createTextNode( "\n\t\t" );
	tbody.appendChild( text8 );
	
	var tr1 = document.createElement( 'tr' );
	
	var td = document.createElement( 'td' );
	
	var input = document.createElement( 'input' );
	input.type = "text";
	input.className = "form-control add-new-task";
	input.placeholder = "New task";
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component.set({ newTaskName: input.value });
		input_updating = false;
	}
	
	input.addEventListener( 'input', inputChangeHandler, false );
	input.value = root.newTaskName;
	function keyupHandler ( event ) {
		component.fire('newTaskKeyup', event);
	}
	
	input.addEventListener( 'keyup', keyupHandler, false );
	
	td.appendChild( input )
	
	tr1.appendChild( td )
	
	tbody.appendChild( tr1 )
	
	table.appendChild( tbody )
	
	target.appendChild( table )

	return {
		update: function ( changed, root ) {
			text.data = root.topic.name;
			
			var eachBlock_0_value = root.tasks;
			
			for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
				if ( !eachBlock_0_iterations[i] ) {
					eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
				} else {
					eachBlock_0_iterations[i].update( changed, root, eachBlock_0_value, eachBlock_0_value[i], i );
				}
			}
			
			for ( var i = eachBlock_0_value.length; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( true );
			}
			
			eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
			eachBlock_0_iterations.length = eachBlock_0_value.length;
			
			if ( !input_updating ) input.value = root.newTaskName;
		},

		teardown: function ( detach ) {
			if ( detach ) h1.parentNode.removeChild( h1 );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			if ( detach ) table.parentNode.removeChild( table );
			
			
			
			
			
			
			
			if ( detach ) text2.parentNode.removeChild( text2 );
			
			if ( detach ) text3.parentNode.removeChild( text3 );
			
			
			
			if ( detach ) text4.parentNode.removeChild( text4 );
			
			if ( detach ) text5.parentNode.removeChild( text5 );
			
			
			
			if ( detach ) text6.parentNode.removeChild( text6 );
			
			if ( detach ) text7.parentNode.removeChild( text7 );
			
			
			
			for ( let i = 0; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_0_anchor.parentNode.removeChild( eachBlock_0_anchor );
			
			if ( detach ) text8.parentNode.removeChild( text8 );
			
			
			
			
			
			input.removeEventListener( 'input', inputChangeHandler, false );
			input.removeEventListener( 'keyup', keyupHandler, false );
		}
	};
}

function renderEachBlock_0 ( root, eachBlock_0_value, task, i, component, target ) {
	var tr = document.createElement( 'tr' );
	
	var td = document.createElement( 'td' );
	td.className = "" + ( template.helpers.ifThenStr(task.done, 'text-muted') ) + " center-y";
	
	var span = document.createElement( 'span' );
	span.className = "center-y";
	
	var text = document.createTextNode( task.name );
	span.appendChild( text );
	
	var text1 = document.createTextNode( "\n\t\t\t\t\t\t" );
	span.appendChild( text1 );
	
	var ifBlock_0_anchor = document.createComment( "#if task.done" );
	span.appendChild( ifBlock_0_anchor );
	
	function getBlock_0 ( root, eachBlock_0_value, task, i ) {
		if ( task.done ) return renderIfBlock_0_0;
		return null;
	}
	
	var currentBlock_0 = getBlock_0( root, eachBlock_0_value, task, i );
	var ifBlock_0 = currentBlock_0 && currentBlock_0( root, eachBlock_0_value, task, i, component, span, ifBlock_0_anchor );
	
	td.appendChild( span )
	
	tr.appendChild( td )
	
	var text2 = document.createTextNode( "\n\t\t\t\t" );
	tr.appendChild( text2 );
	
	var td1 = document.createElement( 'td' );
	
	var ifBlock_1_anchor = document.createComment( "#if task.done" );
	td1.appendChild( ifBlock_1_anchor );
	
	function getBlock_1 ( root, eachBlock_0_value, task, i ) {
		if ( task.done ) return renderIfBlock_1_0;
		return renderIfBlock_1_1;
	}
	
	var currentBlock_1 = getBlock_1( root, eachBlock_0_value, task, i );
	var ifBlock_1 = currentBlock_1 && currentBlock_1( root, eachBlock_0_value, task, i, component, td1, ifBlock_1_anchor );
	
	tr.appendChild( td1 )
	
	var text3 = document.createTextNode( "\n\t\t\t\t" );
	tr.appendChild( text3 );
	
	var td2 = document.createElement( 'td' );
	
	var button = document.createElement( 'button' );
	button.className = "btn btn-danger full-width";
	function clickHandler ( event ) {
		var eachBlock_0_value = this.__svelte.eachBlock_0_value, i = this.__svelte.i, task = eachBlock_0_value[i]
		
		component.remove(i);
	}
	
	button.addEventListener( 'click', clickHandler, false );
	button.__svelte = {
		eachBlock_0_value: eachBlock_0_value,
		i: i
	};
	
	var text4 = document.createTextNode( "Remove" );
	button.appendChild( text4 );
	
	td2.appendChild( button )
	
	tr.appendChild( td2 )
	
	target.appendChild( tr )

	return {
		update: function ( changed, root, eachBlock_0_value, task, i ) {
			var task = eachBlock_0_value[i];
			
			td.className = "" + ( template.helpers.ifThenStr(task.done, 'text-muted') ) + " center-y";
			
			text.data = task.name;
			
			var _currentBlock_0 = currentBlock_0;
			currentBlock_0 = getBlock_0( root, eachBlock_0_value, task, i );
			if ( _currentBlock_0 === currentBlock_0 && ifBlock_0) {
				ifBlock_0.update( changed, root, eachBlock_0_value, task, i );
			} else {
				if ( ifBlock_0 ) ifBlock_0.teardown( true );
				ifBlock_0 = currentBlock_0 && currentBlock_0( root, eachBlock_0_value, task, i, component, span, ifBlock_0_anchor );
			}
			
			var _currentBlock_1 = currentBlock_1;
			currentBlock_1 = getBlock_1( root, eachBlock_0_value, task, i );
			if ( _currentBlock_1 === currentBlock_1 && ifBlock_1) {
				ifBlock_1.update( changed, root, eachBlock_0_value, task, i );
			} else {
				if ( ifBlock_1 ) ifBlock_1.teardown( true );
				ifBlock_1 = currentBlock_1 && currentBlock_1( root, eachBlock_0_value, task, i, component, td1, ifBlock_1_anchor );
			}
			
			button.__svelte.eachBlock_0_value = eachBlock_0_value;
			button.__svelte.i = i;
		},

		teardown: function ( detach ) {
			if ( detach ) tr.parentNode.removeChild( tr );
			
			
			
			
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			if ( ifBlock_0 ) ifBlock_0.teardown( detach );
			
			if ( detach ) text2.parentNode.removeChild( text2 );
			
			
			
			if ( ifBlock_1 ) ifBlock_1.teardown( detach );
			
			if ( detach ) text3.parentNode.removeChild( text3 );
			
			
			
			button.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) text4.parentNode.removeChild( text4 );
		}
	};
}

function renderIfBlock_1_1 ( root, eachBlock_0_value, task, i, component, target, anchor ) {
	var button = document.createElement( 'button' );
	button.className = "btn btn-success full-width";
	function clickHandler ( event ) {
		var eachBlock_0_value = this.__svelte.eachBlock_0_value, i = this.__svelte.i, task = eachBlock_0_value[i]
		
		component.complete(i);
	}
	
	button.addEventListener( 'click', clickHandler, false );
	button.__svelte = {
		eachBlock_0_value: eachBlock_0_value,
		i: i
	};
	
	var text = document.createTextNode( "Complete" );
	button.appendChild( text );
	
	anchor.parentNode.insertBefore( button, anchor )

	return {
		update: function ( changed, root, eachBlock_0_value, task, i ) {
			button.__svelte.eachBlock_0_value = eachBlock_0_value;
			button.__svelte.i = i;
		},

		teardown: function ( detach ) {
			button.removeEventListener( 'click', clickHandler, false );
			if ( detach ) button.parentNode.removeChild( button );
			
			if ( detach ) text.parentNode.removeChild( text );
		}
	};
}

function renderIfBlock_1_0 ( root, eachBlock_0_value, task, i, component, target, anchor ) {
	var button = document.createElement( 'button' );
	button.className = "btn btn-primary full-width";
	function clickHandler ( event ) {
		var eachBlock_0_value = this.__svelte.eachBlock_0_value, i = this.__svelte.i, task = eachBlock_0_value[i]
		
		component.restore(i);
	}
	
	button.addEventListener( 'click', clickHandler, false );
	button.__svelte = {
		eachBlock_0_value: eachBlock_0_value,
		i: i
	};
	
	var text = document.createTextNode( "Restore" );
	button.appendChild( text );
	
	anchor.parentNode.insertBefore( button, anchor )

	return {
		update: function ( changed, root, eachBlock_0_value, task, i ) {
			button.__svelte.eachBlock_0_value = eachBlock_0_value;
			button.__svelte.i = i;
		},

		teardown: function ( detach ) {
			button.removeEventListener( 'click', clickHandler, false );
			if ( detach ) button.parentNode.removeChild( button );
			
			if ( detach ) text.parentNode.removeChild( text );
		}
	};
}

function renderIfBlock_0_0 ( root, eachBlock_0_value, task, i, component, target, anchor ) {
	var span = document.createElement( 'span' );
	span.className = "glyphicon glyphicon-ok text-success done-checkbox";
	
	anchor.parentNode.insertBefore( span, anchor )

	return {
		update: function ( changed, root, eachBlock_0_value, task, i ) {
			
		},

		teardown: function ( detach ) {
			if ( detach ) span.parentNode.removeChild( span );
		}
	};
}

function tasks ( options ) {
	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	if ( !addedCss ) addCss();
	
	var mainFragment = renderMainFragment( state, this, options.target );
}

tasks.prototype = template.methods;

module.exports = tasks;

},{}],8:[function(require,module,exports){
'use strict';

var component = require('./tasks.html');
var model = require('model.js');
var all = require('async-all');

var UUID_V4_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';

module.exports = function (stateRouter) {
  stateRouter.addState({
    name: 'app.topics.tasks',
    route: '/:topicId(' + UUID_V4_REGEX + ')',
    template: {
      component: component,
      options: {
        methods: {
          setTaskDone: function setTaskDone(index, done) {
            var topicId = this.get('topicId');
            var tasks = this.get('tasks').slice();
            tasks[index].done = done;

            this.set({ tasks: tasks });

            model.saveTasks(topicId, tasks);
          },
          remove: function remove(taskIndex) {
            var topicId = this.get('topicId');
            var tasksWithIndexElementRemoved = this.get('tasks').slice();

            tasksWithIndexElementRemoved.splice(taskIndex, 1);

            this.set({
              tasks: tasksWithIndexElementRemoved
            });

            model.saveTasks(topicId, tasksWithIndexElementRemoved);
          }
        }
      }
    },
    resolve: function resolve(data, parameters, cb) {
      all({
        topic: model.getTopic.bind(null, parameters.topicId),
        tasks: model.getTasks.bind(null, parameters.topicId),
        topicId: parameters.topicId
      }, cb);
    },
    activate: function activate(context) {
      var svelte = context.domApi;
      var topicId = context.parameters.topicId;

      svelte.on('newTaskKeyup', function (e) {
        var newTaskName = svelte.get('newTaskName');
        if (e.keyCode === 13 && newTaskName) {
          createNewTask(newTaskName);
          svelte.set({
            newTaskName: ''
          });
        }
      });

      function createNewTask(taskName) {
        var task = model.saveTask(topicId, taskName);
        var newTasks = svelte.get('tasks').concat(task);
        svelte.set({
          tasks: newTasks
        });
      }

      svelte.mountedToTarget.querySelector('.add-new-task').focus();
    }
  });

  stateRouter.addState({
    name: 'app.topics.no-task',
    route: '',
    template: require('./no-task-selected.html')
  });
};

},{"./no-task-selected.html":6,"./tasks.html":7,"async-all":24,"model.js":1}],9:[function(require,module,exports){
'use strict';

var template = (function () {
return {
	helpers: {
		hiddenIfNot: bool => bool ? '' : 'hidden'
	},
	data: () => ({
		tasksUndone: {},
		addingTopic: false,
		newTopic: ''
	})
}
}());

function renderMainFragment ( root, component, target ) {
	var div = document.createElement( 'div' );
	div.className = "container";
	
	var div1 = document.createElement( 'div' );
	div1.className = "row";
	
	var div2 = document.createElement( 'div' );
	div2.className = "col-sm-4";
	
	var div3 = document.createElement( 'div' );
	div3.className = "list-group";
	
	var eachBlock_0_anchor = document.createComment( "#each topics" );
	div3.appendChild( eachBlock_0_anchor );
	
	var eachBlock_0_value = root.topics;
	var eachBlock_0_fragment = document.createDocumentFragment();
	var eachBlock_0_iterations = [];
	
	for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
		eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
	}
	
	eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
	
	div2.appendChild( div3 )
	
	var text = document.createTextNode( "\n\t\t\t" );
	div2.appendChild( text );
	
	var form = document.createElement( 'form' );
	form.action = '';
	form.setAttribute( 'onsubmit', "return false" );
	function submitHandler ( event ) {
		component.fire('add-topic', event);
	}
	
	form.addEventListener( 'submit', submitHandler, false );
	
	var div4 = document.createElement( 'div' );
	div4.className = "table";
	
	var div5 = document.createElement( 'div' );
	div5.className = "table-row-group";
	
	var div6 = document.createElement( 'div' );
	div6.className = "table-row";
	
	var div7 = document.createElement( 'div' );
	div7.className = "table-cell";
	
	var input = document.createElement( 'input' );
	input.type = "text";
	input.className = "new-topic-name form-control " + ( template.helpers.hiddenIfNot(root.addingTopic) );
	input.placeholder = "Topic name";
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component.set({ newTopic: input.value });
		input_updating = false;
	}
	
	input.addEventListener( 'input', inputChangeHandler, false );
	input.value = root.newTopic;
	
	div7.appendChild( input )
	
	div6.appendChild( div7 )
	
	var text1 = document.createTextNode( "\n\t\t\t\t\t\t\t" );
	div6.appendChild( text1 );
	
	var div8 = document.createElement( 'div' );
	div8.className = "table-cell";
	div8.style.cssText = "width: 60px; vertical-align: top";
	
	var button = document.createElement( 'button' );
	button.type = "submit";
	button.className = "btn btn-default pull-right";
	
	var text2 = document.createTextNode( "Add" );
	button.appendChild( text2 );
	
	div8.appendChild( button )
	
	div6.appendChild( div8 )
	
	div5.appendChild( div6 )
	
	div4.appendChild( div5 )
	
	form.appendChild( div4 )
	
	div2.appendChild( form )
	
	div1.appendChild( div2 )
	
	var text3 = document.createTextNode( "\n\t\t" );
	div1.appendChild( text3 );
	
	var div9 = document.createElement( 'div' );
	div9.className = "col-sm-8";
	
	var uiView = document.createElement( 'uiView' );
	
	div9.appendChild( uiView )
	
	div1.appendChild( div9 )
	
	div.appendChild( div1 )
	
	target.appendChild( div )

	return {
		update: function ( changed, root ) {
			var eachBlock_0_value = root.topics;
			
			for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
				if ( !eachBlock_0_iterations[i] ) {
					eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
				} else {
					eachBlock_0_iterations[i].update( changed, root, eachBlock_0_value, eachBlock_0_value[i], i );
				}
			}
			
			for ( var i = eachBlock_0_value.length; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( true );
			}
			
			eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
			eachBlock_0_iterations.length = eachBlock_0_value.length;
			
			input.className = "new-topic-name form-control " + ( template.helpers.hiddenIfNot(root.addingTopic) );
			if ( !input_updating ) input.value = root.newTopic;
		},

		teardown: function ( detach ) {
			if ( detach ) div.parentNode.removeChild( div );
			
			
			
			
			
			
			
			for ( let i = 0; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_0_anchor.parentNode.removeChild( eachBlock_0_anchor );
			
			if ( detach ) text.parentNode.removeChild( text );
			
			form.removeEventListener( 'submit', submitHandler, false );
			
			
			
			
			
			
			
			
			
			input.removeEventListener( 'input', inputChangeHandler, false );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			
			
			
			
			if ( detach ) text2.parentNode.removeChild( text2 );
			
			if ( detach ) text3.parentNode.removeChild( text3 );
			
			
			
			
		}
	};
}

function renderEachBlock_0 ( root, eachBlock_0_value, topic, topic__index, component, target ) {
	var a = document.createElement( 'a' );
	a.href = root.asr.makePath('app.topics.tasks', { topicId: topic.id });
	a.className = "list-group-item " + ( root.asr.stateIsActive('app.topics.tasks', { topicId: topic.id }) ? 'active' : '' );
	
	var text = document.createTextNode( topic.name );
	a.appendChild( text );
	
	var text1 = document.createTextNode( " " );
	a.appendChild( text1 );
	
	var span = document.createElement( 'span' );
	span.className = "badge";
	
	var text2 = document.createTextNode( root.tasksUndone[topic.id] );
	span.appendChild( text2 );
	
	a.appendChild( span )
	
	target.appendChild( a )

	return {
		update: function ( changed, root, eachBlock_0_value, topic, topic__index ) {
			var topic = eachBlock_0_value[topic__index];
			
			a.href = root.asr.makePath('app.topics.tasks', { topicId: topic.id });
			a.className = "list-group-item " + ( root.asr.stateIsActive('app.topics.tasks', { topicId: topic.id }) ? 'active' : '' );
			
			text.data = topic.name;
			
			text2.data = root.tasksUndone[topic.id];
		},

		teardown: function ( detach ) {
			if ( detach ) a.parentNode.removeChild( a );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			
		}
	};
}

function topics ( options ) {
	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment( state, this, options.target );
}

module.exports = topics;

},{}],10:[function(require,module,exports){
(function (process){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var component = require('./topics.html');
var model = require('model.js');
var all = require('async-all');

module.exports = function (stateRouter) {
	stateRouter.addState({
		name: 'app.topics',
		route: '/topics',
		defaultChild: 'no-task',
		template: component,
		resolve: function resolve(data, parameters, cb) {
			all({
				topics: model.getTopics,
				tasks: model.getTasks
			}, cb);
		},
		activate: function activate(context) {
			var svelte = context.domApi;

			function setFocusOnAddTopicEdit() {
				process.nextTick(function () {
					svelte.mountedToTarget.querySelector('.new-topic-name').focus();
				});
			}

			function recalculateTasksLeftToDoInTopic(topicId) {
				model.getTasks(topicId, function (err, tasks) {
					var leftToDo = tasks.reduce(function (toDo, task) {
						return toDo + (task.done ? 0 : 1);
					}, 0);

					svelte.set({
						tasksUndone: Object.assign({}, svelte.get('tasksUndone'), _defineProperty({}, topicId, leftToDo))
					});
				});
			}

			model.on('tasks saved', recalculateTasksLeftToDoInTopic);

			context.content.topics.forEach(function (topic) {
				recalculateTasksLeftToDoInTopic(topic.id);
			});

			svelte.on('add-topic', function () {
				var addingTopic = svelte.get('addingTopic');
				var newTopicName = svelte.get('newTopic');

				if (addingTopic && newTopicName) {
					var newTopic = model.addTopic(newTopicName);

					svelte.set({
						topics: svelte.get('topics').concat(newTopic),
						newTopic: ''
					});

					recalculateTasksLeftToDoInTopic(newTopic.id);
					stateRouter.go('app.topics.tasks', {
						topicId: newTopic.id
					});
				} else if (!addingTopic) {
					setFocusOnAddTopicEdit();
				}

				svelte.set({
					addingTopic: !addingTopic
				});

				return false;
			});

			context.on('destroy', function () {
				model.removeListener('tasks saved', recalculateTasksLeftToDoInTopic);
			});
		}
	});

	require('./tasks/tasks')(stateRouter);
};

}).call(this,require('_process'))
},{"./tasks/tasks":8,"./topics.html":9,"_process":25,"async-all":24,"model.js":1}],11:[function(require,module,exports){
'use strict';

var StateRouter = require('abstract-state-router');
var SvelteRenderer = require('svelte-state-renderer');
var domready = require('domready');

domready(function () {
	var stateRouter = StateRouter(SvelteRenderer(), document.querySelector('body'));

	stateRouter.setMaxListeners(20);

	require('./login/login')(stateRouter);
	require('./app/app')(stateRouter);

	stateRouter.evaluateCurrentRoute('login');
});

},{"./app/app":5,"./login/login":13,"abstract-state-router":15,"domready":27,"svelte-state-renderer":40}],12:[function(require,module,exports){
'use strict';

var template = (function () {
return {
	data: () => ({
		username: ''
	})
}
}());

function renderMainFragment ( root, component, target ) {
	var div = document.createElement( 'div' );
	div.className = "container-fluid";
	
	var div1 = document.createElement( 'div' );
	div1.className = "row";
	
	var div2 = document.createElement( 'div' );
	div2.className = "col-sm-offset-3 col-sm-6";
	
	var h1 = document.createElement( 'h1' );
	
	var text = document.createTextNode( "Welcome to the abstract-state-router demo!" );
	h1.appendChild( text );
	
	div2.appendChild( h1 )
	
	div1.appendChild( div2 )
	
	div.appendChild( div1 )
	
	var text1 = document.createTextNode( "\n\t" );
	div.appendChild( text1 );
	
	var div3 = document.createElement( 'div' );
	div3.className = "row margin-top-20";
	
	var div4 = document.createElement( 'div' );
	div4.className = "col-sm-offset-3 col-sm-6";
	
	var div5 = document.createElement( 'div' );
	div5.className = "well";
	
	var p = document.createElement( 'p' );
	p.className = "lead";
	
	var text2 = document.createTextNode( "This is a demo webapp showing off basic usage of the " );
	p.appendChild( text2 );
	
	var a = document.createElement( 'a' );
	a.href = "https://github.com/TehShrike/abstract-state-router";
	
	var text3 = document.createTextNode( "abstract-state-router" );
	a.appendChild( text3 );
	
	p.appendChild( a )
	
	var text4 = document.createTextNode( " library using a few different templating libraries." );
	p.appendChild( text4 );
	
	div5.appendChild( p )
	
	div4.appendChild( div5 )
	
	div3.appendChild( div4 )
	
	div.appendChild( div3 )
	
	var text5 = document.createTextNode( "\n\t" );
	div.appendChild( text5 );
	
	var div6 = document.createElement( 'div' );
	div6.className = "row margin-top-20";
	
	var div7 = document.createElement( 'div' );
	div7.className = "col-sm-offset-4 col-sm-4";
	
	var div8 = document.createElement( 'div' );
	div8.className = "form-group panel";
	
	var form = document.createElement( 'form' );
	form.setAttribute( 'onsubmit', "return false" );
	function submitHandler ( event ) {
		component.fire('login', event);
	}
	
	form.addEventListener( 'submit', submitHandler, false );
	form.className = "panel-body";
	form.action = '';
	
	var label = document.createElement( 'label' );
	
	var text6 = document.createTextNode( "Put in whatever username you feel like:\n\t\t\t\t\t\t" );
	label.appendChild( text6 );
	
	var input = document.createElement( 'input' );
	input.type = "text";
	input.className = "form-control";
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component.set({ username: input.value });
		input_updating = false;
	}
	
	input.addEventListener( 'input', inputChangeHandler, false );
	input.value = root.username;
	
	label.appendChild( input )
	
	form.appendChild( label )
	
	var text7 = document.createTextNode( "\n\t\t\t\t\t" );
	form.appendChild( text7 );
	
	var button = document.createElement( 'button' );
	button.type = "submit";
	button.className = "btn btn-primary";
	
	var text8 = document.createTextNode( "\"Log in\"" );
	button.appendChild( text8 );
	
	form.appendChild( button )
	
	div8.appendChild( form )
	
	div7.appendChild( div8 )
	
	div6.appendChild( div7 )
	
	div.appendChild( div6 )
	
	target.appendChild( div )

	return {
		update: function ( changed, root ) {
			if ( !input_updating ) input.value = root.username;
		},

		teardown: function ( detach ) {
			if ( detach ) div.parentNode.removeChild( div );
			
			
			
			
			
			
			
			if ( detach ) text.parentNode.removeChild( text );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			
			
			
			
			
			
			
			
			if ( detach ) text2.parentNode.removeChild( text2 );
			
			
			
			if ( detach ) text3.parentNode.removeChild( text3 );
			
			if ( detach ) text4.parentNode.removeChild( text4 );
			
			if ( detach ) text5.parentNode.removeChild( text5 );
			
			
			
			
			
			
			
			form.removeEventListener( 'submit', submitHandler, false );
			
			
			
			if ( detach ) text6.parentNode.removeChild( text6 );
			
			input.removeEventListener( 'input', inputChangeHandler, false );
			
			if ( detach ) text7.parentNode.removeChild( text7 );
			
			
			
			if ( detach ) text8.parentNode.removeChild( text8 );
		}
	};
}

function login ( options ) {
	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment( state, this, options.target );
}

module.exports = login;

},{}],13:[function(require,module,exports){
'use strict';

var component = require('./login.html');
var model = require('model.js');

module.exports = function (stateRouter) {
	stateRouter.addState({
		name: 'login',
		route: '/login',
		template: component,
		activate: function activate(_ref) {
			var svelte = _ref.domApi;

			svelte.on('login', function () {
				var username = svelte.get('username');
				if (username) {
					model.saveCurrentUser(username);
					stateRouter.go('app');
				}
				return false;
			});
		}
	});
};

},{"./login.html":12,"model.js":1}],14:[function(require,module,exports){
module.exports = { reverse: false }
},{}],15:[function(require,module,exports){
(function (process){
var StateState = require('./lib/state-state')
var StateComparison = require('./lib/state-comparison')
var CurrentState = require('./lib/current-state')
var stateChangeLogic = require('./lib/state-change-logic')
var parse = require('./lib/state-string-parser')
var StateTransitionManager = require('./lib/state-transition-manager')
var defaultRouterOptions = require('./default-router-options.js')

var series = require('./lib/promise-map-series')
var denodeify = require('then-denodeify')

var EventEmitter = require('events').EventEmitter
var extend = require('xtend')
var newHashBrownRouter = require('hash-brown-router')
var combine = require('combine-arrays')
var buildPath = require('page-path-builder')

require('native-promise-only/npo')

var expectedPropertiesOfAddState = ['name', 'route', 'defaultChild', 'data', 'template', 'resolve', 'activate', 'querystringParameters', 'defaultQuerystringParameters', 'defaultParameters']

module.exports = function StateProvider(makeRenderer, rootElement, stateRouterOptions) {
	var prototypalStateHolder = StateState()
	var lastCompletelyLoadedState = CurrentState()
	var lastStateStartedActivating = CurrentState()
	var stateProviderEmitter = new EventEmitter()
	StateTransitionManager(stateProviderEmitter)
	stateRouterOptions = extend({
		throwOnError: true,
		pathPrefix: '#'
	}, stateRouterOptions)

	if (!stateRouterOptions.router) {
		stateRouterOptions.router = newHashBrownRouter(defaultRouterOptions)
	}

	stateRouterOptions.router.setDefault(function(route, parameters) {
		stateProviderEmitter.emit('routeNotFound', route, parameters)
	})

	var destroyDom = null
	var getDomChild = null
	var renderDom = null
	var resetDom = null

	var activeDomApis = {}
	var activeStateResolveContent = {}
	var activeEmitters = {}

	function handleError(event, err) {
		process.nextTick(function() {
			stateProviderEmitter.emit(event, err)
			console.error(event + ' - ' + err.message)
			if (stateRouterOptions.throwOnError) {
				throw err
			}
		})
	}

	function destroyStateName(stateName) {
		var state = prototypalStateHolder.get(stateName)
		stateProviderEmitter.emit('beforeDestroyState', {
			state: state,
			domApi: activeDomApis[stateName]
		})

		activeEmitters[stateName].emit('destroy')
		activeEmitters[stateName].removeAllListeners()
		delete activeEmitters[stateName]
		delete activeStateResolveContent[stateName]

		return destroyDom(activeDomApis[stateName]).then(function() {
			delete activeDomApis[stateName]
			stateProviderEmitter.emit('afterDestroyState', {
				state: state
			})
		})
	}

	function resetStateName(parameters, stateName) {
		var domApi = activeDomApis[stateName]
		var content = getContentObject(activeStateResolveContent, stateName)
		var state = prototypalStateHolder.get(stateName)

		stateProviderEmitter.emit('beforeResetState', {
			domApi: domApi,
			content: content,
			state: state,
			parameters: parameters
		})

		activeEmitters[stateName].emit('destroy')
		delete activeEmitters[stateName]

		return resetDom({
			domApi: domApi,
			content: content,
			template: state.template,
			parameters: parameters
		}).then(function(newDomApi) {
			if (newDomApi) {
				activeDomApis[stateName] = newDomApi
			}

			stateProviderEmitter.emit('afterResetState', {
				domApi: activeDomApis[stateName],
				content: content,
				state: state,
				parameters: parameters
			})
		})
	}

	function getChildElementForStateName(stateName) {
		return new Promise(function(resolve) {
			var parent = prototypalStateHolder.getParent(stateName)
			if (parent) {
				var parentDomApi = activeDomApis[parent.name]
				resolve(getDomChild(parentDomApi))
			} else {
				resolve(rootElement)
			}
		})
	}

	function renderStateName(parameters, stateName) {
		return getChildElementForStateName(stateName).then(function(childElement) {
			var state = prototypalStateHolder.get(stateName)
			var content = getContentObject(activeStateResolveContent, stateName)

			stateProviderEmitter.emit('beforeCreateState', {
				state: state,
				content: content,
				parameters: parameters
			})

			return renderDom({
				element: childElement,
				template: state.template,
				content: content,
				parameters: parameters
			}).then(function(domApi) {
				activeDomApis[stateName] = domApi
				stateProviderEmitter.emit('afterCreateState', {
					state: state,
					domApi: domApi,
					content: content,
					parameters: parameters
				})
				return domApi
			})
		})
	}

	function renderAll(stateNames, parameters) {
		return series(stateNames, renderStateName.bind(null, parameters))
	}

	function onRouteChange(state, parameters) {
		try {
			var finalDestinationStateName = prototypalStateHolder.applyDefaultChildStates(state.name)

			if (finalDestinationStateName === state.name) {
				emitEventAndAttemptStateChange(finalDestinationStateName, parameters)
			} else {
				// There are default child states that need to be applied

				var theRouteWeNeedToEndUpAt = makePath(finalDestinationStateName, parameters)
				var currentRoute = stateRouterOptions.router.location.get()

				if (theRouteWeNeedToEndUpAt === currentRoute) {
					// the child state has the same route as the current one, just start navigating there
					emitEventAndAttemptStateChange(finalDestinationStateName, parameters)
				} else {
					// change the url to match the full default child state route
					stateProviderEmitter.go(finalDestinationStateName, parameters, { replace: true })
				}
			}
		} catch (err) {
			handleError('stateError', err)
		}
	}

	function addState(state) {
		if (typeof state === 'undefined') {
			throw new Error('Expected \'state\' to be passed in.')
		} else if (typeof state.name === 'undefined') {
			throw new Error('Expected the \'name\' option to be passed in.')
		} else if (typeof state.template === 'undefined') {
			throw new Error('Expected the \'template\' option to be passed in.')
		}
		Object.keys(state).filter(function(key) {
			return expectedPropertiesOfAddState.indexOf(key) === -1
		}).forEach(function(key) {
			console.warn('Unexpected property passed to addState:', key)
		})

		prototypalStateHolder.add(state.name, state)

		var route = prototypalStateHolder.buildFullStateRoute(state.name)

		stateRouterOptions.router.add(route, onRouteChange.bind(null, state))
	}

	function getStatesToResolve(stateChanges) {
		return stateChanges.change.concat(stateChanges.create).map(prototypalStateHolder.get)
	}

	function emitEventAndAttemptStateChange(newStateName, parameters) {
		stateProviderEmitter.emit('stateChangeAttempt', function stateGo(transition) {
			attemptStateChange(newStateName, parameters, transition)
		})
	}

	function attemptStateChange(newStateName, parameters, transition) {
		function ifNotCancelled(fn) {
			return function() {
				if (transition.cancelled) {
					var err = new Error('The transition to ' + newStateName + 'was cancelled')
					err.wasCancelledBySomeoneElse = true
					throw err
				} else {
					return fn.apply(null, arguments)
				}
			}
		}

		return promiseMe(prototypalStateHolder.guaranteeAllStatesExist, newStateName)
		.then(function applyDefaultParameters() {
			var state = prototypalStateHolder.get(newStateName)
			var defaultParams = state.defaultParameters || state.defaultQuerystringParameters || {}
			var needToApplyDefaults = Object.keys(defaultParams).some(function missingParameterValue(param) {
				return typeof parameters[param] === 'undefined'
			})

			if (needToApplyDefaults) {
				throw redirector(newStateName, extend(defaultParams, parameters))
			}
			return state
		}).then(ifNotCancelled(function(state) {
			stateProviderEmitter.emit('stateChangeStart', state, parameters)
			lastStateStartedActivating.set(state.name, parameters)
		})).then(function getStateChanges() {
			var stateComparisonResults = StateComparison(prototypalStateHolder)(lastCompletelyLoadedState.get().name, lastCompletelyLoadedState.get().parameters, newStateName, parameters)
			return stateChangeLogic(stateComparisonResults) // { destroy, change, create }
		}).then(ifNotCancelled(function resolveDestroyAndActivateStates(stateChanges) {
			return resolveStates(getStatesToResolve(stateChanges), extend(parameters)).catch(function onResolveError(e) {
				e.stateChangeError = true
				throw e
			}).then(ifNotCancelled(function destroyAndActivate(stateResolveResultsObject) {
				transition.cancellable = false

				function activateAll() {
					var statesToActivate = stateChanges.change.concat(stateChanges.create)

					return activateStates(statesToActivate)
				}

				activeStateResolveContent = extend(activeStateResolveContent, stateResolveResultsObject)

				return series(reverse(stateChanges.destroy), destroyStateName).then(function() {
					return series(reverse(stateChanges.change), resetStateName.bind(null, extend(parameters)))
				}).then(function() {
					return renderAll(stateChanges.create, extend(parameters)).then(activateAll)
				})
			}))

			function activateStates(stateNames) {
				return stateNames.map(prototypalStateHolder.get).forEach(function(state) {
					var emitter = new EventEmitter()
					var context = Object.create(emitter)
					context.domApi = activeDomApis[state.name]
					context.data = state.data
					context.parameters = parameters
					context.content = getContentObject(activeStateResolveContent, state.name)
					activeEmitters[state.name] = emitter

					try {
						state.activate && state.activate(context)
					} catch (e) {
						process.nextTick(function() {
							throw e
						})
					}
				})
			}
		})).then(function stateChangeComplete() {
			lastCompletelyLoadedState.set(newStateName, parameters)
			try {
				stateProviderEmitter.emit('stateChangeEnd', prototypalStateHolder.get(newStateName), parameters)
			} catch (e) {
				handleError('stateError', e)
			}
		}).catch(ifNotCancelled(function handleStateChangeError(err) {
			if (err && err.redirectTo) {
				stateProviderEmitter.emit('stateChangeCancelled', err)
				return stateProviderEmitter.go(err.redirectTo.name, err.redirectTo.params, { replace: true })
			} else if (err) {
				handleError('stateChangeError', err)
			}
		})).catch(function handleCancellation(err) {
			if (err && err.wasCancelledBySomeoneElse) {
				// we don't care, the state transition manager has already emitted the stateChangeCancelled for us
			} else {
				throw new Error("This probably shouldn't happen, maybe file an issue or something " + err)
			}
		})
	}

	function makePath(stateName, parameters, options) {
		function getGuaranteedPreviousState() {
			if (!lastStateStartedActivating.get().name) {
				throw new Error('makePath required a previous state to exist, and none was found')
			}
			return lastStateStartedActivating.get()
		}
		if (options && options.inherit) {
			parameters = extend(getGuaranteedPreviousState().parameters, parameters)
		}

		var destinationStateName = stateName === null ? getGuaranteedPreviousState().name : stateName

		var destinationState = prototypalStateHolder.get(destinationStateName) || {}
		var defaultParams = destinationState.defaultParameters || destinationState.defaultQuerystringParameters

		parameters = extend(defaultParams, parameters)

		prototypalStateHolder.guaranteeAllStatesExist(destinationStateName)
		var route = prototypalStateHolder.buildFullStateRoute(destinationStateName)
		return buildPath(route, parameters || {})
	}

	var defaultOptions = {
		replace: false
	}

	stateProviderEmitter.addState = addState
	stateProviderEmitter.go = function go(newStateName, parameters, options) {
		options = extend(defaultOptions, options)
		var goFunction = options.replace ? stateRouterOptions.router.replace : stateRouterOptions.router.go

		return promiseMe(makePath, newStateName, parameters, options).then(goFunction, handleError.bind(null, 'stateChangeError'))
	}
	stateProviderEmitter.evaluateCurrentRoute = function evaluateCurrentRoute(defaultState, defaultParams) {
		return promiseMe(makePath, defaultState, defaultParams).then(function(defaultPath) {
			stateRouterOptions.router.evaluateCurrent(defaultPath)
		}).catch(function(err) {
			handleError('stateError', err)
		})
	}
	stateProviderEmitter.makePath = function makePathAndPrependHash(stateName, parameters, options) {
		return stateRouterOptions.pathPrefix + makePath(stateName, parameters, options)
	}
	stateProviderEmitter.stateIsActive = function stateIsActive(stateName, opts) {
		var currentState = lastCompletelyLoadedState.get()
		return (currentState.name === stateName || currentState.name.indexOf(stateName + '.') === 0) && (typeof opts === 'undefined' || Object.keys(opts).every(function matches(key) {
			return opts[key] === currentState.parameters[key]
		}))
	}

	var renderer = makeRenderer(stateProviderEmitter)

	destroyDom = denodeify(renderer.destroy)
	getDomChild = denodeify(renderer.getChildElement)
	renderDom = denodeify(renderer.render)
	resetDom = denodeify(renderer.reset)

	return stateProviderEmitter
}

function getContentObject(stateResolveResultsObject, stateName) {
	var allPossibleResolvedStateNames = parse(stateName)

	return allPossibleResolvedStateNames.filter(function(stateName) {
		return stateResolveResultsObject[stateName]
	}).reduce(function(obj, stateName) {
		return extend(obj, stateResolveResultsObject[stateName])
	}, {})
}

function redirector(newStateName, parameters) {
	return {
		redirectTo: {
			name: newStateName,
			params: parameters
		}
	}
}

// { [stateName]: resolveResult }
function resolveStates(states, parameters) {
	var statesWithResolveFunctions = states.filter(isFunction('resolve'))
	var stateNamesWithResolveFunctions = statesWithResolveFunctions.map(property('name'))
	var resolves = Promise.all(statesWithResolveFunctions.map(function(state) {
		return new Promise(function (resolve, reject) {
			function resolveCb(err, content) {
				err ? reject(err) : resolve(content)
			}

			resolveCb.redirect = function redirect(newStateName, parameters) {
				reject(redirector(newStateName, parameters))
			}

			var res = state.resolve(state.data, parameters, resolveCb)
			if (res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function') {
				resolve(res)
			}
		})
	}))

	return resolves.then(function(resolveResults) {
		return combine({
			stateName: stateNamesWithResolveFunctions,
			resolveResult: resolveResults
		}).reduce(function(obj, result) {
			obj[result.stateName] = result.resolveResult
			return obj
		}, {})
	})
}

function property(name) {
	return function(obj) {
		return obj[name]
	}
}

function reverse(ary) {
	return ary.slice().reverse()
}

function isFunction(property) {
	return function(obj) {
		return typeof obj[property] === 'function'
	}
}

function promiseMe() {
	var fn = Array.prototype.shift.apply(arguments)
	var args = arguments
	return new Promise(function(resolve) {
		resolve(fn.apply(null, args))
	})
}

}).call(this,require('_process'))
},{"./default-router-options.js":14,"./lib/current-state":16,"./lib/promise-map-series":17,"./lib/state-change-logic":18,"./lib/state-comparison":19,"./lib/state-state":20,"./lib/state-string-parser":21,"./lib/state-transition-manager":22,"_process":25,"combine-arrays":26,"events":28,"hash-brown-router":30,"native-promise-only/npo":32,"page-path-builder":33,"then-denodeify":41,"xtend":42}],16:[function(require,module,exports){
module.exports = function CurrentState() {
	var current = {
		name: '',
		parameters: {}
	}

	return {
		get: function() {
			return current
		},
		set: function(name, parameters) {
			current = {
				name: name,
				parameters: parameters
			}
		}
	}
}

},{}],17:[function(require,module,exports){
// Pulled from https://github.com/joliss/promise-map-series and prettied up a bit

var Promise = require('native-promise-only/npo')

module.exports = function sequence(array, iterator, thisArg) {
	var current = Promise.resolve()
	var cb = arguments.length > 2 ? iterator.bind(thisArg) : iterator

	var results = array.map(function(value, i) {
		return current = current.then(function(j) {
			return cb(value, j, array)
		}.bind(null, i))
	})

	return Promise.all(results)
}

},{"native-promise-only/npo":32}],18:[function(require,module,exports){
module.exports = function stateChangeLogic(stateComparisonResults) {
	var hitChangingState = false
	var hitDestroyedState = false

	var output = {
		destroy: [],
		change: [],
		create: []
	}

	stateComparisonResults.forEach(function(state) {
		hitChangingState = hitChangingState || state.stateParametersChanged
		hitDestroyedState = hitDestroyedState || state.stateNameChanged

		if (state.nameBefore) {
			if (hitDestroyedState) {
				output.destroy.push(state.nameBefore)
			} else if (hitChangingState) {
				output.change.push(state.nameBefore)
			}
		}

		if (state.nameAfter && hitDestroyedState) {
			output.create.push(state.nameAfter)
		}
	})

	return output
}

},{}],19:[function(require,module,exports){
var stateStringParser = require('./state-string-parser')
var combine = require('combine-arrays')
var pathToRegexp = require('path-to-regexp-with-reversible-keys')

module.exports = function StateComparison(stateState) {
	var getPathParameters = pathParameters()

	var parametersChanged = parametersThatMatterWereChanged.bind(null, stateState, getPathParameters)

	return stateComparison.bind(null, parametersChanged)
}

function pathParameters() {
	var parameters = {}

	return function getPathParameters(path) {
		if (!path) {
			return []
		}

		if (!parameters[path]) {
			parameters[path] = pathToRegexp(path).keys.map(function(key) {
				return key.name
			})
		}

		return parameters[path]
	}
}

function parametersThatMatterWereChanged(stateState, getPathParameters, stateName, fromParameters, toParameters) {
	var state = stateState.get(stateName)
	var querystringParameters = state.querystringParameters || []
	var parameters = getPathParameters(state.route).concat(querystringParameters)

	return Array.isArray(parameters) && parameters.some(function(key) {
		return fromParameters[key] !== toParameters[key]
	})
}

function stateComparison(parametersChanged, originalState, originalParameters, newState, newParameters) {
	var states = combine({
		start: stateStringParser(originalState),
		end: stateStringParser(newState)
	})

	return states.map(function(states) {
		return {
			nameBefore: states.start,
			nameAfter: states.end,
			stateNameChanged: states.start !== states.end,
			stateParametersChanged: states.start === states.end && parametersChanged(states.start, originalParameters, newParameters)
		}
	})
}

},{"./state-string-parser":21,"combine-arrays":26,"path-to-regexp-with-reversible-keys":35}],20:[function(require,module,exports){
var stateStringParser = require('./state-string-parser')
var parse = require('./state-string-parser')

module.exports = function StateState() {
	var states = {}

	function getHierarchy(name) {
		var names = stateStringParser(name)

		return names.map(function(name) {
			if (!states[name]) {
				throw new Error('State ' + name + ' not found')
			}
			return states[name]
		})
	}

	function getParent(name) {
		var parentName = getParentName(name)

		return parentName && states[parentName]
	}

	function getParentName(name) {
		var names = stateStringParser(name)

		if (names.length > 1) {
			var secondToLast = names.length - 2

			return names[secondToLast]
		} else {
			return null
		}
	}

	function guaranteeAllStatesExist(newStateName) {
		var stateNames = parse(newStateName)
		var statesThatDontExist = stateNames.filter(function(name) {
			return !states[name]
		})

		if (statesThatDontExist.length > 0) {
			throw new Error('State ' + statesThatDontExist[statesThatDontExist.length - 1] + ' does not exist')
		}
	}

	function buildFullStateRoute(stateName) {
		return getHierarchy(stateName).map(function(state) {
			return '/' + (state.route || '')
		}).join('').replace(/\/{2,}/g, '/')
	}

	function applyDefaultChildStates(stateName) {
		var state = states[stateName]

		function getDefaultChildStateName() {
			return state && (typeof state.defaultChild === 'function'
				? state.defaultChild()
				: state.defaultChild)
		}

		var defaultChildStateName = getDefaultChildStateName()

		if (!defaultChildStateName) {
			return stateName
		}

		var fullStateName = stateName + '.' + defaultChildStateName

		return applyDefaultChildStates(fullStateName)
	}


	return {
		add: function(name, state) {
			states[name] = state
		},
		get: function(name) {
			return name && states[name]
		},
		getHierarchy: getHierarchy,
		getParent: getParent,
		getParentName: getParentName,
		guaranteeAllStatesExist: guaranteeAllStatesExist,
		buildFullStateRoute: buildFullStateRoute,
		applyDefaultChildStates: applyDefaultChildStates
	}
}

},{"./state-string-parser":21}],21:[function(require,module,exports){
module.exports = function(stateString) {
	return stateString.split('.').reduce(function(stateNames, latestNameChunk) {
		if (stateNames.length) {
			latestNameChunk = stateNames[stateNames.length - 1] + '.' + latestNameChunk
		}
		stateNames.push(latestNameChunk)
		return stateNames
	}, [])
}

},{}],22:[function(require,module,exports){
module.exports = function (emitter) {
	var currentTransitionAttempt = null
	var nextTransition = null

	function doneTransitioning() {
		currentTransitionAttempt = null
		if (nextTransition) {
			beginNextTransitionAttempt()
		}
	}

	function isTransitioning() {
		return !!currentTransitionAttempt
	}

	function beginNextTransitionAttempt() {
		currentTransitionAttempt = nextTransition
		nextTransition = null
		currentTransitionAttempt.beginStateChange()
	}

	function cancelCurrentTransition() {
		currentTransitionAttempt.transition.cancelled = true
		var err = new Error('State transition cancelled by the state transition manager')
		err.wasCancelledBySomeoneElse = true
		emitter.emit('stateChangeCancelled', err)
	}

	emitter.on('stateChangeAttempt', function(beginStateChange) {
		nextTransition = createStateTransitionAttempt(beginStateChange)

		if (isTransitioning() && currentTransitionAttempt.transition.cancellable) {
			cancelCurrentTransition()
		} else if (!isTransitioning()) {
			beginNextTransitionAttempt()
		}
	})

	emitter.on('stateChangeError', doneTransitioning)
	emitter.on('stateChangeCancelled', doneTransitioning)
	emitter.on('stateChangeEnd', doneTransitioning)

	function createStateTransitionAttempt(beginStateChange) {
		var transition = {
			cancelled: false,
			cancellable: true
		}
		return {
			transition: transition,
			beginStateChange: beginStateChange.bind(null, transition)
		}
	}
}

},{}],23:[function(require,module,exports){
// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
// For all details and docs: https://github.com/paulmillr/array.prototype.find
// Fixes and tests supplied by Duncan Hall <http://duncanhall.net> 
(function(globals){
  if (Array.prototype.find) return;

  var find = function(predicate) {
    var list = Object(this);
    var length = list.length < 0 ? 0 : list.length >>> 0; // ES.ToUint32;
    if (length === 0) return undefined;
    if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
      throw new TypeError('Array#find: predicate must be a function');
    }
    var thisArg = arguments[1];
    for (var i = 0, value; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) return value;
    }
    return undefined;
  };

  if (Object.defineProperty) {
    try {
      Object.defineProperty(Array.prototype, 'find', {
        value: find, configurable: true, enumerable: false, writable: true
      });
    } catch(e) {}
  }

  if (!Array.prototype.find) {
    Array.prototype.find = find;
  }
})(this);

},{}],24:[function(require,module,exports){
(function (process){
module.exports = function all(o, cb) {
	var responded = false
	var zalgoIsAtTheDoor = true
	var running = 0
	var results = {}
	var errorResponse = null

	if (!o || typeof o !== 'object' || Array.isArray(o)) {
		throw new Error('async-all requires you to pass in an object!')
	}

	function respond() {
		function callCallback() {
			if (typeof cb === 'function') {
				if (errorResponse) {
					cb(errorResponse)
				} else {
					cb(null, results)
				}
			}
		}

		if (zalgoIsAtTheDoor) {
			process.nextTick(callCallback)
		} else {
			callCallback()
		}
	}

	function respondIfItMakesSense() {
		if (running === 0 && !responded) {
			respond()
			responded = true
		}
	}

	Object.keys(o).forEach(function(key) {
		var receivedResponse = false
		if (typeof o[key] === 'function') {
			running++
			o[key](function(err, value) {
				if (!receivedResponse) {
					receivedResponse = true
					running--
					if (!errorResponse) {
						if (err) {
							errorResponse = err
						} else {
							results[key] = value
						}
					}
					respondIfItMakesSense()
				}
			})
		} else {
			results[key] = o[key]
		}
	})

	respondIfItMakesSense()
	zalgoIsAtTheDoor = false
}

}).call(this,require('_process'))
},{"_process":25}],25:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],26:[function(require,module,exports){
module.exports = function(obj) {
	var keys = Object.keys(obj)

	keys.forEach(function(key) {
		if (!Array.isArray(obj[key])) {
			throw new Error(key + ' is not an array')
		}
	})

	var maxIndex = keys.reduce(function(maxSoFar, key) {
		var len = obj[key].length
		return maxSoFar > len ? maxSoFar : len
	}, 0)

	var output = []

	function getObject(index) {
		var o = {}
		keys.forEach(function(key) {
			o[key] = obj[key][index]
		})
		return o
	}

	for (var i = 0; i < maxIndex; ++i) {
		output.push(getObject(i))
	}

	return output
}

},{}],27:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}],28:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],29:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter

module.exports = function HashLocation(window) {
	var emitter = new EventEmitter()
	var last = ''
	var needToDecode = getNeedToDecode()

	window.addEventListener('hashchange', function() {
		if (last !== emitter.get()) {
			last = emitter.get()
			emitter.emit('hashchange')
		}
	})

	emitter.go = go.bind(null, window)
	emitter.replace = replace.bind(null, window)
	emitter.get = get.bind(null, window, needToDecode)

	return emitter
}

function replace(window, newPath) {
	window.location.replace(everythingBeforeTheSlash(window.location.href) + '#' + newPath)
}

function everythingBeforeTheSlash(url) {
	var hashIndex = url.indexOf('#')
	return hashIndex === -1 ? url : url.substring(0, hashIndex)
}

function go(window, newPath) {
	window.location.hash = newPath
}

function get(window, needToDecode) {
	var hash = removeHashFromPath(window.location.hash)
	return needToDecode ? decodeURI(hash) : hash
}

function removeHashFromPath(path) {
	return (path && path[0] === '#') ? path.substr(1) : path
}

function getNeedToDecode() {
	var a = document.createElement('a')
	a.href = '#x x'
	return !/x x/.test(a.hash)
}

},{"events":28}],30:[function(require,module,exports){
var pathToRegexp = require('path-to-regexp-with-reversible-keys')
var qs = require('querystring')
var xtend = require('xtend')
var browserHashLocation = require('./hash-location.js')
require('array.prototype.find')

module.exports = function Router(opts, hashLocation) {
	if (isHashLocation(opts)) {
		hashLocation = opts
		opts = null
	}

	opts = opts || {}

	if (!hashLocation) {
		hashLocation = browserHashLocation(window)
	}

	var routes = []

	var onHashChange = evaluateCurrentPath.bind(null, routes, hashLocation, !!opts.reverse)

	hashLocation.on('hashchange', onHashChange)

	function stop() {
		hashLocation.removeListener('hashchange', onHashChange)
	}

	return {
		add: add.bind(null, routes),
		stop: stop,
		evaluateCurrent: evaluateCurrentPathOrGoToDefault.bind(null, routes, hashLocation, !!opts.reverse),
		setDefault: setDefault.bind(null, routes),
		replace: hashLocation.replace,
		go: hashLocation.go,
		location: hashLocation
	}
}

function evaluateCurrentPath(routes, hashLocation, reverse) {
	evaluatePath(routes, hashLocation.get(), reverse)
}

function getPathParts(path) {
	var chunks = path.split('?')
	return {
		path: chunks.shift(),
		queryString: qs.parse(chunks.join(''))
	}
}

function evaluatePath(routes, path, reverse) {
	var pathParts = getPathParts(path)
	path = pathParts.path
	var queryStringParameters = pathParts.queryString

	var matchingRoute = (reverse ? reverseArray(routes) : routes).find("".match, path)

	if (matchingRoute) {
		var regexResult = matchingRoute.exec(path)
		var routeParameters = makeParametersObjectFromRegexResult(matchingRoute.keys, regexResult)
		var params = xtend(queryStringParameters, routeParameters)
		matchingRoute.fn(params)
	} else if (routes.defaultFn) {
		routes.defaultFn(path, queryStringParameters)
	}
}

function reverseArray(ary) {
	return ary.slice().reverse()
}

function makeParametersObjectFromRegexResult(keys, regexResult) {
	return keys.reduce(function(memo, urlKey, index) {
		memo[urlKey.name] = regexResult[index + 1]
		return memo
	}, {})
}

function add(routes, routeString, routeFunction) {
	if (typeof routeFunction !== 'function') {
		throw new Error('The router add function must be passed a callback function')
	}
	var newRoute = pathToRegexp(routeString)
	newRoute.fn = routeFunction
	routes.push(newRoute)
}

function evaluateCurrentPathOrGoToDefault(routes, hashLocation, reverse, defaultPath) {
	if (hashLocation.get()) {
		var routesCopy = routes.slice()
		routesCopy.defaultFn = function() {
			hashLocation.go(defaultPath)
		}
		evaluateCurrentPath(routesCopy, hashLocation, reverse)
	} else {
		hashLocation.go(defaultPath)
	}
}

function setDefault(routes, defaultFn) {
	routes.defaultFn = defaultFn
}

function isHashLocation(hashLocation) {
	return hashLocation && hashLocation.go && hashLocation.replace && hashLocation.on
}
},{"./hash-location.js":29,"array.prototype.find":23,"path-to-regexp-with-reversible-keys":35,"querystring":38,"xtend":42}],31:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],32:[function(require,module,exports){
(function (global){
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(c=n(o))?t(function(){var t=new f(u);try{c.call(o,function(){r.apply(t,arguments)},function(){i.apply(t,arguments)})}catch(n){i.call(t,n)}}):(u.msg=o,u.state=1,u.chain.length>0&&t(e,u))}catch(a){i.call(new f(u),a)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return a.prototype=g,s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],33:[function(require,module,exports){
var parser = require('./path-parser')
var stringifyQuerystring = require('querystring').stringify

module.exports = function(pathStr, parameters) {

	var parsed = typeof pathStr === 'string' ? parser(pathStr) : pathStr
	var allTokens = parsed.allTokens
	var regex = parsed.regex

	if (parameters) {
		var path = allTokens.map(function(bit) {
			if (bit.string) {
				return bit.string
			}

			var defined = typeof parameters[bit.name] !== 'undefined'
			if (!bit.optional && !defined) {
				throw new Error('Must supply argument ' + bit.name + ' for path ' + pathStr)
			}

			return defined ? (bit.delimiter + encodeURIComponent(parameters[bit.name])) : ''
		}).join('')

		if (!regex.test(path)) {
			throw new Error('Provided arguments do not match the original arguments')
		}

		return buildPathWithQuerystring(path, parameters, allTokens)
	} else {
		return parsed
	}
}

function buildPathWithQuerystring(path, parameters, tokenArray) {
	var parametersInQuerystring = getParametersWithoutMatchingToken(parameters, tokenArray)

	if (Object.keys(parametersInQuerystring).length === 0) {
		return path
	}

	return path + '?' + stringifyQuerystring(parametersInQuerystring)
}

function getParametersWithoutMatchingToken(parameters, tokenArray) {
	var tokenHash = tokenArray.reduce(function(memo, bit) {
		if (!bit.string) {
			memo[bit.name] = bit
		}
		return memo
	}, {})

	return Object.keys(parameters).filter(function(param) {
		return !tokenHash[param]
	}).reduce(function(newParameters, param) {
		newParameters[param] = parameters[param]
		return newParameters
	}, {})
}

},{"./path-parser":34,"querystring":38}],34:[function(require,module,exports){
// This file to be replaced with an official implementation maintained by
// the page.js crew if and when that becomes an option

var pathToRegexp = require('path-to-regexp-with-reversible-keys')

module.exports = function(pathString) {
	var parseResults = pathToRegexp(pathString)

	// The only reason I'm returning a new object instead of the results of the pathToRegexp
	// function is so that if the official implementation ends up returning an
	// allTokens-style array via some other mechanism, I may be able to change this file
	// without having to change the rest of the module in index.js
	return {
		regex: parseResults,
		allTokens: parseResults.allTokens
	}
}

},{"path-to-regexp-with-reversible-keys":35}],35:[function(require,module,exports){
var isArray = require('isarray');

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)" => [undefined, undefined, undefined, "\d+", undefined]
  '([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?',
  // Match regexp special characters that are always escaped.
  '([.+*?=^!:${}()[\\]|\\/])'
].join('|'), 'g');

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys, allTokens) {
  re.keys = keys;
  re.allTokens = allTokens;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys, allTokens) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name:      i,
        delimiter: null,
        optional:  false,
        repeat:    false
      });
    }
  }

  return attachKeys(path, keys, allTokens);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options, allTokens) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options, allTokens).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys, allTokens);
}

/**
 * Replace the specific tags with regexp strings.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @return {String}
 */
function replacePath (path, keys, allTokens) {
  var index = 0;
  var lastEndIndex = 0

  function addLastToken(lastToken) {
    if (lastEndIndex === 0 && lastToken[0] !== '/') {
      lastToken = '/' + lastToken
    }
    allTokens.push({
      string: lastToken
    });
  }


  function replace (match, escaped, prefix, key, capture, group, suffix, escape, offset) {
    if (escaped) {
      return escaped;
    }

    if (escape) {
      return '\\' + escape;
    }

    var repeat   = suffix === '+' || suffix === '*';
    var optional = suffix === '?' || suffix === '*';

    if (offset > lastEndIndex) {
      addLastToken(path.substring(lastEndIndex, offset));
    }

    lastEndIndex = offset + match.length;

    var newKey = {
      name:      key || index++,
      delimiter: prefix || '/',
      optional:  optional,
      repeat:    repeat
    }

    keys.push(newKey);
    allTokens.push(newKey);

    prefix = prefix ? ('\\' + prefix) : '';
    capture = escapeGroup(capture || group || '[^' + (prefix || '\\/') + ']+?');

    if (repeat) {
      capture = capture + '(?:' + prefix + capture + ')*';
    }

    if (optional) {
      return '(?:' + prefix + '(' + capture + '))?';
    }

    // Basic parameter support.
    return prefix + '(' + capture + ')';
  }

  var newPath = path.replace(PATH_REGEXP, replace);

  if (lastEndIndex < path.length) {
    addLastToken(path.substring(lastEndIndex))
  }

  return newPath;
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options, allTokens) {
  keys = keys || [];
  allTokens = allTokens || [];

  if (!isArray(keys)) {
    options = keys;
    keys = [];
  } else if (!options) {
    options = {};
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options, allTokens);
  }

  if (isArray(path)) {
    return arrayToRegexp(path, keys, options, allTokens);
  }

  var strict = options.strict;
  var end = options.end !== false;
  var route = replacePath(path, keys, allTokens);
  var endsWithSlash = path.charAt(path.length - 1) === '/';

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys, allTokens);
}

},{"isarray":31}],36:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],37:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],38:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":36,"./encode":37}],39:[function(require,module,exports){
/**
 *
 * This function was taken from a stackoverflow answer:
 *
 * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 *
 * Many thanks to:
 *
 * Briguy37 (http://stackoverflow.com/users/508537/briguy37)
 * broofa (http://stackoverflow.com/users/109538/broofa)
 *
 */

module.exports = function() {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
};

},{}],40:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var activeStateNameKey = 'abstractStateRouterActiveStateName';
var activeStateParametersKey = 'abstractStateRouterActiveStateParameters';

module.exports = function SvelteStateRendererFactory() {
	var svelteOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return function makeRenderer(stateRouter) {

		var asr = {
			makePath: stateRouter.makePath,
			stateIsActive: stateRouter.stateIsActive
		};

		var defaultOptions = recursiveExtend(svelteOptions, {
			data: { asr: asr }
		});

		function render(context, cb) {
			var target = context.element,
			    template = context.template,
			    content = context.content;


			var rendererSuppliedOptions = recursiveExtend(defaultOptions, {
				target: target,
				data: Object.assign(content, defaultOptions.data)
			});

			var svelte = void 0;

			try {
				if (typeof template === 'function') {
					svelte = new template(rendererSuppliedOptions);
				} else {
					var options = recursiveExtend(rendererSuppliedOptions, template.options);

					svelte = new template.component(options);
					Object.assign(svelte, options.methods);
				}
			} catch (e) {
				cb(e);
				return;
			}

			function onRouteChange() {
				svelte.set({
					asr: asr
				});
			}

			stateRouter.on('stateChangeEnd', onRouteChange);

			svelte.on('teardown', function () {
				stateRouter.removeListener('stateChangeEnd', onRouteChange);
			});

			svelte.mountedToTarget = target;
			cb(null, svelte);
		}

		return {
			render: render,
			reset: function reset(context, cb) {
				var svelte = context.domApi;
				var target = svelte.mountedToTarget;
				svelte.teardown();

				var newContext = Object.assign({}, context, {
					element: target
				});

				render(newContext, cb);
			},
			destroy: function destroy(svelte, cb) {
				svelte.teardown();
				cb();
			},
			getChildElement: function getChildElement(svelte, cb) {
				try {
					var element = svelte.mountedToTarget;
					var child = element.querySelector('uiView');
					cb(null, child);
				} catch (e) {
					cb(e);
				}
			}
		};
	};
};

function recursiveExtend() {
	var target = {};

	for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
		objects[_key] = arguments[_key];
	}

	Object.assign.apply(Object, [target].concat(objects));

	objects.filter(function (o) {
		return o;
	}).forEach(function (o) {
		objectProperties(o).forEach(function (key) {
			recursiveExtend(target[key], o[key]);
		});
	});

	return target;
}

function objectProperties(o) {
	return Object.keys(o).filter(function (key) {
		return o[key] && _typeof(o[key]) === 'object';
	});
}

},{}],41:[function(require,module,exports){
module.exports = function denodeify(fn) {
	return function() {
		var self = this
		var args = Array.prototype.slice.call(arguments)
		return new Promise(function(resolve, reject) {
			args.push(function(err, res) {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			})

			var res = fn.apply(self, args)

			var isPromise = res
				&& (typeof res === 'object' || typeof res === 'function')
				&& typeof res.then === 'function'

			if (isPromise) {
				resolve(res)
			}
		})
	}
}

},{}],42:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}]},{},[11]);
