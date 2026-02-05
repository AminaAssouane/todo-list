import { Project } from "./project.js";

export let projects = [];

export function createProject(name) {
  projects.push(new Project(name));
  saveToLocalStorage(); // ✅ save on creation
}

// Save all projects to localStorage
export function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Load projects from localStorage
export function loadFromLocalStorage() {
  const projectsJSON = localStorage.getItem("projects");
  if (!projectsJSON) return;

  const projectsArray = JSON.parse(projectsJSON);

  projects = projectsArray.map((p) => {
    const project = new Project(p.name);
    p.tasks.forEach((t) =>
      project.createTask(
        t.title,
        t.description,
        t.dueDate,
        t.priority,
        t.finished,
      ),
    );
    return project;
  });
}
