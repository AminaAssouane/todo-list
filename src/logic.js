import { Project } from "./project.js";

export let projects = [];

export function createProject(name) {
  projects.push(new Project(name));
}
