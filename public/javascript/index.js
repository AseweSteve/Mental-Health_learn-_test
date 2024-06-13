var x=1;
$(document).ready(function() {

    $("#hide").hover(function(){
       $(".target").toggleClass('hide1');
    });

    $(".banner").hover(function(){
        $(this).toggleClass('hide2');
        $(".testname").slideDown("slow");
      });
      
      $(".a").click(function(){
        if(x%2==1){
          $(".show").slideDown("slow");
          x++;
        }else{
            $(".show").slideUp("slow");
            x++;
        }
        $("showdep").click(function(){

        });
      });
      $("#dep").click(function(){
          $(".h2").text("Depression");
          $("#showdep").removeClass("showdep")
          $("#showfear").addClass("showfear")
          $("#showanger").addClass("showanger");
          $("#showphone").addClass("showphone");
      });
      $("#fear").click(function(){
        $(".h2").text("Fear");
        $("#showfear").removeClass("showfear")
        $("#showdep").addClass("showdep")
        $("#showanger").addClass("showanger");
        $("#showphone").addClass("showphone");
      });
      $("#anger").click(function(){
        $(".h2").text("Anger");
        $("#showanger").removeClass("showanger")
        $("#showdep").addClass("showdep")
        $("#showfear").addClass("showfear");
        $("#showphone").addClass("showphone");
      });
      $("#phone").click(function(){
        $(".h2").text("Phone Addiction");
        $("#showanger").addClass("showanger")
        $("#showdep").addClass("showdep")
        $("#showfear").addClass("showfear");
        $("#showphone").removeClass("showphone");
      });

});
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const signupMessage = document.getElementById('signup-message');

  signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(signupForm);
      const userData = {
          username: formData.get('username'),
          email: formData.get('email'),
          password: formData.get('password')
      };

      try {
          const response = await fetch('/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          });

          const data = await response.json();
          signupMessage.textContent = data.message;
      } catch (error) {
          console.error('Error:', error);
      }
  });
});

function toggleModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

  // Add event listener for the login form
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const userData = {
          username: formData.get('login-username'),
          password: formData.get('login-password')
      };

      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          });

          const data = await response.json();
          if (response.ok) {
              loginMessage.textContent = `Welcome, ${data.username}!`;
          } else {
              loginMessage.textContent = data.message;
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });


document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const loginRedirectButton = document.getElementById('login-redirect');

  signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Your signup form submission logic goes here
  });

  loginRedirectButton.addEventListener('click', () => {
      // Redirect to the login page
      window.location.href = '/login'; // Replace '/login' with your actual login page URL
  });
});

function toggleLike(button) {
  button.classList.toggle('liked');
  if (button.classList.contains('liked')) {
      alert('Liked!');
  }
}

