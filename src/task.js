class task {
  constructor(
    title,
    dueDate,
    priority,
    description = "",
    finished = "false",
    projectID = "default"
  ) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.finished = finished;
    this.projectID = projectID;
  }
}

function createTask() {}
