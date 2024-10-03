// DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image"),
  balanceDisplay = document.getElementById("balance"),
  betPopup = document.getElementById("bet-popup"),
  betForm = document.getElementById("bet-form"),
  betAmountInput = document.getElementById("bet-amount");

let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 100; // Initial balance
let betAmount = 0;

// Update balance display
balanceDisplay.textContent = balance;

// Show bet popup before starting the game
function showBetPopup() {
  betPopup.style.display = "block";
}

// Start the game after placing a bet
betForm.addEventListener("submit", (e) => {
  e.preventDefault();
  betAmount = parseInt(betAmountInput.value);

  if (betAmount > balance) {
    alert("You don't have enough balance to place this bet.");
  } else {
    // Deduct bet amount and start game
    balance -= betAmount;
    localStorage.setItem("balance", balance);
    balanceDisplay.textContent = balance;
    betPopup.style.display = "none";
    startGame();
  }
});
const savedName = localStorage.getItem('profileName');
if (savedName) {
    document.getElementById('profileName').textContent = savedName;
}else {
  window.location.href= "/index.html";
}
// Game logic
function startGame() {
  optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
      image.classList.add("active");
      userResult.src = cpuResult.src = "/public/image/rock.png";
      result.textContent = "Wait...";

      optionImages.forEach((image2, index2) => {
        index !== index2 && image2.classList.remove("active");
      });

      gameContainer.classList.add("start");

      setTimeout(() => {
        gameContainer.classList.remove("start");
        let imageSrc = e.target.querySelector("img").src;
        userResult.src = imageSrc;

        let randomNumber = Math.floor(Math.random() * 3);
        let cpuImages = ["/public/image/rock.png", "/public/image/paper.png", "/public/image/scissors.png"];
        cpuResult.src = cpuImages[randomNumber];

        let cpuValue = ["R", "P", "S"][randomNumber];
        let userValue = ["R", "P", "S"][index];

        let outcomes = {
          RR: "Draw",
          RP: "Cpu",
          RS: "User",
          PP: "Draw",
          PR: "User",
          PS: "Cpu",
          SS: "Draw",
          SR: "Cpu",
          SP: "User",
        };

        let outComeValue = outcomes[userValue + cpuValue];
        result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;

        if (outComeValue === "User") {
          balance += betAmount * 2; // Player wins double the bet amount
        }

        localStorage.setItem("balance", balance);
        balanceDisplay.textContent = balance;

        // Reset the game for next round
        setTimeout(showBetPopup, 2000); // Show bet popup again for the next round
      }, 2500);
    });
  });
}

// Initial call to show the bet popup
showBetPopup();

//user profil update.................................................................

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
//................................................................................................................................ 

//update miney....................................................................................................

// Initialize the balance on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedBalance = parseFloat(localStorage.getItem('balance')) || 1;
    document.getElementById('balance').innerText = storedBalance.toFixed(2);
});
