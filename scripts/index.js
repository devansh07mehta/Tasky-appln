const state = {
    taskList: []
};

//DOM Manipulation
const taskModal = document.querySelector(".task__modal__body");
console.log(taskModal);

// getElementById(), getElemByClassName(), getElemByTagName()
// >> These are used when we want to process the user data using input element from HTML in Js.
// >> By using innerHTML or innerText with these methods we can change or add any HTML text or normal text inside an element which is already present in the HTML code.

// querySelector()
// >> This is used when we want to insert any kind of HTML text/tag from the js which would be reflected on the UI.

// `` This type of symbol is known as backtick which is used to write HTML code inside Js
// ${} This symbol is used for writing Js Code inside HTML which is written within Js.
const htmlTaskContent = ({url, title, type, description, id}) => `
    <div class='col-md-6 col-lg-4' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex justify-content-end task__card__headerd'>
                <button type='button' class='btn btn-outline-info me-2' name=${id}>
                    <i class='fa fa-pencil-alt' name=${id}></i>
                </button>
                <button type='button' class='btn btn-outline-danger me-2' name=${id}>
                    <i class='fa fa-trash-alt' name=${id}></i>
                </button>
            </div>

            <div class='card-body'>
                ${
                    url && 
                    `<img width='100%' src=${url} alt='card image here' class='card-img-top mb-3 rounded />`
                }

                <h4 class='task__card__title'>${title}</h4>
                <p class='description text-muted'>${description}</p>
                <div class='tags text-white d-flex flex-wrap'>
                    <span class='badge bg-primary m-1'>${type}</span>
                </div>
            </div>

            <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#showTask'>Open Task</button>
            </div>
        </div>
    </div>
`;