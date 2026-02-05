import { Task } from "./task.js";
import * as logic from "./logic.js";

export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // Creates and pushes a task into a project
  createTask(title, description = "", dueDate = "", priority = "") {
    this.tasks.push(new Task(title, description, dueDate, priority));
    logic.saveToLocalStorage();
  }

  // returns the index of a task in the tasks array
  getTaskIndex(id) {
    return this.tasks.findIndex((task) => task.id === id);
  }

  // Removes a task from project
  removeTask(id) {
    this.tasks.splice(this.getTaskIndex(id), 1);
    logic.saveToLocalStorage();
  }

  // Marking a task as finished or not finished
  toggleFinish(id) {
    this.tasks[this.getTaskIndex(id)].finished =
      !this.tasks[this.getTaskIndex(id)].finished;
    logic.saveToLocalStorage();
  }

  // Literally updating a task when we click on the modify button
  updateTask(id, title, description, dueDate, priority) {
    this.tasks[this.getTaskIndex(id)].title = title;
    this.tasks[this.getTaskIndex(id)].description = description;
    this.tasks[this.getTaskIndex(id)].dueDate = dueDate;
    this.tasks[this.getTaskIndex(id)].priority = priority;
    logic.saveToLocalStorage();
  }
}
