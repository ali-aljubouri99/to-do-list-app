// Element Of HTML
let input = document.querySelector("form input");
let btnAdd = document.querySelector("form .btn");
let result = document.querySelector(".result");
let remove_all = document.querySelector(".remove_all");
// Array Of Data Tasks
let arrayOfData = [];
// Function That Get Data From Local
getDataFromLocal();
// Check If Local Storage Has Element And Return array With Change Str Obj To js Obj
if (window.localStorage.getItem("task")) {
    arrayOfData = JSON.parse(window.localStorage.getItem("task"));
}

// Event Click On BtnAdd (+)
btnAdd.addEventListener("click", function(e) {
    e.preventDefault();
    // Check If Input Has Element
    if (input.value !== "") {
        // Function That Add Data (Tasks) Object To Array
        addDataToArray(input.value);
        // Function That Add Tasks In Page
        addTaskToPage(arrayOfData);
        // Function That Add Data To Local Storage
        addDataToLocal(arrayOfData);
        // function That Get Data From Local Storage
        getDataFromLocal(arrayOfData);
        input.value = "";

        // Check If Array Of Tasks Is Than 1 To Change Style
        arrayOfData.length > 1 
        ? remove_all.style.display = "block" 
        : remove_all.style.display = "none";
    }
})

// Function That Add Data (Tasks) Object To Array
function addDataToArray(inputValue) {
    // Create Data (Tasks) Object
    const tasks = {
        // Random Number With Time Of Now
        id: Date.now(),
        // Title With Value Of Input
        title: inputValue,
        // Task Is Not Completed
        completed: false,
    }
    // Push Data (Tasks) To Array
    arrayOfData.push(tasks);
}

// Function That Add Tasks In Page
function addTaskToPage(arrayOfData) {
    // Remove Any Think In Result Div
    result.innerHTML = "";
    // Loop On Data (Tasks) And Create Elements In Page
    arrayOfData.forEach((task) => {
        let div = document.createElement("div");
        div.classList.add("task");
        div.setAttribute("data-id", task.id);
        // Check If Element (task) Is Completed To Add Class It
        if (task.completed === true) {
            div.classList.add("task", "done");
        }
        let p = document.createElement("p");
        p.classList.add("p")
        p.innerHTML = task.title;
        div.append(p);

        let span = document.createElement("span");
        let exitIcon = document.createElement("i");
        exitIcon.classList.add("fa-solid", "fa-xmark", "del");
        span.append(exitIcon);
        div.append(span);

        result.append(div);
    })
}

// Function That Add Data To Local Storage
function addDataToLocal(arrayTasks) {
    // Change Array Object To String And Add To Local Storage
    window.localStorage.setItem("task", JSON.stringify(arrayTasks));
}

// function That Get Data From Local Storage
function getDataFromLocal() {
    // Get Data From Local 
    let data = window.localStorage.getItem("task");
    // Check If Local Has Item
    if (data) {
        // Change Array String From Local To Object Array An Put To Function Page
        let task = JSON.parse(data);
        addTaskToPage(task)
    }
}

// To Remove Task From Page And Local And Change Competed Task
// Event on Result Div Child
result.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement.getAttribute("data-id")) {
        e.target.parentElement.parentElement.remove();
        removeFromLocal(e.target.parentElement.parentElement.getAttribute("data-id"))
    }
    if (e.target.getAttribute("data-id")) {
        e.target.classList.toggle("done")
        completedTask(e.target.getAttribute("data-id"));
    }

    arrayOfData.length > 1 
    ? remove_all.style.display = "block" 
    : remove_all.style.display = "none";
})

// Function To Remove task From Local Storage
function removeFromLocal(taskId) {
    // Change Data (String Object To Js object)
    let data = JSON.parse(window.localStorage.getItem("task"));
    // Return New Array Without Id Of Element Click
    arrayOfData = data.filter((task) => {
        return task.id != taskId;
    });
    // Add This Array Filterd To Local
    addDataToLocal(arrayOfData)
}

// Function To Change Task Completed 
function completedTask(taskId) {
    // Change Data (String Object To Js object)
    let data = JSON.parse(window.localStorage.getItem("task"));
    // Loop On Data (Tasks) Array
    for (let i = 0; i < data.length; i++) {
        // Check If Id == Id Of Element Click
        if (data[i].id == taskId) {
            // Change Coplete To True Or False
            data[i].completed === false ? data[i].completed = true : data[i].completed = false
        }
    }
    // assign Array Of Change Complete To Array Of Data 
    arrayOfData = data;
    // Add This Array Of Data To Local Befour Change
    addDataToLocal(arrayOfData);
}

// Event Click For Btn Remove All Tasks From Local And Result Div (Page)
remove_all.addEventListener("click", (e) => {
    e.preventDefault();
    result.innerHTML = "";
    arrayOfData = [];
    window.localStorage.clear();
    
    arrayOfData.length > 1 
    ? remove_all.style.display = "block" 
    : remove_all.style.display = "none";
});

// Check If Array Of Tasks Is Than 1 To Change Style
arrayOfData.length > 1 
? remove_all.style.display = "block" 
: remove_all.style.display = "none";


// Another Code For This APP
// _+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_
// Another Code For This APP

// let input = document.querySelector("form input"),
//     btnAdd = document.querySelector("Form .btn"),
//     result = document.querySelector(".result"),
//     deleteAll = document.querySelector(".remove_all");

// btnAdd.addEventListener("click", function(e) {
//     e.preventDefault();
//     if (input.value !== "") {
//         addDataToPage(input.value);
//         addDataToLocal();
//         if (result.children.length > 1) {
//             deleteAll.style.display = "block";
//         } else {
//             deleteAll.style.display = "none";
//         }
//         input.value = "";
//     }
// })

// function addDataToPage(inputValue) {
//     let div = document.createElement("div");
//     div.classList.add("task");

//     let p = document.createElement("p");
//     p.innerHTML = inputValue;
//     div.append(p);

//     let span = document.createElement("span");
//     let exitIcon = document.createElement("i");
//     exitIcon.classList.add("fa-solid", "fa-xmark", "del");
//     span.append(exitIcon);

//     div.append(span);
//     result.append(div);
// }

// result.addEventListener("click", function(e) {
//     if (e.target.classList.contains("del")) {
//         e.target.parentElement.parentElement.remove();
//         addDataToLocal();
//         if (result.children.length > 1) {
//             deleteAll.style.display = "block";
//         } else {
//             deleteAll.style.display = "none";
//         }
//     }
//     if (e.target.classList.contains("task")) {
//         e.target.classList.toggle("done");
//         addDataToLocal();
//     }
    
// })

// function addDataToLocal() {
//     window.localStorage.setItem("tasks", result.innerHTML);
// }

// function getDataFromLocal() {
//     result.innerHTML = window.localStorage.getItem("tasks");
// } 
// getDataFromLocal()

// if (result.children.length > 1) {
//     deleteAll.style.display = "block";
// } else {
//     deleteAll.style.display = "none";
// }