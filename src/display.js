import * as logic from "./logic.js";
import { Project } from "./project.js";

const taskBtn = document.getElementById("addTask");
const taskSection = document.getElementById("taskSection");
const projectBtn = document.getElementById("addProject");
const projectSection = document.getElementById("projectSection");

let currentProject = null;

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
      renderTasks(project);
    });
    projectSection.insertBefore(projectDiv, projectBtn);
  });
}

// Rendering the list of tasks of a particular project in the main section
function renderTasks(project) {
  // First deleting all the previous tasks from the other project (or the same to not have duplicates)
  taskSection.querySelectorAll(".task-item").forEach((el) => el.remove());

  project.tasks.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    taskDiv.textContent = task.title;
    taskSection.insertBefore(taskDiv, taskBtn);
  });
}

// Adding a task to project
function addTask(project) {
  if (!project) return alert("Select a project first!");

  const taskInput = document.createElement("input");
  taskBtn.style.display = "none";
  taskSection.appendChild(taskInput);
  taskInput.focus();
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let taskValue = taskInput.value;
      project.createTask(taskValue);
      taskInput.remove();
      renderTasks(project);
      taskBtn.style.display = "block";
    }
  });
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
