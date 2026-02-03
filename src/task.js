export class Task {
  constructor(title, dueDate, priority, description = "", finished = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.finished = finished;
    this.id = crypto.randomUUID();
  }
}
