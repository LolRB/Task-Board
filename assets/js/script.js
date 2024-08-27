// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const id = nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId)); // Save nextId after increment
  return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const formattedDate = dayjs(task.deadline).format("DD-MM-YYYY");
  // Calculate the due date difference from today
  const today = dayjs();
  const deadline = dayjs(task.deadline);
  const daysUntilDeadline = deadline.diff(today, "day");

  // Determine the class based on the deadline and status
  let taskClass = "task-default";
  if (task.status !== "done") {
    if (today.isAfter(deadline)) {
      taskClass = "task-overdue";
    } else if (daysUntilDeadline <= 3) {
      taskClass = "task-nearing-deadline";
    }
  }

  const taskCard = `
      <div class="card task-card mb-2 ${taskClass}" data-id="${task.id}">
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <p class="card-text">${task.description}</p>
          <p class="card-text"><small class="text-muted">Due: ${formattedDate}</small></p>
          <button class="btn btn-danger btn-sm delete-task">Delete</button>
        </div>
      </div>
    `;

  // Append the card to the appropriate lane
  $(`#${task.status}-cards`).append(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  console.log("renderTaskList");

  // Clear existing cards
  $("#todo-cards, #in-progress-cards, #done-cards").empty();

  // Render each task
  taskList.forEach((task) => {
    createTaskCard(task);
  });

  // Make cards draggable
  $(".task-card").draggable({
    revert: "invalid",
    helper: "clone",
    start: function (event, ui) {
      $(this).css("opacity", 0.5);
    },
    stop: function (event, ui) {
      $(this).css("opacity", 1);
    },
  });

  // Add event listeners to delete buttons
  $(".delete-task").click(handleDeleteTask);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
