document.addEventListener('DOMContentLoaded', () => {
    const friends = document.querySelectorAll('.friend');
    const chatBox = document.getElementById('chatBox');
    const messageInput = document.getElementById('messageInput');
    const sendMessageButton = document.getElementById('sendMessage');
    
    let currentFriend = null;
  
    friends.forEach(friend => {
      friend.addEventListener('click', () => {
        currentFriend = friend.getAttribute('data-friend');
        chatBox.innerHTML = `<p>Starting chat with ${currentFriend}...</p>`;
        messageInput.value = '';
        messageInput.focus();
      });
    });
  
    sendMessageButton.addEventListener('click', () => {
      if (currentFriend && messageInput.value.trim()) {
        const userMessage = messageInput.value.trim();
        addMessageToChat('You', userMessage); 
        messageInput.value = ''; 
  
        // Fake friend's automatic response
        setTimeout(() => {
          const fakeResponse = "Unfortunately I am not a real person.";
          addMessageToChat(currentFriend, fakeResponse);
        }, 500); 
      }
    });
  
    // Function to add messages to the chat box
    function addMessageToChat(sender, message) {
      const newMessage = document.createElement('p');
      newMessage.textContent = `${sender}: ${message}`;
      newMessage.style.color = sender === 'You' ? "#333" : "#888"; 
      chatBox.appendChild(newMessage);
      chatBox.scrollTop = chatBox.scrollHeight; 
    }
  });
  