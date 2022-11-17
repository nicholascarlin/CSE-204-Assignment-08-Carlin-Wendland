let api_key = "612728-881111-6debe3-c26de7-2b9424";

const HandleInputKeyDown = (event) => {
  if (event.key === "Enter") {
    HandlePost();
  }
};

const HandlePost = () => {
  let inputRef = document.getElementById("todo-input");

  if (inputRef.value !== " ") {
    PostToDo(inputRef.value);
    inputRef.value = "";
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

  xhttp2.open("POST", "https://cse204.work/todos", true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", api_key);
  xhttp2.send(JSON.stringify(data));
};

const FetchToDos = async () => {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var todos = JSON.parse(this.responseText);
      UpdateHTML(todos);
    }
  };

  xhttp.open("GET", "https://cse204.work/todos", true);
  xhttp.setRequestHeader("x-api-key", api_key);
  xhttp.send();
};

const UpdateHTML = (newList) => {
  let listItem = document.getElementById("todo-list");
  listItem.innerHTML = "";
  newList.map((item) => {
    var tempItem = document.createElement("p");
    tempItem.contentEditable = "true";
    tempItem.id = item.id;
    tempItem.classList.add("todo-item");
    tempItem.addEventListener("focus", (event) => {
      event.target.style.background = "rgba(100,100,100,0.2)";
    });
    tempItem.addEventListener("blur", function handleBlur(event) {
      HandleChange(event);
      event.target.style.background = "";
    });

    var deleteItem = document.createElement("button");
    deleteItem.innerHTML = "Delete";
    deleteItem.id = item.id;
    deleteItem.classList.add("todo-item-delete");
    deleteItem.addEventListener("click", function handleClick(event) {
      HandleDelete(event);
    });

    var completeItem = document.createElement("button");
    completeItem.innerHTML = item.completed ? "Uncomplete" : "Complete";
    completeItem.id = item.id;
    completeItem.classList.add("todo-item-complete");
    if (item.completed) {
      completeItem.classList.add("complete");
      tempItem.classList.add("completed-item");
    }
    completeItem.addEventListener("click", function handleClick(event) {
      HandleComplete(event);
    });

    var textNode = document.createTextNode(item.text);
    tempItem.appendChild(textNode);
    listItem.appendChild(tempItem);
    listItem.appendChild(deleteItem);
    listItem.appendChild(completeItem);
  });
};

const HandleDelete = (event) => {
  const url = `https://cse204.work/todos/${event.target.id}`;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      FetchToDos();
    }
  };

  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("x-api-key", api_key);
  xhttp.send();
};

const HandleChange = (event) => {
  const url = `https://cse204.work/todos/${event.target.id}`;

  var data = {
    text: event.target.innerHTML,
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

  xhttp2.open("PUT", url, true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", api_key);
  xhttp2.send(JSON.stringify(data));
};

HandleComplete = (event) => {
  const url = `https://cse204.work/todos/${event.target.id}`;

  let completeStatus = !event.target.classList.contains("complete");

  var data = {
    completed: completeStatus,
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

  xhttp2.open("PUT", url, true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", api_key);
  xhttp2.send(JSON.stringify(data));
};
