document.addEventListener('DOMContentLoaded', () => {
    // Get the heading element and all sidebar links
    const mainHeading = document.getElementById('main-heading');
    const sidebarLinks = document.querySelectorAll('.list-group-item');
  
    // Add event listeners to update the heading dynamically
    sidebarLinks.forEach((link) => {
      link.addEventListener('click', () => {
        // Update the main heading with the clicked project's name
        mainHeading.textContent = link.textContent.trim();
  
        // Update the active class on the sidebar
        document.querySelectorAll('.list-group-item.active').forEach((item) => {
          item.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  });
  
  // Function to open modal and set default values
  function openModal(title, status) {
    document.getElementById('taskModalLabel').innerText = title;
    document.getElementById('status').value = status;
    document.getElementById('taskForm').reset();
  }
  
  function saveTask() {
    const taskNameInput = document.getElementById('taskName');
    const startDateInput = document.getElementById('startDate');
    const deadlineInput = document.getElementById('deadline');
    const statusInput = document.getElementById('status');
  
    const taskName = taskNameInput.value.trim();
    const startDate = startDateInput.value.trim();
    const deadline = deadlineInput.value.trim();
    const status = statusInput.value.trim();
  
    let isValid = true;
  
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach((error) => error.remove());
  
    // Validate Task Name
    if (!taskName) {
      showError(taskNameInput, "Please fill the task name");
      isValid = false;
    }
  
    // Validate Start Date
    if (!startDate) {
      showError(startDateInput, "Please fill the start date");
      isValid = false;
    }
  
    // Validate Deadline
    if (!deadline) {
      showError(deadlineInput, "Please fill the deadline date");
      isValid = false;
    } else if (new Date(startDate) > new Date(deadline)) {
      showError(deadlineInput, "Deadline cannot be earlier than the Start Date");
      isValid = false;
    }
  
    // Validate Status
    if (!status) {
      showError(statusInput, "Please select a status");
      isValid = false;
    }
  
    if (isValid) {
      const taskCard = document.createElement('div');
      taskCard.className = 'task-card';
      taskCard.innerHTML = `
        <h6>${taskName}</h6>
        <div class="task-dates">
          <p>Start date: <span>${startDate}</span></p>
          <p>Deadline: <span>${deadline}</span></p>
        </div>
      `;
  
      // Determine where to append the task
      const statusMap = {
        "To Do": "todo-tasks",
        "In Progress": "in-progress-tasks",
        "In Review": "in-review-tasks",
        "Completed": "completed-tasks",
      };
  
      const columnId = statusMap[status];
      const statusColumn = document.getElementById(columnId);
  
      if (statusColumn) {
        statusColumn.appendChild(taskCard);
  
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
  
        // Reset the form
        document.getElementById('taskForm').reset();
      } else {
        alert(`Unable to find the status column for "${status}".`);
      }
    }
  }
  
  // Function to show error messages below fields
  function showError(inputElement, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message text-danger mt-1';
    errorMessage.innerText = message;
    inputElement.parentElement.appendChild(errorMessage);
  }
  