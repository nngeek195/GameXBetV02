document.getElementById('openPopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none';
});

function autoFill() {
    document.getElementById('name').value = "Lari Rabello";
    document.getElementById('number').value = "0123 5678 2345 1234";
    document.getElementById('date').value = "12/2025";
    document.getElementById('cvv').value = "***";
    document.getElementById('amount').value = "1000000";
}

const savedName = localStorage.getItem('profileName');
if (savedName) {
    document.getElementById('profileName').textContent = savedName;
}else {
  window.location.href= "/index.html";
}


document.getElementById('openPopup1').addEventListener('click', function () {
    document.getElementById('popup1').style.display = 'flex';
});

document.getElementById('closePopup1').addEventListener('click', function () {
    document.getElementById('popup1').style.display = 'none';
});

function autoFill() {
    document.getElementById('name').value = "Lari Rabello";
    document.getElementById('number').value = "0123 5678 2345 1234";
    document.getElementById('tel').value = "+94712345678";
    document.getElementById('country').value = "Sri Lanka";
    document.getElementById('amount').value = "1000000";
}

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


document.getElementById('openPopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none';
});

document.getElementById('openPopup1').addEventListener('click', function () {
    document.getElementById('popup1').style.display = 'flex';
});

document.getElementById('closePopup1').addEventListener('click', function () {
    document.getElementById('popup1').style.display = 'none';
});

// Handle Deposit
document.getElementById('checkout').addEventListener('click', function () {
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    const maxDeposit = 500;
    
    if (depositAmount > maxDeposit) {
        alert('Maximum deposit amount is LKR 500');
        return;
    }

    // Retrieve the current balance from localStorage
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;

    // Update the balance
    currentBalance += depositAmount;

    // Save the updated balance to localStorage
    localStorage.setItem('balance', currentBalance.toFixed(2));

    // Update the displayed balance
    document.getElementById('balance').innerText = currentBalance.toFixed(2);

    alert('Deposit successful!');
    document.getElementById('popup').style.display = 'none';
    document.getElementById('depositForm').reset(); // Reset the form fields
});

// Handle Withdrawal
document.getElementById('withdraw').addEventListener('click', function () {
    const withdrawalAmount = parseFloat(document.getElementById('withdrawAmount').value);

    // Retrieve the current balance from localStorage
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;

    if (withdrawalAmount > currentBalance) {
        alert('Insufficient balance for this withdrawal.');
        return;
    }

    // Update the balance
    currentBalance -= withdrawalAmount;

    // Save the updated balance to localStorage
    localStorage.setItem('balance', currentBalance.toFixed(2));

    // Update the displayed balance
    document.getElementById('balance').innerText = currentBalance.toFixed(2);

    alert('Withdrawal successful!');
    document.getElementById('popup1').style.display = 'none';
});

// Initialize the balance on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedBalance = parseFloat(localStorage.getItem('balance')) || 1;
    document.getElementById('balance').innerText = storedBalance.toFixed(2);
});
