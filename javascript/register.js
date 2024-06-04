document.addEventListener('DOMContentLoaded', () => {
    const loginToggle = document.getElementById('loginToggle');
    const signupToggle = document.getElementById('signupToggle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
  
    loginToggle.addEventListener('click', () => {
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
      loginToggle.classList.add('active');
      signupToggle.classList.remove('active');
    });
  
    signupToggle.addEventListener('click', () => {
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
      signupToggle.classList.add('active');
      loginToggle.classList.remove('active');
    });
  
    // Default to login form being visible
    loginForm.classList.add('active');
    loginToggle.classList.add('active');
  });
  