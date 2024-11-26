document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profile-form");
    const loadingGif = document.getElementById("loading-gif");
  
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault(); 
  
      console.log("Form submitted, displaying loading GIF...");
      loadingGif.style.display = "block";
  
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
  
      setTimeout(() => {
        console.log("Saving data...");
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        loadingGif.style.display = "none"; 
        console.log("Data saved, hiding loading GIF...");
      }, 11000); //adjustable time (11 seconds)
    });
  });
  