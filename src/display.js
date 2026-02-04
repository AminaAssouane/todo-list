import * as logic from "./logic.js";
import { Project } from "./project.js";
import { format } from "date-fns";

const taskBtn = document.getElementById("addTask");
const taskSection = document.getElementById("taskSection");
const projectBtn = document.getElementById("addProject");
const projectSection = document.getElementById("projectSection");
const allTasks = document.getElementById("all-tasks");
const today = document.getElementById("today");
const thisWeeK = document.getElementById("this-week");

logic.createProject("Default");
let currentProject = logic.projects[0];

// Creating a project that holds all the tasks
let projectAllTasks = new Project("All Tasks");

// Rendering the list of projects in the sidebar
function renderProjectsSidebar() {
  // First deleting all the projects to not have duplicates
  projectSection.querySelectorAll(".project-item").forEach((el) => el.remove());

  // Then we render all the project names
  logic.projects.forEach((project) => {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project-item"); // for styling later
    projectDiv.classList.add("clickable");
    projectDiv.textContent = project.name;
    projectDiv.addEventListener("click", () => {
      currentProject = project;
      projectDiv.style.fontWeight = "bolder";
      renderTasks(project);
    });
    projectSection.insertBefore(projectDiv, projectBtn);
  });
}

// Rendering the list of tasks of a particular project in the main section
function renderTasks(project) {
  // First deleting all the previous tasks from the other project (or the same to not have duplicates) and the project name
  taskSection.querySelectorAll(".task-item").forEach((el) => el.remove());
  taskSection.querySelector(".project-title")?.remove();

  const projectName = document.createElement("h2");
  projectName.classList.add("project-title");
  projectName.textContent = project.name;
  taskSection.insertBefore(projectName, taskBtn);

  const binIcon = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.8489 22.6922C11.5862 22.7201 11.3509 22.5283 11.3232 22.2638L10.4668 14.0733C10.4392 13.8089 10.6297 13.5719 10.8924 13.5441L11.368 13.4937C11.6307 13.4659 11.8661 13.6577 11.8937 13.9221L12.7501 22.1126C12.7778 22.3771 12.5873 22.614 12.3246 22.6418L11.8489 22.6922Z" fill="#000000"></path><path d="M16.1533 22.6418C15.8906 22.614 15.7001 22.3771 15.7277 22.1126L16.5841 13.9221C16.6118 13.6577 16.8471 13.4659 17.1098 13.4937L17.5854 13.5441C17.8481 13.5719 18.0387 13.8089 18.011 14.0733L17.1546 22.2638C17.127 22.5283 16.8916 22.7201 16.6289 22.6922L16.1533 22.6418Z" fill="#000000"></path><path clip-rule="evenodd" d="M11.9233 1C11.3494 1 10.8306 1.34435 10.6045 1.87545L9.54244 4.37037H4.91304C3.8565 4.37037 3 5.23264 3 6.2963V8.7037C3 9.68523 3.72934 10.4953 4.67218 10.6145L7.62934 26.2259C7.71876 26.676 8.11133 27 8.56729 27H20.3507C20.8242 27 21.2264 26.6513 21.2966 26.1799L23.4467 10.5956C24.3313 10.4262 25 9.64356 25 8.7037V6.2963C25 5.23264 24.1435 4.37037 23.087 4.37037H18.4561L17.394 1.87545C17.1679 1.34435 16.6492 1 16.0752 1H11.9233ZM16.3747 4.37037L16.0083 3.50956C15.8576 3.15549 15.5117 2.92593 15.1291 2.92593H12.8694C12.4868 2.92593 12.141 3.15549 11.9902 3.50956L11.6238 4.37037H16.3747ZM21.4694 11.0516C21.5028 10.8108 21.3154 10.5961 21.0723 10.5967L7.1143 10.6285C6.86411 10.6291 6.67585 10.8566 6.72212 11.1025L9.19806 24.259C9.28701 24.7317 9.69985 25.0741 10.1808 25.0741H18.6559C19.1552 25.0741 19.578 24.7058 19.6465 24.2113L21.4694 11.0516ZM22.1304 8.7037C22.6587 8.7037 23.087 8.27257 23.087 7.74074V7.25926C23.087 6.72743 22.6587 6.2963 22.1304 6.2963H5.86957C5.34129 6.2963 4.91304 6.72743 4.91304 7.25926V7.74074C4.91304 8.27257 5.34129 8.7037 5.86956 8.7037H22.1304Z" fill="#000000" fill-rule="evenodd"></path></g></svg>`;
  const editIcon = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>`;
  const flagIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="currentColor"></path> <path d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z" fill="currentColor"></path> </g></svg>`;

  project.tasks.forEach((task) => {
    // OUR TASK COMPONENT
    let taskDiv = document.createElement("div");
    let leftTask = document.createElement("span");
    let rightTask = document.createElement("span");
    taskDiv.classList.add("task-item");
    leftTask.classList.add("leftTask");
    rightTask.classList.add("rightTask");

    // CHECKBOX
    let taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    // If the task is finished (checked), we render it as finished
    if (task.finished) {
      taskDiv.classList.add("finished");
      taskCheckbox.checked = true;
    }
    // Then we add an event listener on the checkbox to toggle the finish property
    taskCheckbox.addEventListener("change", () => {
      project.toggleFinish(task.id);
      if (taskCheckbox.checked) {
        taskDiv.classList.add("finished");
      } else {
        taskDiv.classList.remove("finished");
      }
    });

    // TEXT
    let taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.title;

    // FLAG ICON
    let flagBtn = document.createElement("span");
    flagBtn.innerHTML = flagIcon;
    flagBtn.classList.add("flag-icon");
    // Priority logic

    // If the task already has a priority, update the flag color
    if (task.priority) {
      updateFlagColor(flagBtn, task.priority);
    }

    flagBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevents instant close

      // Remove existing menu if open
      document.querySelector(".priority-menu")?.remove();

      const menu = createPriorityMenu(task, flagBtn);
      flagBtn.appendChild(menu);
    });

    // EDIT ICON
    let editBtn = document.createElement("span");
    editBtn.innerHTML = editIcon;
    editBtn.classList.add("edit-icon");
    // Edit logic
    editBtn.addEventListener("click", () => editTask(project, task));

    // BIN ICON
    let binBtn = document.createElement("span");
    binBtn.innerHTML = binIcon;
    binBtn.classList.add("bin-icon");
    // Bin logic
    binBtn.addEventListener("click", () => {
      project.removeTask(task.id);
      taskDiv.remove();
    });

    // DETAILS
    let details = document.createElement("button");
    details.textContent = "Details";
    details.classList.add("details");
    let taskDetails = document.createElement("div");
    taskDetails.textContent = task.description;
    taskDetails.classList.add("task-details");
    // details logic
    details.addEventListener("click", () => {
      if (taskDetails.isConnected) {
        taskDetails.remove();
      } else {
        taskDiv.append(taskDetails);
      }
    });

    // DATE
    let taskDateSpan = document.createElement("span");
    if (task.dueDate) {
      const taskDateObj = new Date(task.dueDate); // convert string to Date
      taskDateSpan.textContent = format(taskDateObj, "MMM do");
      // "Jun 9th", "Feb 23rd"
      taskDateSpan.classList.add("task-date"); // optional class for styling
    }

    // Add everything to the div task component, than insert the div task component before the add task button
    leftTask.append(taskCheckbox, taskText);
    rightTask.append(details, taskDateSpan, flagBtn, editBtn, binBtn);
    const taskMain = document.createElement("div");
    taskMain.classList.add("task-main");
    taskMain.append(leftTask, rightTask);
    taskDiv.append(taskMain);

    taskSection.insertBefore(taskDiv, taskBtn);
  });
}

// Priority menu logic
function createPriorityMenu(task, flagBtn) {
  const menu = document.createElement("div");
  menu.classList.add("priority-menu");

  ["Low", "Medium", "High"].forEach((level) => {
    const option = document.createElement("div");
    option.textContent = level;
    option.classList.add("priority-option", level);

    option.addEventListener("click", (e) => {
      e.stopPropagation();
      task.priority = level;
      updateFlagColor(flagBtn, level);
      menu.remove();
    });

    menu.appendChild(option);
  });

  return menu;
}

// Updating the color of the flag depending on its priority
function updateFlagColor(flagBtn, priority) {
  flagBtn.classList.remove("Low", "Medium", "High");
  flagBtn.classList.add(priority);
}

// A function for creating the inputs needed when adding or editing a task
function createTaskInputs(task = {}) {
  const taskInputsContainer = document.createElement("section");
  taskInputsContainer.classList.add("inputsContainer");

  const taskTitle = document.createElement("div");
  taskTitle.textContent = "Title : ";
  const taskTitleInput = document.createElement("input");
  taskTitleInput.value = task.title || "";

  const taskDescription = document.createElement("div");
  taskDescription.textContent = "Description : ";
  const taskDescriptionInput = document.createElement("textarea");
  taskDescriptionInput.value = task.description || "";
  taskDescriptionInput.classList.add("descriptionInput");

  const taskDate = document.createElement("div");
  taskDate.textContent = "Due date : ";
  const taskDateInput = document.createElement("input");
  taskDateInput.type = "date";
  taskDateInput.value = task.dueDate || "";

  const taskPriority = document.createElement("label");
  taskPriority.textContent = "Priority : ";
  const taskPriorityInput = document.createElement("select");
  const priorities = ["Low", "Medium", "High"];
  priorities.forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    taskPriorityInput.appendChild(option);
  });

  const btnsDiv = document.createElement("div");
  btnsDiv.classList.add("btnsDiv");

  const addBtn = document.createElement("button");
  addBtn.classList.add("addBtn");
  addBtn.textContent = "Add";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancelBtn");
  cancelBtn.textContent = "Cancel";

  btnsDiv.append(addBtn, cancelBtn);

  taskInputsContainer.append(
    taskTitle,
    taskTitleInput,
    taskDescription,
    taskDescriptionInput,
    taskDate,
    taskDateInput,
    taskPriority,
    taskPriorityInput,
    btnsDiv,
  );

  return {
    taskInputsContainer,
    taskTitleInput,
    taskDescriptionInput,
    taskDateInput,
    taskPriorityInput,
    addBtn,
    cancelBtn,
  };
}

// Adding a task to project
function addTask(project) {
  if (!project) return alert("Select a project first!");
  const {
    taskInputsContainer,
    taskTitleInput,
    taskDescriptionInput,
    taskDateInput,
    taskPriorityInput,
    addBtn,
    cancelBtn,
  } = createTaskInputs();

  taskBtn.style.display = "none";
  taskSection.append(taskInputsContainer);

  taskTitleInput.focus();
  taskTitleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      project.createTask(
        taskTitleInput.value,
        taskDescriptionInput.value,
        taskDateInput.value,
        taskPriorityInput.value,
      );
      projectAllTasks.createTask(
        taskTitleInput.value,
        taskDescriptionInput.value,
        taskDateInput.value,
        taskPriorityInput.value,
      );
      clearTaskInputs();
      renderTasks(project);
    }
  });

  // When clicking on the add button, we create a new task
  addBtn.addEventListener("click", () => {
    project.createTask(
      taskTitleInput.value,
      taskDescriptionInput.value,
      taskDateInput.value,
      taskPriorityInput.value,
    );
    projectAllTasks.createTask(
      taskTitleInput.value,
      taskDescriptionInput.value,
      taskDateInput.value,
      taskPriorityInput.value,
    );
    clearTaskInputs();
    renderTasks(project);
  });

  // When clicking the cancel button, we just clear the inputs and show our add task button again
  cancelBtn.addEventListener("click", () => {
    clearTaskInputs();
  });

  function clearTaskInputs() {
    taskInputsContainer.remove();
    taskBtn.style.display = "block";
  }
}

function editTask(project, task) {
  const {
    taskInputsContainer,
    taskTitleInput,
    taskDescriptionInput,
    taskDateInput,
    taskPriorityInput,
    addBtn,
    cancelBtn,
  } = createTaskInputs(task);

  taskBtn.style.display = "none";
  taskSection.append(taskInputsContainer);

  taskTitleInput.focus();

  // When clicking on the add button, we update the task
  addBtn.addEventListener("click", () => {
    project.updateTask(
      task.id,
      taskTitleInput.value,
      taskDescriptionInput.value,
      taskDateInput.value,
      taskPriorityInput.value,
    );
    clearTaskInputs();
    renderTasks(project);
  });

  // When clicking the cancel button, we just clear the inputs and show our add task button again
  cancelBtn.addEventListener("click", () => {
    clearTaskInputs();
  });

  function clearTaskInputs() {
    taskInputsContainer.remove();
    taskBtn.style.display = "block";
  }
}

function addProject() {
  const projectInput = document.createElement("input");
  projectSection.insertBefore(projectInput, projectBtn);
  projectInput.focus();
  projectInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let inputValue = projectInput.value;
      logic.createProject(inputValue);
      projectInput.remove();
      renderProjectsSidebar(); // We render all the project names everytime we add a new project
    }
  });
}

projectBtn.addEventListener("click", addProject);
taskBtn.addEventListener("click", () => addTask(currentProject));
allTasks.addEventListener("click", () => renderTasks(projectAllTasks));

// Closing the priority menu when clicking anywhere else
document.addEventListener("click", () => {
  document.querySelector(".priority-menu")?.remove();
});
