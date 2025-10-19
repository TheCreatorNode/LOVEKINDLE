
const form = document.getElementById('flamesForm');
const resultDiv = document.getElementById('result');
const resetBtn = document.querySelector('.btn-reset');

const flamesData = {
    F: { 
        meaning: "Friends", 
        icon: "👫",
        description: "You two are destined to be great friends! A bond built on trust and laughter."
    },
    L: { 
        meaning: "Lovers", 
        icon: "💑",
        description: "Love is in the air! You two share a romantic connection that's meant to be."
    },
    A: { 
        meaning: "Admirers", 
        icon: "😍",
        description: "There's mutual admiration here! You both appreciate each other's qualities."
    },
    M: { 
        meaning: "Marriage", 
        icon: "💍",
        description: "Wedding bells are ringing! This relationship is heading towards forever."
    },
    E: { 
        meaning: "Enemies", 
        icon: "⚔️",
        description: "Opposites attract... or repel! There's definitely strong energy between you two."
    },
    S: { 
        meaning: "Secret Admirers", 
        icon: "🤫",
        description: "Someone has a secret crush! Hidden feelings are waiting to be revealed."
    }
};

// Calculate FLAMES
function calculateFlames(name1, name2) {
    // Convert to lowercase and remove spaces
    let processedName1 = name1.toLowerCase().replace(/\s+/g, '');
    let processedName2 = name2.toLowerCase().replace(/\s+/g, '');
    
    // Remove common characters
    for (let char of name1.toLowerCase().replace(/\s+/g, '')) {
        if (processedName2.includes(char)) {
            processedName1 = processedName1.replace(char, '');
            processedName2 = processedName2.replace(char, '');
        }
    }
    
    // Count remaining letters
    const count = processedName1.length + processedName2.length;
    
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
    document.querySelector('.result-description').textContent = 
        flamesResult.isPerfectMatch 
            ? "🎉 Perfect Match! You two are absolutely meant for each other!" 
            : data.description;
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
