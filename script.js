document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); // Uncomment this line if you want the animation to play only once
            } else {
                // Optional: Remove 'animate' class if element scrolls out of view
                // This makes animations replayable on scroll back up (useful for sections)
                entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);

    // Observe all main sections (excluding hero since it has initial animations)
    document.querySelectorAll('section:not(#hero)').forEach(section => {
        sectionObserver.observe(section);
    });

    // Special handling for Hero section elements (image and content)
    // These animate as soon as the page loads
    const heroImage = document.querySelector('.profile-image-circle.hero-image');
    const heroContent = document.querySelector('.hero-content');

    if (heroImage && heroContent) {
        // Add animate class to hero image and content immediately on load
        // A slight timeout can give a nice staggered effect
        setTimeout(() => {
            heroImage.classList.add('animate');
            heroContent.classList.add('animate');
        }, 300); // Small delay for effect
    }


    // Optional: Add specific animation for timeline items (animate once)
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Animate once and stop observing
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}); 