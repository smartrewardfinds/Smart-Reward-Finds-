// Smart Reward Finds — script.js

// ── Mobile menu toggle ──
function toggleMenu() {
  var nav = document.getElementById('mobile-nav');
  var btn = document.getElementById('hamburger');
  if (!nav || !btn) return;
  var open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
}

// ── Contact form ──
var form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = document.getElementById('submit-btn');
    var success = document.getElementById('form-success');
    var error = document.getElementById('form-error');

    btn.disabled = true;
    btn.textContent = 'Sending...';
    if (error) error.style.display = 'none';

    var data = new FormData(form);

    fetch('https://formspree.io/f/xjgqgqyj', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      if (res.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        throw new Error('Failed');
      }
    })
    .catch(function() {
      if (error) error.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Send Message';
    });
  });

  // Mirror email to _replyto
  var emailInput = document.getElementById('email');
  var replyto = document.getElementById('replyto');
  if (emailInput && replyto) {
    emailInput.addEventListener('input', function() {
      replyto.value = emailInput.value;
    });
  }
}

// ── Active nav link ──
var links = document.querySelectorAll('.nav a, .mobile-nav a');
links.forEach(function(link) {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
