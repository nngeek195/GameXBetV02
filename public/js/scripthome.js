
// Function to update the user's profile photo on page load
function updateProfilePhoto() {
  const profilePhotoElements = document.querySelectorAll('.bg-center.bg-no-repeat.bg-cover');
  const savedImage = localStorage.getItem('profileImage');

  if (savedImage && profilePhotoElements.length > 0) {
      profilePhotoElements.forEach(element => {
          element.style.backgroundImage = `url('${savedImage}')`;
      });
  }
}

const savedName = localStorage.getItem('profileName');
if (savedName) {
    document.getElementById('profileName').textContent = savedName;
}else {
  window.location.href= "/index.html";
}

// Call the function when the page loads to ensure the latest photo is shown
window.onload = function() {
  updateProfilePhoto();
};






