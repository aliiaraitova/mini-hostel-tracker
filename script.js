let guestList = JSON.parse(localStorage.getItem('guests')) || [];

function saveGuests() {
  localStorage.setItem('guests', JSON.stringify(guestList));
}

function renderGuests() {
  const list = document.getElementById('guestList');
  list.innerHTML = '';
  guestList.forEach((guest, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${guest.name}</strong> - Room ${guest.room} - $${guest.payment}
      <button onclick="checkOut(${index})">Check Out</button>
    `;
    list.appendChild(li);
  });
}

function checkOut(index) {
  guestList.splice(index, 1);
  saveGuests();
  renderGuests();
}

document.getElementById('guestForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const room = document.getElementById('room').value;
  const payment = document.getElementById('payment').value;

  guestList.push({ name, room, payment });
  saveGuests();
  renderGuests();
  this.reset();
});

renderGuests();
