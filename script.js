let bookings = JSON.parse(localStorage.getItem('bookings')) || {};

function saveBookings() {
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

function renderBookings(date) {
  const list = document.getElementById('bookingList');
  list.innerHTML = '';

  if (!bookings[date] || bookings[date].length === 0) {
    list.innerHTML = '<li>No bookings for this date.</li>';
    return;
  }

  bookings[date].forEach((booking, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${booking.name}</strong> - Room ${booking.room}
      <button onclick="removeBooking('${date}', ${index})">Remove</button>
    `;
    list.appendChild(li);
  });
}

function removeBooking(date, index) {
  bookings[date].splice(index, 1);
  saveBookings();
  renderBookings(date);
}

document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const name = document.getElementById('name').value;
  const room = document.getElementById('room').value;

  if (!bookings[date]) bookings[date] = [];
  bookings[date].push({ name, room });
  saveBookings();
  renderBookings(date);
  this.reset();
});

document.getElementById('date').addEventListener('change', function () {
  renderBookings(this.value);
});

// Initial render (if any date is pre-selected)
if (document.getElementById('date').value) {
  renderBookings(document.getElementById('date').value);
}
