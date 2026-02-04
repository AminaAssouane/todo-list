export class Task {
  constructor(title, description = "", dueDate, priority, finished = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.finished = finished;
    this.id = crypto.randomUUID();
  }
}
