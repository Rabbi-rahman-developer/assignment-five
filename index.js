let accountBalance = 5500;
let historyList = document.getElementById('historyList');
let accountBalanceDisplay = document.getElementById('accountBalance');
let modal = document.getElementById('my_modal_5');
let closeModalButton = document.getElementById('closeModalButton');

const donationButton = document.getElementById('donationButton');
const historyButton = document.getElementById('historyButton');
const blogButton = document.getElementById('blogButton');

// Click event using addEventListener
donationButton.addEventListener('click', function() {
    toggleVisibility('donationSection', 'historySection', donationButton);
});

historyButton.addEventListener('click', function() {
    toggleVisibility('historySection', 'donationSection', historyButton);
    displayHistory(); 
});

// Blog button click event
blogButton.addEventListener('click', function() {
    window.location.href = 'blog.html'; 
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
    let currentAmount = parseInt(currentAmountElem.textContent, 10);
    let donationTitle = card.querySelector('p.font-extrabold').textContent;

    if (!donationAmount || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (donationAmount > accountBalance) {
        alert("Insufficient balance!");
        return;
    }

    // Update the account balance
    accountBalance -= donationAmount;
    accountBalanceDisplay.textContent = accountBalance + " BDT";

    // Update the total amount on the button
    currentAmount += donationAmount;
    currentAmountElem.textContent = currentAmount + " BDT";

    // Add to donation history
    addToHistory(donationTitle, donationAmount);

    // Clear the input field
    donationInput.value = '';

    // Show the modal after successfully processing the donation
    modal.showModal();
}

// Close modal
closeModalButton.addEventListener('click', function() {
    modal.close();
});

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

function displayHistory() {
    if (historyList.children.length === 0) {
        historyList.innerHTML = `<p>No donation history available.</p>`;
    }
}

function highlightActiveButton(activeButton) {
    let buttons = [donationButton, historyButton];
    for (const button of buttons) {
        button.classList.toggle('bg-[#B4F461]', button === activeButton);
        button.classList.toggle('btn-outline', button !== activeButton);
    }
}
