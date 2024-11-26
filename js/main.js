document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');
  
    loadPosts();
  
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Gets post content
      const postContent = document.getElementById('postContent').value.trim();
      const imageInput = document.getElementById('imageInput').files[0];
      const videoInput = document.getElementById('videoInput').files[0];
  
      // Prepares post object
      const post = {
        content: postContent,
        image: imageInput ? URL.createObjectURL(imageInput) : null,
        video: videoInput ? URL.createObjectURL(videoInput) : null,
        comments: [],
      };
  
      savePost(post);
      renderPost(post);
      postForm.reset();
    });
  
    function savePost(post) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.unshift(post); // Add the new post to the start
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  
    function loadPosts() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.forEach((post) => renderPost(post));
    }
  
    function renderPost(post) {
      const newPost = document.createElement('article');
      newPost.className = 'post';
      newPost.innerHTML = `
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image" style="max-width: 100%; margin-top: 10px;">` : ''}
        ${post.video ? `<video controls style="max-width: 100%; margin-top: 10px;"><source src="${post.video}" type="video/mp4"></video>` : ''}
        <div class="comments">
          <textarea class="add-comment" placeholder="Write a comment..."></textarea>
          <button class="submit-comment">Comment</button>
          <ul class="comment-list">
            ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
          </ul>
        </div>
      `;
      postsContainer.prepend(newPost);
      setupCommentFunctionality(newPost, post);
    }
  
    function setupCommentFunctionality(postElement, post) {
      const commentButton = postElement.querySelector('.submit-comment');
      const commentTextarea = postElement.querySelector('.add-comment');
      const commentList = postElement.querySelector('.comment-list');
  
      commentButton.addEventListener('click', () => {
        const commentText = commentTextarea.value.trim();
        if (commentText) {
          const newComment = document.createElement('li');
          newComment.textContent = commentText;
          commentList.appendChild(newComment);
  
          const posts = JSON.parse(localStorage.getItem('posts')) || [];
          const postIndex = posts.findIndex((p) => p.content === post.content);
          if (postIndex !== -1) {
            posts[postIndex].comments.push(commentText);
            localStorage.setItem('posts', JSON.stringify(posts));
          }
  
          commentTextarea.value = ''; 
        }
      });
    }
  });
  