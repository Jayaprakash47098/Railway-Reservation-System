// Railway Reservation System - same logic as railway.c, written in JavaScript
// (browsers cannot run C directly, so the website uses JS for the demo)

var TOTAL_SEATS = 5;
var MAX_WAIT = 5;

var seats = [];          // each seat is null (empty) or a passenger {id, name}
var waitingQueue = [];   // the queue: first element = FRONT, last element = REAR
var nextId = 1;

for (var i = 0; i < TOTAL_SEATS; i++) {
  seats.push(null);
}

function showMessage(text, type) {
  var box = document.getElementById("message");
  box.innerText = text;
  box.className = "message " + type;
}

// BOOK TICKET
function bookTicket() {
  var name = document.getElementById("name").value.trim();
  if (name === "") {
    showMessage("Please enter the passenger name.", "error");
    return;
  }
  name = name.replace(/</g, "&lt;");   // keeps the page safe

  var passenger = { id: nextId, name: name };
  var freeIndex = seats.indexOf(null);   // first empty seat

  if (freeIndex !== -1) {
    seats[freeIndex] = passenger;
    showMessage("Ticket CONFIRMED! ID " + passenger.id + ", Seat " + (freeIndex + 1), "success");
    nextId++;
  } else if (waitingQueue.length < MAX_WAIT) {
    waitingQueue.push(passenger);   // enqueue at REAR
    showMessage("Train full. Added to waiting list, position " + waitingQueue.length + ". ID " + passenger.id, "info");
    nextId++;
  } else {
    showMessage("Train and waiting list are both full.", "error");
  }

  document.getElementById("name").value = "";
  updateScreen();
}

// CANCEL TICKET
function cancelTicket() {
  var id = parseInt(document.getElementById("cancelId").value);
  if (isNaN(id) || id <= 0) {
    showMessage("Please enter a valid ticket ID.", "error");
    return;
  }

  // Case 1: ticket is a confirmed seat
  for (var i = 0; i < TOTAL_SEATS; i++) {
    if (seats[i] !== null && seats[i].id === id) {
      seats[i] = null;
      var text = "Ticket " + id + " cancelled. Seat " + (i + 1) + " is free.";
      if (waitingQueue.length > 0) {
        seats[i] = waitingQueue.shift();   // dequeue from FRONT (FIFO)
        text += " " + seats[i].name + " from the waiting list got Seat " + (i + 1) + ".";
      }
      showMessage(text, "success");
      document.getElementById("cancelId").value = "";
      updateScreen();
      return;
    }
  }

  // Case 2: ticket is in the waiting queue
  for (var j = 0; j < waitingQueue.length; j++) {
    if (waitingQueue[j].id === id) {
      waitingQueue.splice(j, 1);
      showMessage("Waiting ticket " + id + " cancelled.", "success");
      document.getElementById("cancelId").value = "";
      updateScreen();
      return;
    }
  }

  showMessage("Ticket ID " + id + " not found.", "error");
}

// SHOW AVAILABLE SEATS
function showSeats() {
  var freeList = [];
  for (var i = 0; i < TOTAL_SEATS; i++) {
    if (seats[i] === null) {
      freeList.push("Seat " + (i + 1));
    }
  }
  if (freeList.length === 0) {
    showMessage("No seats available. New bookings go to the waiting list.", "error");
  } else {
    showMessage("Available seats (" + freeList.length + "): " + freeList.join(", "), "info");
  }
}

// SHOW WAITING QUEUE
function showQueue() {
  if (waitingQueue.length === 0) {
    showMessage("Waiting list is empty.", "info");
    return;
  }
  var names = [];
  for (var i = 0; i < waitingQueue.length; i++) {
    names.push((i + 1) + ". " + waitingQueue[i].name);
  }
  showMessage("Waiting queue (front to rear): " + names.join("  |  "), "info");
}

// RESET
function resetAll() {
  for (var i = 0; i < TOTAL_SEATS; i++) {
    seats[i] = null;
  }
  waitingQueue = [];
  nextId = 1;
  showMessage("System reset. All seats are free.", "info");
  updateScreen();
}

// Redraw seats and queue on the screen
function updateScreen() {
  var seatHtml = "";
  var freeCount = 0;
  for (var i = 0; i < TOTAL_SEATS; i++) {
    if (seats[i] === null) {
      seatHtml += "<div class='seat free'><b>Seat " + (i + 1) + "</b><br>Available</div>";
      freeCount++;
    } else {
      seatHtml += "<div class='seat booked'><b>Seat " + (i + 1) + "</b><br>" +
                  seats[i].name + "<br>ID: " + seats[i].id + "</div>";
    }
  }
  document.getElementById("seatBox").innerHTML = seatHtml;
  document.getElementById("seatCount").innerText = "(" + freeCount + " free)";

  var queueHtml = "";
  for (var j = 0; j < waitingQueue.length; j++) {
    var tag = "";
    if (j === 0) { tag = " (FRONT)"; }
    if (j === waitingQueue.length - 1 && j !== 0) { tag = " (REAR)"; }
    queueHtml += "<div class='person'>" + waitingQueue[j].name + "<br>ID: " +
                 waitingQueue[j].id + tag + "</div>";
  }
  if (queueHtml === "") {
    queueHtml = "<span class='empty'>Queue is empty</span>";
  }
  document.getElementById("queueBox").innerHTML = queueHtml;
  document.getElementById("queueCount").innerText = "(" + waitingQueue.length + " waiting)";
}

updateScreen();
