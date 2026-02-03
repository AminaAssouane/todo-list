import * as logic from "./logic.js";

const taskBtn = document.getElementById("addTask");
const taskSection = document.getElementById("taskSection");
const projectBtn = document.getElementById("addProject");
const projectSection = document.getElementById("projectSection");

function renderProjects() {
  // First deleting all the projects to not have duplicates
  projectSection.querySelectorAll(".project-item").forEach((el) => el.remove());

  // Then we render all the project names
  logic.projects.forEach((project) => {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project-item"); // for styling later
    projectDiv.classList.add("clickable");
    projectDiv.textContent = project.name;
    projectDiv.addEventListener("click", () => renderTasks(project));
    projectSection.insertBefore(projectDiv, projectBtn);
  });
}

function renderTasks(project) {
  project.tasks.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    taskDiv.textContent = task.title;
    taskSection.appendChild(taskDiv);
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
      renderProjects(); // We render all the project names everytime we add a new project
    }
  });
}

projectBtn.addEventListener("click", addProject);
