// Toggle navigation menu
document.querySelector('.nav-toggle').addEventListener('click', function () {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('active');

  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', !isExpanded);
});

// Initialize sliders for project cards
function setupSliders() {
  const sliders = document.querySelectorAll('.project-image-slider');

  sliders.forEach(slider => {
    const images = slider.querySelectorAll('img');
    let currentIndex = 0;

    function updateImage(index) {
      images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
      });
    }

    slider.querySelector('.prev').addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage(currentIndex);
    });

    slider.querySelector('.next').addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage(currentIndex);
    });

    updateImage(currentIndex); // Show the first image initially
  });
}

// Create a single project card
function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const imagesHtml = project.images
    .map(image => `<img src="${image}" alt="${project.title}">`)
    .join('');

  const tagsHtml = project.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  card.innerHTML = `
    <div class="project-image-slider">
      <button class="prev" aria-label="Previous Image">❮</button>
      <div class="images">${imagesHtml}</div>
      <button class="next" aria-label="Next Image">❯</button>
    </div>
    <div class="project-content">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">${tagsHtml}</div>
    </div>
  `;

  return card;
}

// Load project data and display cards
async function loadProjects() {
  const projectsGrid = document.querySelector('.projects-grid');
  const loadingSpinner = document.querySelector('.loading-spinner');

  loadingSpinner.style.display = 'block';

  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Failed to fetch projects.');

    const projects = await response.json();
    loadingSpinner.style.display = 'none';

    projects.forEach(project => {
      const card = createProjectCard(project);
      projectsGrid.appendChild(card);
    });

    setupSliders(); // Initialize sliders after adding cards
  } catch (error) {
    console.error('Error loading projects:', error);
    loadingSpinner.style.display = 'none';
    projectsGrid.innerHTML = `<p class="error-message">Failed to load projects. Please try again later.</p>`;
  }
}

// Enable smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', function () {
  loadProjects();
});
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();  // Prevent the form from submitting

  const name = document.getElementById('name').value;  // Get the name from the form
  const message = `Your form has been submitted successfully, ${name}!`;

  // Show the custom alert and display the message
  document.getElementById('alertMessage').textContent = message;
  document.getElementById('customAlert').style.display = 'block';

  // reset the form
  this.reset();
});

// Close the alert when the button is clicked
function closeAlert() {
  document.getElementById('customAlert').style.display = 'none';
}
// Get the toggle button
const darkModeToggle = document.getElementById('darkModeToggle');

// Check if dark mode preference is already saved in localStorage
const darkModePreference = localStorage.getItem('darkMode');

// Apply dark mode if preference is saved
if (darkModePreference === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Add event listener to toggle dark mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Save the dark mode preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});




