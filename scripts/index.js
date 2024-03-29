const state = {
    taskList: [],
};

//DOM Manipulation
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskModal);

// getElementById(), getElemByClassName(), getElemByTagName()
// >> These are used when we want to process the user data using input element from HTML in Js.
// >> By using innerHTML or innerText with these methods we can change or add any HTML text or normal text inside an element which is already present in the HTML code.

// querySelector()
// >> This is used when we want to insert any kind of HTML text/tag from the js which would be reflected on the UI.

// `` This type of symbol is known as backtick which is used to write HTML code inside Js
// ${} This symbol is used for writing Js Code inside HTML which is written within Js.

// Card display after saving detail on modal of add new item.
const htmlTaskContent = ({ id, url, title, type, description }) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info me-2' name=${id} onclick='editTask.apply(this, arguments)'>
                    <i class='fa fa-pencil-alt' name=${id}></i>
                </button>
                <button type='button' class='btn btn-outline-danger me-2' name=${id} onclick='deleteTask.apply(this, arguments)'>
                    <i class='fa fa-trash-alt' name=${id}></i>
                </button>
            </div>

            <div class='card-body'>
                ${url
        ? `<img width='100%' height='213px' style='object-fit: cover; object-position: center' src=${url} alt='card image here' class='card-img-top mb-3 rounded-lg' />`
        : `<img width='100%' height='213px' style='object-fit: cover; object-position: center' src='https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0' alt='card image here' class='card-img-top mb-3 rounded-lg' />`
    }

                <h4 class='task__card__title py-1'>${title}</h4>
                <p class='description text-muted'>${description}</p>
                <div class='tags text-white d-flex flex-wrap'>
                    <span class='badge bg-primary m-1'>${type}</span>
                </div>
            </div>

            <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#showTask' id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
            </div>
        </div>
    </div>
`;

// Dynamic modal onclick of Open Task Button
const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id= ${id}>
    ${url
            ? `<img width='100%' height='150px' style='object-fit: cover; object-position: center' src=${url} alt='card image here' class='img-fluid place__holder__image mb-3'
            />`
            : `<img width='100%' height='150px' style='object-fit: cover; object-position: center' src='http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png' alt='card image here' class='img-fluid place__holder_image mb-3'/>`
        }
    <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p class='lead'>${description}</p>
    </div>`;
};

// here we will be updating our local storage (i.e. the modals/cards which we see on our ui)

const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};

// to get data or card or modals on ur ui from local storage (Browsers storage)
const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if (localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
};

const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDesc").value
    };
    if (input.title === "" || input.type === "" || input.description === "") {
        return alert("Please fill all the fields");
    }
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({
        ...input,
        id,
    })
    );

    // updated task List - for 1st go
    state.taskList.push({ ...input, id });

    // update the same on localStorage too
    updateLocalStorage();

    // conn.collection('taskList').insertMany({...input, id});

};

// opens new modal on our ui when user clicks on open task
const openTask = (e) => {
    // pop up the current one
    if (!e) e = window.event;

    // finds the object & returns it which matches with the same id.
    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
    console.log(getTask); // returns object containing url, id, title, type, description which is stored in taskList array inside state object.
};

// delete operation
const deleteTask = (e) => {
    if (!e) e = window.event;

    const targetID = e.target.getAttribute("name");
    // console.log(targetID);

    const type = e.target.tagName;
    // console.log(type);

    const removeTask = state.taskList.filter(({ id }) => id !== targetID);
    // console.log(removeTask);

    state.taskList = removeTask;
    updateLocalStorage();

    if (type === "BUTTON") {
        // console.log(e.target.parentNode.parentNode);
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }

    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    );
};

// edit operation
const editTask = (e) => {
    if (!e) e = window.event;

    const targetID = e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskList;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if (type === "BUTTON") {
        parentNode = e.target.parentNode.parentNode;
    }
    else {
        parentNode = e.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentNode.childNodes[3].childNodes[3];
    // console.log(taskTitle);
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");

    submitButton.innerHTML = "Save Changes";
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");

    submitButton.setAttribute('onclick', "saveEdit.apply(this, arguments)");
};

const saveEdit = (e) => {
    if (!e) e = window.event;

    const targetID = e.target.id;
    const parentNode = e.target.parentNode.parentNode; //To access the entire card & save the changes further.

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    // console.log(taskType);
    const submitButton = parentNode.childNodes[5].childNodes[1];

    const updatedData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML
    };

    let stateCopy = state.taskList; //Copy of the taskList having all the cards
    stateCopy = stateCopy.map((task) => task.id === targetID ? {
        id: task.id,
        title: updatedData.taskTitle,
        description: updatedData.taskDescription,
        type: updatedData.taskType,
        url: task.url
    }
        : task
    );

    state.taskList = stateCopy;
    updateLocalStorage();

    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");

    submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
};

const searchTask = (e) => {
    if (!e) e = window.event;

    while (taskContents.firstChild) {
        taskContents.removeChild(taskContents.firstChild);
    }

    const resultData = state.taskList.filter(({ title }) => title.toLowerCase().includes(e.target.value.toLowerCase()));

    resultData.map((cardData) => taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData)));
};

// tasks completed with the checkbox needs to be implemented