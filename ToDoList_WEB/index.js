// Connect to firebase
var firebaseConfig = {
    apiKey: "AIzaSyAsn_dWrZNB1bRVul_XkgRWFgjEIusPKl8",
    authDomain: "form-8954e.firebaseapp.com",
    databaseURL: "https://form-8954e.firebaseio.com",
    projectId: "form-8954e",
    storageBucket: "form-8954e.appspot.com",
    messagingSenderId: "347245119398",
    appId: "1:347245119398:web:21766531a808a3d8ad7167",
    measurementId: "G-C2LWPVJQFG"
};
firebase.initializeApp(firebaseConfig);

function add_todo(){
    //console.log("add_todo");
    input_box = document.getElementById("input_box");
    input_date = document.getElementById("input_date");

    if (input_box.value.length != 0 && input_date.value.length != 0){ // not empty
        var key = firebase.database().ref().child("unfinished_ToDo").push().key;
        //console.log(key);
        var todo = {
            title: input_box.value,
            date: input_date.value,
            key: key
        };

        var updates = {};
        updates["/unfinished_ToDo/" + key] = todo;
        firebase.database().ref().update(updates); 
        create_unfinished_ToDo();
    }
}

function create_unfinished_ToDo(){
    unfinished_ToDo_container = document.getElementsByClassName("container")[0];
    unfinished_ToDo_container.innerHTML = "";

    todo_array = [];
    firebase.database().ref("unfinished_ToDo").once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            todo_array.push(Object.values(childData));
        });
        for (var i, i = 0; i < todo_array.length; ++i){
            //console.log(todo_array[i]);
            todo_date = todo_array[i][0];
            todo_key = todo_array[i][1];
            todo_title = todo_array[i][2];

            todo_container = document.createElement('div');
            todo_container.setAttribute("class", "data_container");
            todo_container.setAttribute("data-key", todo_key);

            // data
            todo_data = document.createElement('div');
            todo_data.setAttribute('id', 'data');

            title = document.createElement('p');
            title.setAttribute('id', 'title');
            title.setAttribute('contenteditable', false);
            title.innerHTML = todo_title;

            date = document.createElement('p');
            date.setAttribute('id', 'date');
            date.setAttribute('contenteditable', false);
            date.innerHTML = todo_date;

            // tools
            todo_tool = document.createElement('div');
            todo_tool.setAttribute('id', 'tool')

            todo_done_button = document.createElement('button');
            todo_done_button.setAttribute('id', 'done_button');
            todo_done_button.setAttribute('onclick', "todo_done(this.parentElement.parentElement, this.parentElement)");
            fa_done = document.createElement('i');
            fa_done.setAttribute('class', 'fa fa-check');

            todo_edit_button = document.createElement('button');
            todo_edit_button.setAttribute('id', 'edit_button');
            todo_edit_button.setAttribute('onclick', "todo_edit(this.parentElement.parentElement, this)");
            fa_edit = document.createElement('i');
            fa_edit.setAttribute('class', 'fa fa-pencil');

            todo_delete_button = document.createElement('button');
            todo_delete_button.setAttribute('id', 'delete_button');
            todo_delete_button.setAttribute('onclick', "todo_delete(this.parentElement.parentElement, 0)");
            fa_delete = document.createElement('i');
            fa_delete.setAttribute('class', 'fa fa-trash');

            unfinished_ToDo_container.append(todo_container);
            todo_container.append(todo_data);
            todo_data.append(title);
            todo_data.append(date);

            todo_container.append(todo_tool);
            todo_tool.append(todo_done_button);
            todo_done_button.append(fa_done);
            todo_tool.append(todo_edit_button);
            todo_edit_button.append(fa_edit);
            todo_tool.append(todo_delete_button);
            todo_delete_button.append(fa_delete);
        }
    });
}

function create_finished_ToDo(){
    finished_ToDo_container = document.getElementsByClassName("container")[1];
    finished_ToDo_container.innerHTML = "";

    todo_array = [];
    firebase.database().ref("finished_ToDo").once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            //var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            todo_array.push(Object.values(childData));
        });
        for (var i, i = 0; i < todo_array.length; ++i){
            //console.log(todo_array[i]);
            todo_date = todo_array[i][0];
            todo_key = todo_array[i][1];
            todo_title = todo_array[i][2];

            todo_container = document.createElement('div');
            todo_container.setAttribute("class", "data_container");
            todo_container.setAttribute("data-key", todo_key);

            // data
            todo_data = document.createElement('div');
            todo_data.setAttribute('id', 'data');

            title = document.createElement('p');
            title.setAttribute('id', 'title');
            title.setAttribute('contenteditable', false);
            title.innerHTML = todo_title;

            date = document.createElement('p');
            date.setAttribute('id', 'date');
            date.setAttribute('contenteditable', false);
            date.innerHTML = todo_date;

            todo_delete_button = document.createElement('button');
            todo_delete_button.setAttribute('id', 'delete_button');
            todo_delete_button.setAttribute('onclick', "todo_delete(this.parentElement.parentElement, 1)");
            fa_delete = document.createElement('i');
            fa_delete.setAttribute('class', 'fa fa-trash');

            finished_ToDo_container.append(todo_container);
            todo_container.append(todo_data);
            todo_data.append(title);
            todo_data.append(todo_delete_button);
            todo_delete_button.append(fa_delete);
            todo_data.append(date);
        }
    });
}

function todo_done(todo, todo_tool){
    //console.log("todo_done");
    finish_todo_container = document.getElementsByClassName("container")[1];
    todo.removeChild(todo_tool);

    finish_todo_container.append(todo);

    var key = todo.getAttribute("data-key");
    var todo_obj = {
        title: todo.childNodes[0].childNodes[0].innerHTML,
        date: todo.childNodes[0].childNodes[1].innerHTML,
        key: key
    };

    var updates = {};
    updates["/finished_ToDo/" + key] = todo_obj;
    firebase.database().ref().update(updates); 

    // delete our ToDo from unfinished
    todo_delete(todo);
    create_finished_ToDo();
}

function todo_edit(todo, edit_button){
    //console.log("todo_edit");
    /*edit_button.style.backgroundColor = "#ffed83" // yellow
    edit_button.style.color = "#fff" // white*/
    edit_button.setAttribute("id", "edit_button_editing");
    edit_button.setAttribute("onclick", "finish_edit(this.parentElement.parentElement, this)");

    title = todo.childNodes[0].childNodes[0];
    title.setAttribute("contenteditable", true);

    date = todo.childNodes[0].childNodes[1];
    date.setAttribute("contenteditable", true);
}

function finish_edit(todo, edit_button){
    /*edit_button.style.backgroundColor = "#fff" // white
    edit_button.style.color = "#000" // black*/
    edit_button.setAttribute("id", "edit_button");
    edit_button.setAttribute("onclick", "todo_edit(this.parentElement.parentElement, this)");

    title = todo.childNodes[0].childNodes[0];
    title.setAttribute("contenteditable", false);

    date = todo.childNodes[0].childNodes[1];
    date.setAttribute("contenteditable", false);

    // change in firebase to
    var key = todo.getAttribute("data-key");
    var todo_obj = {
        title: todo.childNodes[0].childNodes[0].innerHTML,
        date: todo.childNodes[0].childNodes[1].innerHTML,
        key: key
    };

    var updates = {};
    updates["/unfinished_ToDo/" + key] = todo_obj;
    firebase.database().ref().update(updates);
}

function todo_delete(todo, where){
    //console.log("todo_delete");
    key =  todo.getAttribute("data-key");
    if (where == 0){
        todo_to_remove = firebase.database().ref("unfinished_ToDo/" + key);
    }
    else{
        todo_to_remove = firebase.database().ref("finished_ToDo/" + key);
    }
    todo_to_remove.remove();

    // remove from html view or whatever
    todo.remove();
}
