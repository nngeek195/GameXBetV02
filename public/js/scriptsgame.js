
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
//update money.....................................................................................

  document.addEventListener('DOMContentLoaded', function () {
    // Initialize the balance on page load
    const storedBalance = parseFloat(localStorage.getItem('balance')) || 0;
    document.getElementById('balance').innerText = storedBalance.toFixed(2);

    // Start the typewriter effect with the current balance
    startBalanceAnimation(storedBalance);

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

        // Restart the typewriter effect with the updated balance
        startBalanceAnimation(currentBalance);
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

        // Restart the typewriter effect with the updated balance
        startBalanceAnimation(currentBalance);
    });


    function startBalanceAnimation(balance) {
        // Array with texts to type in typewriter
        var dataText = [`Your balance is LKR ${balance.toFixed(2)}.`];

        function typeWriter(text, i, fnCallback) {
            // Check if text isn't finished yet
            if (i < (text.length)) {
                // Add next character to h1
                document.querySelector("h1").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

                // Wait for a while and call this function again for next character
                setTimeout(function () {
                    typeWriter(text, i + 1, fnCallback)
                }, 100);
            }
            // Text finished, call callback if there is a callback function
            else if (typeof fnCallback == 'function') {
                // Call callback after timeout
                setTimeout(fnCallback, 700);
            }
        }

        // Start a typewriter animation for a text in the dataText array
        function StartTextAnimation(i) {
            if (typeof dataText[i] == 'undefined') {
                setTimeout(function () {
                    StartTextAnimation(0);
                }, 20000);
            }
            // Check if dataText[i] exists
            if (i < dataText.length) {
                // Text exists! Start typewriter animation
                typeWriter(dataText[i], 0, function () {
                    // After callback (and whole text has been animated), start next text
                    StartTextAnimation(i + 1);
                });
            }
        }

        // Start the text animation
        StartTextAnimation(0);
    }
});

  