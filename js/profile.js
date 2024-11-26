document.addEventListener("DOMContentLoaded", () => {
    const profilePicInput = document.getElementById("profilePicInput");
    const profilePic = document.getElementById("profilePic");
  
    // Loads stored profile picture if available
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      profilePic.src = storedProfilePic;
    }
  
    // Handles profile picture upload
    profilePicInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          profilePic.src = result;
          localStorage.setItem("profilePic", result);
        };
  
        reader.readAsDataURL(file);
      } else {
        console.error("No file selected");
      }
    });
  
    // Post Handling
    const profilePostsContainer = document.getElementById("profile-posts");
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
  
    if (posts.length === 0) {
      profilePostsContainer.innerHTML = "<p>You have no posts yet.</p>";
      return;
    }
  
    posts.forEach((post, index) => {
      const postElement = document.createElement("article");
      postElement.classList.add("post");
  
      postElement.innerHTML = `
        <h3>${post.title || "Untitled Post"}</h3>
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
        ${post.video ? `<video controls src="${post.video}"></video>` : ""}
        <button class="delete-post" data-index="${index}">Delete</button>
      `;
  
      profilePostsContainer.appendChild(postElement);
    });
  
    // Delete Posts
    document.querySelectorAll(".delete-post").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        window.location.reload();
      });
    });
  });
  