const scrambleButton = document.getElementById('scramble-button');
const checkButton = document.getElementById('check-button');
const contentText = document.getElementById('content-text');
const events = document.querySelectorAll('.event');
const slots = document.querySelectorAll('.slot');
const scrambleArea = document.querySelector('.scramble-area');

// Event description functionality
events.forEach(event => {
  event.addEventListener('click', () => {
    const description = event.getAttribute('data-content');
    contentText.innerHTML = `<strong>${event.querySelector('p').textContent}</strong><br>${description}`;
  });

  event.addEventListener('dragstart', () => {
    event.classList.add('dragging');
  });

  event.addEventListener('dragend', () => {
    event.classList.remove('dragging');
  });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (dragging) slot.appendChild(dragging);
  });
});

scrambleArea.addEventListener('dragover', e => {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  if (dragging) scrambleArea.appendChild(dragging);
});

// Scramble functionality
scrambleButton.addEventListener('click', () => {
  const eventsArray = Array.from(events);
  scrambleArea.innerHTML = ''; // Clear the scramble area
  eventsArray.sort(() => Math.random() - 0.5); // Shuffle events
  eventsArray.forEach(event => {
    scrambleArea.appendChild(event);
    event.classList.add('scrambled'); // Blur dates
  });
  contentText.textContent = 'Events scrambled! Drag them to the correct slots.';
});

// Check answers functionality
checkButton.addEventListener('click', () => {
  let correctCount = 0;

  slots.forEach(slot => {
    const event = slot.querySelector('.event');
    if (event && parseInt(event.dataset.year, 10) === parseInt(slot.dataset.year, 10)) {
      correctCount++;
    }
  });

  if (correctCount === slots.length) {
    contentText.textContent = 'All events are correctly placed!';
    events.forEach(event => event.classList.remove('scrambled')); // Unblur dates
  } else {
    contentText.textContent = `${correctCount} out of ${slots.length} events are correctly placed. Keep trying!`;
  }
});
