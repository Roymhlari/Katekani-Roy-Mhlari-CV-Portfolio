// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Tab functionality for "About Me" section
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');
  
    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Remove active class from all tabs
        tabLinks.forEach(tab => tab.classList.remove('active-link'));
        tabContents.forEach(content => content.classList.remove('active-tab'));
  
        // Add active class to the clicked tab and corresponding content
        link.classList.add('active-link');
        const target = link.textContent.toLowerCase();
        const targetContent = document.getElementById(target);
        if (targetContent) {
          targetContent.classList.add('active-tab');
        }
      });
    });
  
    // Toggle navigation menu for smaller screens
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');
  
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  
    // Handle contact form submission
    const form = document.querySelector('form[name="submit-to-google-sheet"]');
    const msgSpan = document.getElementById('msg');
  
    form.addEventListener('submit', async event => {
      event.preventDefault();
      msgSpan.textContent = 'Submitting...';
  
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());
  
      try {
        // Replace with the URL of your backend/Google Sheets script
        const response = await fetch('YOUR_GOOGLE_SHEET_SCRIPT_URL', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formObject),
        });
  
        if (response.ok) {
          msgSpan.textContent = 'Message sent successfully!';
          form.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        msgSpan.textContent = 'An error occurred. Please try again later.';
      }
    });
  });