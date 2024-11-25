document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');
  
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Gets post content
      const postContent = document.getElementById('postContent').value.trim();
      const imageInput = document.getElementById('imageInput').files[0];
      const videoInput = document.getElementById('videoInput').files[0];
  
      // Create a new post element
      const newPost = document.createElement('article');
      newPost.className = 'post';
      newPost.innerHTML = `
        <p>${postContent}</p>
        ${imageInput ? `<img src="${URL.createObjectURL(imageInput)}" alt="Post Image" style="max-width: 100%; margin-top: 10px;">` : ''}
        ${videoInput ? `<video controls style="max-width: 100%; margin-top: 10px;"><source src="${URL.createObjectURL(videoInput)}" type="${videoInput.type}"></video>` : ''}
        <div class="comments">
          <textarea class="add-comment" placeholder="Write a comment..."></textarea>
          <button class="submit-comment">Comment</button>
          <ul class="comment-list"></ul>
        </div>
      `;
      postsContainer.prepend(newPost);
      postForm.reset();
      setupCommentFunctionality(newPost);
    });
  
    function setupCommentFunctionality(post) {
      const commentButton = post.querySelector('.submit-comment');
      const commentTextarea = post.querySelector('.add-comment');
      const commentList = post.querySelector('.comment-list');
  
      commentButton.addEventListener('click', () => {
        const commentText = commentTextarea.value.trim();
        if (commentText) {
          const newComment = document.createElement('li');
          newComment.textContent = commentText;
          commentList.appendChild(newComment);
          commentTextarea.value = ''; 
        }
      });
    }
  });
  
