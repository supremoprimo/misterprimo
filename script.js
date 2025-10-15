// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = darkModeToggle.querySelector('i');

// Check for saved mode in localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Project Data
const projects = {
    'events-video': {
    title: 'Video',
    category: 'Video Editing',
    tools: 'Adobe Premiere Pro, After Effects, Capcut',
    type: 'Promotional Video',
    description: 'A comprehensive promotional video for a corporate client showcasing their annual conference. The project involved editing multiple camera angles, adding motion graphics, and crafting a compelling narrative that highlights the company’s achievements and future goals. In addition to corporate projects, I also produce game highlight videos — focusing on dynamic editing, smooth transitions, and impactful pacing to capture the energy and excitement of competitive gameplay. Since I can’t upload large files here, you can watch the full videos on my Google Drive: https://drive.google.com/drive/folders/1p8QJ93SnFHI5iGjretEZQhIU6Z4YOwe-?usp=sharing',
    mainImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    gallery: [
        'images/vid/valo.png',
        'images/vid/deb.png',
        'images/vid/ran.png',
        'images/vid/wed.png',
        'images/vid/val.png'
    ]
},

   'graphic-designs': {
    title: 'Graphic Designs',
    category: 'Graphic Design',
    tools: 'Adobe Photoshop, Canva',
    type: 'Brand Identity & Marketing Materials',
    description: 'A comprehensive collection of graphic designs created for various clients including logo design, brand identity packages, marketing collateral, and social media graphics. Each project was tailored to the client\'s brand voice and target audience. Since I can’t upload large files here, you can view the full collection on my Google Drive: https://drive.google.com/drive/folders/1DuOEO8MwvmG_RqQjqDpp1AdVRKeJMUja?usp=sharing',
    mainImage: 'images/post/2.jpg',
    gallery: [
        'images/post/1.jpg',
        'images/post/5.jpg',
        'images/post/3.jpg',
        'images/post/4.jpg'
    ]
},

    'website-designs': {
    title: 'Website Designs',
    category: 'Web Design',
    tools: 'HTML, CSS, JavaScript, Figma',
    type: 'Responsive Web Design',
    description: 'A collection of custom websites designed and developed with a focus on clean layout, responsive design, and optimal user experience. Each website was built with modern web standards and optimized for performance across all devices. Since I can’t upload large files here, you can view the full project collection on my Google Drive: https://drive.google.com/drive/folders/1MOcG54S8n1e-mJsTj7fHAGkJzJ0S2Lgg?usp=sharing',
    mainImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
    gallery: [
        'images/web/web.png',
        'images/web/mob.png',
        'images/web/webs.png',
        'images/web/websi.png'
    ]
},

};

// Modal functionality
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalTools = document.getElementById('modalTools');
const modalType = document.getElementById('modalType');
const modalGallery = document.getElementById('modalGallery');
const closeBtn = document.querySelector('.close');

// Add click event listeners to all "View Project" buttons
document.querySelectorAll('.btn-outline').forEach(button => {
    if (button.textContent.includes('View Project')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the portfolio item that contains this button
            const portfolioItem = this.closest('.portfolio-item');
            const category = portfolioItem.getAttribute('data-category');
            
            // Find the project data based on category
            let projectKey = '';
            if (category === 'video') {
                projectKey = 'events-video';
            } else if (category === 'design') {
                projectKey = 'graphic-designs';
            } else if (category === 'web') {
                projectKey = 'website-designs';
            }
            
            if (projectKey && projects[projectKey]) {
                openModal(projects[projectKey]);
            }
        });
    }
});

function openModal(project) {
    modalImg.src = project.mainImage;
    modalImg.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalCategory.textContent = project.category;
    modalTools.textContent = project.tools;
    modalType.textContent = project.type;
    
    // Clear existing gallery
    modalGallery.innerHTML = '';
    
    // Add gallery images and videos
    project.gallery.forEach(mediaUrl => {
        const isVideo = mediaUrl.toLowerCase().includes('.mp4') || mediaUrl.toLowerCase().includes('.webm') || mediaUrl.toLowerCase().includes('.ogg') || mediaUrl.toLowerCase().includes('.mov');
        
        if (isVideo) {
            const video = document.createElement('video');
            video.src = mediaUrl;
            video.controls = true;
            video.muted = true;
            video.style.width = '100%';
            video.style.height = '150px';
            video.style.objectFit = 'cover';
            video.style.borderRadius = '8px';
            video.style.cursor = 'pointer';
            
            // Add error handling for unsupported video formats
            video.addEventListener('error', function() {
                console.warn(`Video format not supported: ${mediaUrl}`);
                // Create a fallback div with error message
                const errorDiv = document.createElement('div');
                errorDiv.style.width = '100%';
                errorDiv.style.height = '150px';
                errorDiv.style.backgroundColor = '#f0f0f0';
                errorDiv.style.borderRadius = '8px';
                errorDiv.style.display = 'flex';
                errorDiv.style.alignItems = 'center';
                errorDiv.style.justifyContent = 'center';
                errorDiv.style.color = '#666';
                errorDiv.style.fontSize = '12px';
                errorDiv.style.textAlign = 'center';
                errorDiv.innerHTML = `
                    <div>
                        <i class="fas fa-exclamation-triangle" style="font-size: 20px; margin-bottom: 5px; display: block;"></i>
                        Video format not supported<br>
                        <small>Please try a different browser or convert to MP4</small>
                    </div>
                `;
                video.parentNode.replaceChild(errorDiv, video);
            });
            
            video.addEventListener('click', function() {
                // Replace main image with video
                const mainVideo = document.createElement('video');
                mainVideo.src = mediaUrl;
                mainVideo.controls = true;
                mainVideo.muted = false;
                mainVideo.style.width = '100%';
                mainVideo.style.height = '400px';
                mainVideo.style.objectFit = 'cover';
                mainVideo.autoplay = true;
                
                // Add error handling for main video as well
                mainVideo.addEventListener('error', function() {
                    console.warn(`Main video format not supported: ${mediaUrl}`);
                    const errorDiv = document.createElement('div');
                    errorDiv.style.width = '100%';
                    errorDiv.style.height = '400px';
                    errorDiv.style.backgroundColor = '#f0f0f0';
                    errorDiv.style.borderRadius = '10px 10px 0 0';
                    errorDiv.style.display = 'flex';
                    errorDiv.style.alignItems = 'center';
                    errorDiv.style.justifyContent = 'center';
                    errorDiv.style.color = '#666';
                    errorDiv.style.fontSize = '16px';
                    errorDiv.style.textAlign = 'center';
                    errorDiv.innerHTML = `
                        <div>
                            <i class="fas fa-exclamation-triangle" style="font-size: 40px; margin-bottom: 10px; display: block;"></i>
                            Video format not supported<br>
                            <small>This video format (.mov) is not supported in your browser.<br>Please try using Chrome, Firefox, or Safari, or convert the video to MP4 format.</small>
                        </div>
                    `;
                    modalImg.parentNode.replaceChild(errorDiv, modalImg);
                });
                
                // Replace modalImg with video
                modalImg.parentNode.replaceChild(mainVideo, modalImg);
                modalImg.src = mediaUrl; // Keep reference for when switching back to images
            });
            
            modalGallery.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = mediaUrl;
            img.alt = project.title;
            img.style.width = '100%';
            img.style.height = '150px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', function() {
                // Restore img element if it was replaced by video
                if (modalImg.parentNode.tagName === 'VIDEO') {
                    const newImg = document.createElement('img');
                    newImg.id = 'modalImg';
                    newImg.src = mediaUrl;
                    newImg.alt = project.title;
                    newImg.style.width = '100%';
                    newImg.style.height = '400px';
                    newImg.style.objectFit = 'cover';
                    modalImg.parentNode.replaceChild(newImg, modalImg.parentNode);
                } else {
                    modalImg.src = mediaUrl;
                }
            });
            
            modalGallery.appendChild(img);
        }
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal functionality
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});
