// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Gallery functionality
    initializeGallery();

    // Menu download functionality
    if (typeof downloadMenu === 'function') {
        // Menu download function is available
    }
});

// Contact form validation and submission
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form elements
    const form = e.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');
    
    // Reset previous errors
    clearFormErrors();
    
    let isValid = true;
    
    // Validate name
    if (!nameInput.value.trim()) {
        showError('name', 'Please enter your full name');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        showError('email', 'Please enter your email address');
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // In a real application, you would send the form data to a server
        console.log('Form submitted successfully:', {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: messageInput.value.trim()
        });
        
        // Reset form after 5 seconds (optional)
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    const formGroup = field.closest('.form-group');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    if (formGroup) {
        formGroup.classList.add('error');
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const formGroups = document.querySelectorAll('.form-group');
    
    errorMessages.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}

// Gallery functionality
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentImageIndex = 0;
    let visibleImages = [];

    // Filter functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                filterGalleryItems(filter);
            });
        });
    }

    function filterGalleryItems(filter) {
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                // Add animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.display = 'none';
            }
        });
        
        updateVisibleImages();
    }

    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
    }

    // Modal functionality
    if (galleryItems.length > 0 && galleryModal) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                openModal(index);
            });
        });

        closeModal?.addEventListener('click', closeGalleryModal);
        
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });

        prevBtn?.addEventListener('click', showPreviousImage);
        nextBtn?.addEventListener('click', showNextImage);

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (galleryModal.style.display === 'block') {
                if (e.key === 'Escape') {
                    closeGalleryModal();
                } else if (e.key === 'ArrowLeft') {
                    showPreviousImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
    }

    function openModal(index) {
        updateVisibleImages();
        currentImageIndex = index;
        
        const item = visibleImages[currentImageIndex] || galleryItems[currentImageIndex];
        if (!item) return;
        
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        if (modalImage && img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
        }
        
        if (overlay && modalTitle && modalDescription) {
            const title = overlay.querySelector('h3');
            const description = overlay.querySelector('p');
            
            modalTitle.textContent = title ? title.textContent : '';
            modalDescription.textContent = description ? description.textContent : '';
        }
        
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryModal() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showPreviousImage() {
        updateVisibleImages();
        const items = visibleImages.length > 0 ? visibleImages : galleryItems;
        currentImageIndex = (currentImageIndex - 1 + items.length) % items.length;
        updateModalContent();
    }

    function showNextImage() {
        updateVisibleImages();
        const items = visibleImages.length > 0 ? visibleImages : galleryItems;
        currentImageIndex = (currentImageIndex + 1) % items.length;
        updateModalContent();
    }

    function updateModalContent() {
        const items = visibleImages.length > 0 ? visibleImages : galleryItems;
        const item = items[currentImageIndex];
        
        if (!item) return;
        
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        if (modalImage && img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
        }
        
        if (overlay && modalTitle && modalDescription) {
            const title = overlay.querySelector('h3');
            const description = overlay.querySelector('p');
            
            modalTitle.textContent = title ? title.textContent : '';
            modalDescription.textContent = description ? description.textContent : '';
        }
    }

    // Initialize visible images
    updateVisibleImages();
}

// Menu download functionality
function downloadMenu() {
    // In a real application, this would download an actual PDF file
    // For this demo, we'll simulate the download
    // console.log('menu shown');
    
    // Example of how you might handle a real PDF download:
    // const link = document.createElement('a');
    // link.href = 'menu/menu.pdf';
    // link.target = '_blank';    // Open in a new tab
    // // link.download = 'Master-Grill-Mediterranean-Menu.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

}


// Intersection Observer for animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .philosophy-card, .highlight-card, .info-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAnimations, 100);
});

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler with debouncing
const optimizedScrollHandler = debounce(function() {
    // Handle scroll-based animations or effects here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Form input enhancements
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() === '') {
                this.parentElement.classList.remove('filled');
            } else {
                this.parentElement.classList.add('filled');
            }
        });
        
        // Check initial state
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        }
    });
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load performance
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

