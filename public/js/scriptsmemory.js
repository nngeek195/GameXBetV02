const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
const savedName = localStorage.getItem('profileName');
if (savedName) {
    document.getElementById('profileName').textContent = savedName;
}else {
  window.location.href= "/index.html";
}
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `/public/image/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});



//user profil update

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

