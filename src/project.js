import { Todo } from "./todo.js";

export class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  // Creates and pushes a todo into a project
  createTodo(title, dueDate, priority, description) {
    this.todos.push(new Todo(title, dueDate, priority, description));
  }

  // returns the index of a todo in the todos array
  getTodoIndex(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  // Removes a todo from project
  removeTodo(id) {
    this.todos.splice(this.getTodoIndex(id), 1);
  }
}
