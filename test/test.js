QUnit.module('Homepage Tests', (hooks) => {
    hooks.beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });
  
    QUnit.test('Form submission saves post and renders it', (assert) => {
      const postForm = document.createElement('form');
      postForm.id = 'postForm';
      postForm.innerHTML = `
        <input id="postTitle" value="Test Title">
        <textarea id="postContent">Test Content</textarea>
        <input type="file" id="imageInput">
        <input type="file" id="videoInput">
        <button type="submit">Submit</button>
      `;
      document.body.appendChild(postForm);
      const postsContainer = document.createElement('div');
      postsContainer.id = 'posts';
      document.body.appendChild(postsContainer);
  
      // Trigger form submission
      postForm.dispatchEvent(new Event('submit'));
  
      // Get the posts from localStorage
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
      // Assert the post is saved and rendered
      assert.equal(posts.length, 1, 'Post is saved to localStorage');
      assert.equal(posts[0].title, 'Test Title', 'Post title is correct');
      assert.equal(posts[0].content, 'Test Content', 'Post content is correct');
      assert.equal(postsContainer.children.length, 1, 'Post is rendered in DOM');
      
      // Clean up
      document.body.removeChild(postForm);
      document.body.removeChild(postsContainer);
    });
  
    QUnit.test('Post form validation prevents empty posts', (assert) => {
      const postForm = document.createElement('form');
      postForm.id = 'postForm';
      postForm.innerHTML = `
        <input id="postTitle" value="">
        <textarea id="postContent"></textarea>
        <button type="submit">Submit</button>
      `;
      document.body.appendChild(postForm);
  
      let alertTriggered = false;
      window.alert = () => { alertTriggered = true; };
  
      // Trigger form submission with empty fields
      postForm.dispatchEvent(new Event('submit'));
  
      // Assert that alert is triggered for missing title/content
      assert.ok(alertTriggered, 'Alert is triggered for missing title/content');
      
      // Clean up
      document.body.removeChild(postForm);
    });
  
    QUnit.test('Comment functionality works correctly', (assert) => {
      // Setup post and comment elements
      const post = {
        id: 1,
        title: 'Test Post',
        content: 'Test content',
        comments: []
      };
  
      localStorage.setItem('posts', JSON.stringify([post]));
  
      const postElement = document.createElement('article');
      postElement.className = 'post';
      postElement.dataset.id = post.id;
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <div class="comments">
          <textarea class="add-comment" placeholder="Write a comment..."></textarea>
          <button class="submit-comment">Comment</button>
          <ul class="comment-list"></ul>
        </div>
      `;
      
      document.body.appendChild(postElement);
      
      // Set up the comment functionality
      setupCommentFunctionality(postElement, post);
  
      // Simulate adding a comment
      const commentTextarea = postElement.querySelector('.add-comment');
      commentTextarea.value = 'Test comment';
      postElement.querySelector('.submit-comment').click();
  
      // Assert the comment is added
      const commentList = postElement.querySelector('.comment-list');
      assert.equal(commentList.children.length, 1, 'Comment is added to the post');
      assert.equal(commentList.children[0].textContent, 'Test comment', 'Comment content is correct');
      
      // Clean up
      document.body.removeChild(postElement);
    });
  
    QUnit.test('Post delete functionality works correctly', (assert) => {
      const post = {
        id: 1,
        title: 'Test Post',
        content: 'Test content',
        comments: []
      };
  
      localStorage.setItem('posts', JSON.stringify([post]));
  
      const postElement = document.createElement('article');
      postElement.className = 'post';
      postElement.dataset.id = post.id;
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button class="delete-post">Delete</button>
      `;
      
      document.body.appendChild(postElement);
      
      // Set up delete functionality
      setupDeleteFunctionality(postElement, post.id);
  
      // Simulate post deletion
      postElement.querySelector('.delete-post').click();
  
      // Assert the post is removed from localStorage and DOM
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      assert.equal(posts.length, 0, 'Post is removed from localStorage');
      assert.equal(document.body.contains(postElement), false, 'Post is removed from DOM');
      
      // Clean up
      document.body.removeChild(postElement);
    });
  });
  