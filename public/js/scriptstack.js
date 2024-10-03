document.addEventListener('DOMContentLoaded', function () {
  let balance = parseFloat(localStorage.getItem('balance')) || 100;
  const balanceElement = document.getElementById('balance');
  balanceElement.innerText = balance.toFixed(2);

  let betAmount = 0;
  let mark;
  let cells;
  const savedName = localStorage.getItem('profileName');
  if (savedName) {
      document.getElementById('profileName').textContent = savedName;
  }else {
    window.location.href= "/index.html";
  }
  const grid = document.getElementById('grid');
  const msg = document.querySelector('.message');
  const chooser = document.querySelector('form');
  const popup = document.getElementById('popup');
  const betForm = document.getElementById('bet-form');

  // Show popup to place bet before the game starts
  function showPopup() {
      popup.classList.add('show');
  }

  // Handle bet form submission
  betForm.addEventListener('submit', function (e) {
      e.preventDefault();
      betAmount = parseFloat(document.getElementById('bet-amount').value);

      if (betAmount > balance) {
          alert('Insufficient balance!');
          return;
      }

      balance -= betAmount;
      balanceElement.innerText = balance.toFixed(2);
      localStorage.setItem('balance', balance.toFixed(2));

      popup.classList.remove('show');
  });

  // Set player mark and start the game
  function setPlayer() {
      mark = this.value;
      msg.textContent = mark + ', click on a square to make your move!';
      chooser.classList.add('game-on');
      this.checked = false;
      buildGrid();
  }

  // Handle player move
  function playerMove() {
      if (this.textContent == '') {
          this.textContent = mark;
          if (checkRow()) {
              balance += betAmount * 2;
              balanceElement.innerText = balance.toFixed(2);
              localStorage.setItem('balance', balance.toFixed(2));
          } else {
              switchMark();
              computerMove();
          }
      }
  }

  // Computer's move
  function computerMove() {
      let emptyCells = [];
      cells.forEach(function (cell) {
          if (cell.textContent == '') {
              emptyCells.push(cell);
          }
      });

      if (emptyCells.length > 0) {
          let random = Math.floor(Math.random() * emptyCells.length);
          emptyCells[random].textContent = mark;
          if (checkRow()) {
              msg.textContent = 'Computer wins!';
          }
          switchMark();
      }
  }

  // Switch player mark
  function switchMark() {
      mark = (mark == 'X') ? 'O' : 'X';
  }

  // Check for a winner
  function winner(a, b, c) {
      if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
          msg.textContent = mark + ' is the winner!';
          a.classList.add('winner');
          b.classList.add('winner');
          c.classList.add('winner');
          return true;
      }
      return false;
  }

  // Check all rows for a winner
  function checkRow() {
      return winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')) ||
          winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6')) ||
          winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9')) ||
          winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7')) ||
          winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8')) ||
          winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9')) ||
          winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9')) ||
          winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
  }

  // Reset the game grid
  function resetGrid() {
      mark = 'X';
      cells.forEach(function (cell) {
          cell.textContent = '';
          cell.classList.remove('winner');
      });
      msg.textContent = 'Choose your player:';
      chooser.classList.remove('game-on');
      grid.innerHTML = '';
      showPopup();
  }

  // Build the game grid
  function buildGrid() {
      for (let i = 1; i <= 9; i++) {
          let cell = document.createElement('li');
          cell.id = 'c' + i;
          cell.addEventListener('click', playerMove, false);
          grid.appendChild(cell);
      }
      cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
  }

  // Event listeners for player choice and reset button
  let players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
  players.forEach(function (choice) {
      choice.addEventListener('click', setPlayer, false);
  });

  let resetButton = chooser.querySelector('button');
  resetButton.addEventListener('click', function (e) {
      e.preventDefault();
      resetGrid();
  });

  // Handle page unload event to deduct bet amount if the player leaves the game
  window.addEventListener('beforeunload', function () {
      if (!chooser.classList.contains('game-on')) {
          balanceElement.innerText = balance.toFixed(2);
          localStorage.setItem('balance', balance.toFixed(2));
      }
  });

  showPopup();
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

document.addEventListener('DOMContentLoaded', function () {
  const storedBalance = parseFloat(localStorage.getItem('balance')) || 1;
  document.getElementById('balance').innerText = storedBalance.toFixed(2);
});
