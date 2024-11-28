const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.setAttribute(
    'aria-expanded',
    navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );
});
const initSliders = () => {
    const sliders = document.querySelectorAll('.project-image-slider');
  
    sliders.forEach(slider => {
      let currentIndex = 0;
      const images = slider.querySelectorAll('img');
      const totalImages = images.length;
  
      const showImage = (index) => {
        images.forEach((img, i) => {
          img.style.display = i === index ? 'block' : 'none';
        });
      };
  
      slider.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
      });
  
      slider.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
      });
  
      showImage(currentIndex); 
    });
  };
  
  const createProjectCard = (project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('aria-labelledby', `project-${project.id}`);
  
    card.innerHTML = `<div class="project-image-slider">
        <button class="prev" aria-label="Previous Image">❮</button>
        <div class="images">
          ${project.images
            .map((image) => `<img src="${image}" alt="${project.title} image">`)
            .join('')}
        </div>
        <button class="next" aria-label="Next Image">❯</button>
      </div>
      <div class="project-content">
        <h3 id="project-${project.id}">${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
  
    return card;
  };
  
  const initSlider = () => {
    const sliders = document.querySelectorAll('.project-image-slider');
  
    sliders.forEach((slider) => {
      let currentIndex = 0;
      const images = slider.querySelectorAll('img');
      const totalImages = images.length;
  
      const showImage = (index) => {
        images.forEach((img, i) => {
          img.style.display = i === index ? 'block' : 'none';
        });
      };
  
      slider.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
      });
  
      slider.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
      });
  
      showImage(currentIndex); 
    });
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    loadProjects().then(initSlider); 
  });
  
const loadProjects = async () => {
  const projectsGrid = document.querySelector('.projects-grid');
  const loadingSpinner = document.querySelector('.loading-spinner');

  try {
    loadingSpinner.style.display = 'block';

    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Failed to fetch projects data.');

    const projectsData = await response.json();

    loadingSpinner.style.display = 'none';
    projectsData.forEach(project => {
      const card = createProjectCard(project);
      projectsGrid.appendChild(card);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.5s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    loadingSpinner.style.display = 'none';
    projectsGrid.innerHTML = `<p class="error-message">
        Failed to load projects. Please try again later.
      </p>`;
  }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();  
  const name = document.getElementById('name').value; 
  alert('Your form has been submitted successfully, ' + name + '!');
  this.reset();
});
