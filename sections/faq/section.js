(function() {
  const triggers = document.querySelectorAll('.faq-retro__trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const content = this.nextElementSibling;
      
      // Close all others (optional, but cleaner)
      triggers.forEach(otherBtn => {
        if (otherBtn !== this && otherBtn.getAttribute('aria-expanded') === 'true') {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.style.maxHeight = null;
          // We don't set hidden=true immediately to allow transition, 
          // but strictly speaking we should wait. 
          // For simplicity in this "retro" theme, we just collapse.
        }
      });

      // Toggle current
      this.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        content.hidden = false;
        // Force reflow
        void content.offsetWidth; 
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  // Handle transition end to toggle hidden attribute
  const contents = document.querySelectorAll('.faq-retro__content');
  contents.forEach(content => {
    content.addEventListener('transitionend', () => {
      const btn = content.previousElementSibling;
      if (btn.getAttribute('aria-expanded') === 'false') {
        content.hidden = true;
      }
    });
  });
})();
