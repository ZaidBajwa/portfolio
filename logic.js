// ===== EMAILJS INIT =====
emailjs.init("3tU9OTJneR4YDGBA7");

// ===== HAMBURGER TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
const icon      = document.querySelector('.hamburger i');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// ===== FILTER BUTTONS =====
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== SKILLS ANIMATION =====
const skillsSection = document.querySelector('.skills');
let animated = false;

const animateSkills = () => {
    if (animated) return;
    animated = true;

    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });

    const percents = document.querySelectorAll('.skill-percent');
    percents.forEach(percent => {
        const target = parseInt(percent.getAttribute('data-target'));
        let current = 0;
        const increment = target / 80;

        setTimeout(() => {
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                percent.textContent = Math.floor(current) + '%';
            }, 20);
        }, 200);
    });
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

skillsObserver.observe(skillsSection);

// ===== CONTACT FORM — EmailJS =====
function sendMessage() {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const success = document.getElementById('successMsg');
    const btn     = document.querySelector('.contact-btn');

    // Validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields!');
        return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email!');
        return;
    }

    // Button loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    // EmailJS send
    emailjs.send(
        'service_n6yjves',      // ✅ tera Service ID
        'template_7i52ihg',     // ✅ tera Template ID
        {
            from_name:  name,
            from_email: email,
            subject:    subject,
            message:    message
        }
    )
    .then(() => {
        // Success
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled  = false;

        // Clear fields
        document.getElementById('name').value    = '';
        document.getElementById('email').value   = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';

        // Show success message
        success.classList.add('show');
        setTimeout(() => {
            success.classList.remove('show');
        }, 4000);
    })
    .catch((error) => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled  = false;
        alert('Something went wrong! Please try again.');
        console.error('EmailJS Error:', error);
    });
}