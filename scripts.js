let api_key = '612728-881111-6debe3-c26de7-2b9424';

const HandlePost = () => {
	let inputRef = document.getElementById('todo-input');
	console.log(inputRef.value);

	if (inputRef.value !== ' ') {
		console.log('called');
		PostToDo(inputRef.value);
		inputRef.value = '';
	}
};

const PostToDo = (todoText) => {
	// Setting variable for form input (get from HTML form)
	var data = {
		text: todoText,
	};

	// Initalize AJAX Request
	var xhttp2 = new XMLHttpRequest();

	// Response handler
	xhttp2.onreadystatechange = function () {
		// Wait for readyState = 4 & 200 response
		if (this.readyState == 4 && this.status == 200) {
			// parse JSON response
			FetchToDos();
		} else if (this.readyState == 4) {
			// this.status !== 200, error from server
			console.log(this.responseText);
		}
	};

	xhttp2.open('POST', 'https://cse204.work/todos', true);

	xhttp2.setRequestHeader('Content-type', 'application/json');
	xhttp2.setRequestHeader('x-api-key', api_key);
	xhttp2.send(JSON.stringify(data));
};

const FetchToDos = async () => {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var todos = JSON.parse(this.responseText);
			console.log(todos);
			UpdateHTML(todos);
		}
	};

	xhttp.open('GET', 'https://cse204.work/todos', true);
	xhttp.setRequestHeader('x-api-key', api_key);
	xhttp.send();
};

const UpdateHTML = (newList) => {
	let listItem = document.getElementById('todo-list');
	listItem.innerHTML = '';
	newList.map((item) => {
		console.log(item);
		var tempItem = document.createElement('li');
		tempItem.id = item.id;
		tempItem.classList.add('todo-item');
		tempItem.addEventListener('click', function handleClick(event) {
			HandleDelete(event);
		});
		var textNode = document.createTextNode(item.text);
		tempItem.appendChild(textNode);
		listItem.appendChild(tempItem);
	});
};

const HandleDelete = (event) => {
	console.log('CLICKED DELTE', event.target.id);
	const url = `https://cse204.work/todos/${event.target.id}`;
	console.log('URL', url);

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			FetchToDos();
		}
	};

	xhttp.open('DELETE', url, true);
	xhttp.setRequestHeader('x-api-key', api_key);
	xhttp.send();
};
