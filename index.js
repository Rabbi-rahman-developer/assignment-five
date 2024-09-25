let historyList = document.getElementById('historyList');
let accountBalanceDisplay = document.getElementById('accountBalance');
let modal = document.getElementById('my_modal_5');
let closeModalButton = document.getElementById('closeModalButton');

const donationButton = document.getElementById('donationButton');
const historyButton = document.getElementById('historyButton');
const blogButton = document.getElementById('blogButton');

let accountBalance = parseInt(accountBalanceDisplay.textContent, 10);

updateAccountBalanceDisplay();

donationButton.addEventListener('click', function() {
    toggleVisibility('donationSection', 'historySection', donationButton);
});

historyButton.addEventListener('click', function() {
    toggleVisibility('historySection', 'donationSection', historyButton);
    displayHistory();
});


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

function updateAccountBalance(amount) {
    accountBalance -= amount;
    updateAccountBalanceDisplay();
}

function updateAccountBalanceDisplay() {
    accountBalanceDisplay.textContent = accountBalance + " BDT";
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

    updateAccountBalance(donationAmount);
    currentAmount += donationAmount;
    currentAmountElem.textContent = currentAmount + " BDT";
    addToHistory(donationTitle, donationAmount);
    donationInput.value = '';

    modal.showModal();
}


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
        historyList.innerHTML = '';
    }
}

function highlightActiveButton(activeButton) {
    let buttons = [donationButton, historyButton];
    for (const button of buttons) {
        button.classList.toggle('bg-[#B4F461]', button === activeButton);
        button.classList.toggle('btn-outline', button !== activeButton);
    }
}
