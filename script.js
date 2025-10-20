
const form = document.getElementById('flamesForm');
const resultDiv = document.getElementById('result');
const resetBtn = document.querySelector('.btn-reset');

const flamesData = {
    F: {
        meaning: "Friends",
        icon: "👫",
    },
    L: {
        meaning: "Lovers",
        icon: "💑",
    },
    A: {
        meaning: "Admirers",
        icon: "😍",
    },
    M: {
        meaning: "Marriage",
        icon: "💍",
    },
    E: {
        meaning: "Enemies",
        icon: "⚔️",
    },
    S: {
        meaning: "Secret Admirers",
        icon: "🤫",
    }
};

// Calculate FLAMES
function calculateFlames(name1, name2) {
    // Convert to lowercase and remove spaces
    let user = name1.toLowerCase().replace(/\s+/g, '');
    let crush = name2.toLowerCase().replace(/\s+/g, '');

    // Remove common characters
    for (let char of user.toLowerCase().replace(/\s+/g, '')) {
        if (crush.includes(char)) {
            user = name1.replace(char, '');
            crush = name2.replace(char, '');
        }
    }

    // Count remaining letters
    const count = user.length + crush.length;

    // Handle perfect match (count = 0)
    if (count === 0) {
        return {
            result: 'L',
            isPerfectMatch: true
        };
    }

    // Calculate FLAMES result
    const FLAMES = ["F", "L", "A", "M", "E", "S"];
    const index = (count - 1) % FLAMES.length;

    return {
        result: FLAMES[index],
        isPerfectMatch: false
    };
}

// Display result
function displayResult(name1, name2, flamesResult) {
    const data = flamesData[flamesResult.result];


    document.querySelector('.result-icon').textContent = data.icon;
    document.querySelector('.result-title').textContent = data.meaning;
    document.querySelector('.result-names').innerHTML =
        `<strong>${name1}</strong> 💘 <strong>${name2}</strong>`;


    document.querySelector('.card').style.display = 'none';
    resultDiv.classList.remove('hidden');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userName = document.getElementById('userName').value.trim();
    const crushName = document.getElementById('crushName').value.trim();

    if (!userName || !crushName) {
        alert('Please enter both names!');
        return;
    }

    if (userName.length < 2 || crushName.length < 2) {
        alert('Names must be at least 2 characters long!');
        return;
    }

    const flamesResult = calculateFlames(userName, crushName);
    displayResult(userName, crushName, flamesResult);
});

resetBtn.addEventListener('click', () => {

    form.reset();

    resultDiv.classList.add('hidden');
    document.querySelector('.card').style.display = 'block';
});
