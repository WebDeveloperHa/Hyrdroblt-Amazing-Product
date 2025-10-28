document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Toggle for Mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close navbar when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Product Animation with Lightning and Thunder Effect
    const productImage = document.getElementById('productImage');
    const verbiageOverlay = document.getElementById('verbiageOverlay');
    const flashingText = document.getElementById('flashingText');
    const lightningBolt = document.getElementById('lightningBolt');
    const animateProductButton = document.getElementById('animateProductButton');

    // Array of verbiage to cycle through
    const verbiage = ["Revolutionary!", "Electrifying!", "Game Changer!", "Pure Power!"];
    let currentVerbiageIndex = 0;

    // Create an Audio object for the thunder sound
    // Make sure you have a 'thunder.mp3' file in your project root
    const thunderSound = new Audio('thunder.mp3');

    const triggerProductAnimation = () => {
        // Add a class for product image animation (e.g., subtle scale)
        productImage.classList.add('active');

        // Show verbiage overlay
        verbiageOverlay.classList.add('visible');
        flashingText.textContent = verbiage[currentVerbiageIndex];

        // Increment for next time, loop back if end
        currentVerbiageIndex = (currentVerbiageIndex + 1) % verbiage.length;

        // Trigger lightning flash
        lightningBolt.classList.add('flash');
        flashingText.style.color = 'white'; // Make text white during flash

        // Play thunder sound
        thunderSound.currentTime = 0; // Reset sound to start if played quickly again
        thunderSound.play().catch(e => console.error("Error playing thunder sound:", e)); // Catch promise rejection

        // Remove flash and reset text color after a short delay
        setTimeout(() => {
            lightningBolt.classList.remove('flash');
            flashingText.style.color = 'var(--primary-color)'; // Revert text color
            // Hide verbiage overlay after a bit longer
            setTimeout(() => {
                verbiageOverlay.classList.remove('visible');
                productImage.classList.remove('active'); // Remove image animation class
            }, 500); // Keep verbiage visible slightly longer
        }, 200); // Lightning flash duration
    };

    // Trigger animation on button click
    if (animateProductButton) {
        animateProductButton.addEventListener('click', triggerProductAnimation);
    }
    // Optional: Trigger animation periodically or on scroll for more impact
    // setInterval(triggerProductAnimation, 5000); // Triggers every 5 seconds

    // 3. Waiting List Form Submission
    const waitingListForm = document.getElementById('waitingListForm');
    const waitingListMessage = document.getElementById('waitingListMessage');

    if (waitingListForm) {
        waitingListForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const emailInput = waitingListForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // In a real application, you would send this email to your backend (e.g., using fetch API)
                // For demonstration, we'll just log it and show a message.
                console.log(`Email '${email}' added to waiting list!`);
                waitingListMessage.textContent = 'Thanks for joining the waiting list!';
                waitingListMessage.style.color = 'white';
                emailInput.value = ''; // Clear input

                // Simulate backend delay or success feedback
                setTimeout(() => {
                    waitingListMessage.textContent = '';
                }, 3000);

                // Example of a fetch request (needs a backend endpoint)
                /*
                fetch('/api/join-waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        waitingListMessage.textContent = 'Thanks for joining the waiting list!';
                        waitingListMessage.style.color = 'green';
                        emailInput.value = '';
                    } else {
                        waitingListMessage.textContent = data.message || 'Something went wrong. Please try again.';
                        waitingListMessage.style.color = 'red';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    waitingListMessage.textContent = 'Network error. Please try again later.';
                    waitingListMessage.style.color = 'red';
                });
                */
            } else {
                waitingListMessage.textContent = 'Please enter a valid email address.';
                waitingListMessage.style.color = 'orange';
            }
        });
    }

    // 4. Contact Form Submission (Client-side only)
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            if (name && email && message) {
                console.log('Contact Form Submitted:');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Message:', message);

                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset(); // Clear the form
                // In a real app, send this to a backend via fetch API
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Optional: Smooth scroll for navigation links (already handled by html scroll-behavior: smooth)
    // You might want to remove this if you rely purely on CSS for it.
    // document.querySelectorAll('.nav-links a').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });
});