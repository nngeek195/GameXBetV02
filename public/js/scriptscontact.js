
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

// Function to save a new profile photo and update it across all pages
function saveNewProfilePhoto(photoInput) {
    if (photoInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newImageUrl = e.target.result;
            localStorage.setItem('profileImage', newImageUrl);
            updateProfilePhoto();  // Update the photo immediately after saving
        };
        reader.readAsDataURL(photoInput);
    }
}

// Call the function when the page loads to ensure the latest photo is shown
window.onload = function() {
    updateProfilePhoto();
};

const savedName = localStorage.getItem('profileName');
if (savedName) {
    document.getElementById('profileName').textContent = savedName;
}else {
  window.location.href= "/index.html";
}
//when the user clicks on submit button user again move to submit page


document.getElementById('form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Display the popup
    document.getElementById('openpopup').style.display = 'block';

    // Optionally, you can hide the popup after a few seconds
    setTimeout(function() {
        document.getElementById('openpopup').style.display = 'none';
    }, 3000); // 3 seconds delay

    // Reset the form
    document.getElementById('form1').reset();
});
