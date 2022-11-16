let api_key = '612728-881111-6debe3-c26de7-2b9424';

const TestFunction = () => {
	console.log('Test');
};

const PostToDo = () => {
	// Setting variable for form input (get from HTML form)
	var data = {
		text: 'Some Text',
	};

	// Initalize AJAX Request
	var xhttp2 = new XMLHttpRequest();

	// Response handler
	xhttp2.onreadystatechange = function () {
		// Wait for readyState = 4 & 200 response
		if (this.readyState == 4 && this.status == 200) {
			// parse JSON response
			var todo = JSON.parse(this.responseText);

			console.log(todo);
		} else if (this.readyState == 4) {
			// this.status !== 200, error from server
			console.log(this.responseText);
		}
	};

	xhttp2.open('POST', 'https://cse204.work/todos', true);

	xhttp2.setRequestHeader('Content-type', 'application/json');
	xhttp2.setRequestHeader('x-api-key', 'abc123');
	xhttp2.send(JSON.stringify(data));
};
