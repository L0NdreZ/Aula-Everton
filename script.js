document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('post-form');
  const postText = document.getElementById('post-text');
  const photoUpload = document.getElementById('photo-upload');
  const postsContainer = document.getElementById('posts-container');
 loadSavedPosts();

  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createPost();
  });

  function createPost() {
    const postTextValue = postText.value;
    const photoFile = photoUpload.files[0];

    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const textElement = document.createElement('p');
    textElement.textContent = postTextValue;
    postElement.appendChild(textElement);

    if (photoFile) {
      const photoElement = document.createElement('img');
      const reader = new FileReader();

      reader.onload = () => {
        photoElement.src = reader.result;
      };

      reader.readAsDataURL(photoFile);
      postElement.appendChild(photoElement);
    }

    postsContainer.appendChild(postElement);
    postText.value = '';
    photoUpload.value = '';
  savePost(postElement);
  }

  function savePost(postElement) {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts.push(postElement.innerHTML);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
  }

  function loadSavedPosts() {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    savedPosts.forEach((postHTML) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = postHTML;
      postsContainer.appendChild(postElement);
    });
  }

  const postButton = document.getElementById('post-button');
  postButton.addEventListener('click', createPost);
});
