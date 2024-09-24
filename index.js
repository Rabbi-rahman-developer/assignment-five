

let accountBalance = 5500;
let historyList = document.getElementById('historyList');
let accountBalanceDisplay = document.getElementById('accountBalance');
let modal = document.getElementById('my_modal_5');
let modalCloseButton = modal.querySelector('.modal-action button');

const donationButton = document.getElementById('donationButton');
const historyButton = document.getElementById('historyButton');
const blogButton = document.getElementById('blogButton'); // Reference to Blog button

//  click event  using addEventListener
donationButton.addEventListener('click', function() {
    toggleVisibility('donationSection', 'historySection', donationButton);
});

historyButton.addEventListener('click', function() {
    toggleVisibility('historySection', 'donationSection', historyButton);
});

modalCloseButton.addEventListener('click', function() {
    modal.close();
});

// Blog button click event
blogButton.addEventListener('click', function() {
    window.location.href = 'blog.html'; // Change to the desired HTML file
});

// Donation buttons
let donateButtons = document.querySelectorAll('.donate-button');
for (const button of donateButtons) {
    button.addEventListener('click', function(event) {
        processDonation(event.target.closest('.bg-white'));
    });
}

function toggleVisibility(showId, hideId, activeButton) {
    document.getElementById(showId).style.display = 'block';
    document.getElementById(hideId).style.display = 'none';
    highlightActiveButton(activeButton);
}

function processDonation(card) {
    let donationInput = card.querySelector('input');
    let donationAmount = parseInt(donationInput.value, 10);
    let currentAmountElem = card.querySelector('button span');
    let donationTitle = card.querySelector('p.font-extrabold').textContent;

    if (!donationAmount || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (donationAmount > accountBalance) {
        alert("Insufficient balance!");
        return;
    }

    accountBalance -= donationAmount;
    accountBalanceDisplay.textContent = accountBalance + " BDT";
    currentAmountElem.textContent = (parseInt(currentAmountElem.textContent, 10) + donationAmount) + " BDT";
    donationInput.value = '';

    addToHistory(donationTitle, donationAmount);
    modal.showModal();
}

function addToHistory(title, amount) {
    let date = new Date().toLocaleString();
    let historyCard = document.createElement('div');
    historyCard.className = 'bg-white shadow-md p-4 rounded-lg';
    historyCard.innerHTML = `
        <p class="font-bold">${title}</p>
        <p>Amount: ${amount} BDT</p>
        <p>Date: ${date}</p>
    `;
    historyList.prepend(historyCard);
}

function highlightActiveButton(activeButton) {
    let buttons = [donationButton, historyButton];
    for (const button of buttons) {
        button.classList.toggle('bg-[#B4F461]', button === activeButton);
        button.classList.toggle('btn-outline', button !== activeButton);
    }
}
