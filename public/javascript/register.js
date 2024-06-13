document.addEventListener("DOMContentLoaded", () => {
  const loginToggle = document.getElementById('loginToggle');
  const signupToggle = document.getElementById('signupToggle');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  loginToggle.addEventListener('click', () => {
      loginToggle.classList.add('active');
      signupToggle.classList.remove('active');
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
  });

  signupToggle.addEventListener('click', () => {
      signupToggle.classList.add('active');
      loginToggle.classList.remove('active');
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
  });

  document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const formData = new FormData(form);
          const formType = form.id === 'loginForm' ? 'login' : 'signup';
          const response = await fetch(`/${formType}`, {
              method: 'POST',
              body: JSON.stringify(Object.fromEntries(formData)),
              headers: { 'Content-Type': 'application/json' }
          });
          const result = await response.json();
          if (result.success) {
              window.location.href = formType === 'login' ? '/blog.html' : '/depression.html';
          } else {
              alert(result.message);
          }
      });
  });
});
