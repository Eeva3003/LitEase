document.addEventListener('DOMContentLoaded', function () {
    const textContainer = document.getElementById('textContainer');
    const wordMeaning = document.getElementById('wordMeaning');
    let activeWord = null;

    // Sample textual data
    const textData = "The quick brown fox jumps over the lazy dog. This is an example text with more content. Click on individual words to see their meanings. You can explore the richness of language and enhance your vocabulary using this interactive feature.";

    // Split the text into words
    const words = textData.split(/\s+/);

    // Display the text with clickable words
    textContainer.innerHTML = words.map(word => `<span class="clickable">${word}</span>`).join(' ');

    // Add click event listener to each word
    const clickableWords = document.querySelectorAll('.clickable');
    clickableWords.forEach(word => {
        word.addEventListener('click', async function () {
            const wordText = this.textContent;
            if (activeWord) {
                activeWord.classList.remove('activated');
            }
            activeWord = this;
            activeWord.classList.add('activated');

            try {
                const meaning = await getWordMeaningFromAPI(wordText);
                showWordMeaning(this, meaning);
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching meaning: ' + error.message);
            }
        });
    });
});

// Event listener to detect when a word is highlighted in the PDF
document.addEventListener('mouseup', async function(event) {
    const highlightedText = window.getSelection().toString().trim();
    
    if (highlightedText) {
        try {
            // Make a request to the dictionary API via RapidAPI
            const apiKey = '9355d3fe39mshb2925105f16f430p1b9ee5jsnb63c22b99b18';
            const apiUrl = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${encodeURIComponent(highlightedText)}`;
            const headers = {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
            };

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers
            });
            console.log(response);

            // if (!response.ok) {
            //     throw new Error('Error fetching meaning');
            // }

            const data = await response.json();
            console.log(response);
            if (Array.isArray(data) && data.length > 0) {
                const meaning = data[0]?.definitions?.map(definition => definition.definition).join('; ');
                alert(`Meaning of '${highlightedText}': ${meaning}`);
            } else {
                alert(`Meaning of '${highlightedText}' not found`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching meaning');
        }
    }
});

async function getWordMeaningFromAPI(word) {
    const apiKey = '9355d3fe39mshb2925105f16f430p1b9ee5jsnb63c22b99b18';
    const apiUrl = `http://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${encodeURIComponent(word)}`;
    const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
    };

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers
    });
console.log(response);
    if (!response.ok) {
        throw new Error('Error fetching meaning');
    }

    const data = await response.json();

    console.log(response);
    if (Array.isArray(data) && data.length > 0) {
        const meaning = data[0]?.definitions?.map(definition => definition.definition).join('; ');
        return meaning;
    } else {
        throw new Error('Meaning not found');
    }
}

function showWordMeaning(element, meaning) {
    // Implement your code to show word meaning in a dialogue box or any other UI element
}

/*document.addEventListener('DOMContentLoaded', function () {
    const textContainer = document.getElementById('textContainer');
    const wordMeaning = document.getElementById('wordMeaning');
    let activeWord = null;

    // Sample textual data
    const textData = "The quick brown fox jumps over the lazy dog. This is an example text with more content. Click on individual words to see their meanings. You can explore the richness of language and enhance your vocabulary using this interactive feature.";

    // Split the text into words
    const words = textData.split(/\s+/);

    // Display the text with clickable words
    textContainer.innerHTML = words.map(word => `<span class="clickable">${word}</span>`).join(' ');

    // Add click event listener to each word
    const clickableWords = document.querySelectorAll('.clickable');
    clickableWords.forEach(word => {
        word.addEventListener('click', async function () {
            const wordText = this.textContent;
            if (activeWord) {
                activeWord.classList.remove('activated');
            }
            activeWord = this;
            activeWord.classList.add('activated');

            try {
                const meaning = await getWordMeaningFromAPI(wordText);
                showWordMeaning(this, meaning);
            } catch (error) {
                console.error('Error fetching meaning:', error.message);
            }
        });
    });
    // Event listener to detect when a word is highlighted in the PDF
document.addEventListener('mouseup', async function(event) {
    const highlightedText = window.getSelection().toString().trim();
    
    if (highlightedText) {
        try {
            // Make a request to the dictionary API via RapidAPI
            const apiKey = '9355d3fe39mshb2925105f16f430p1b9';
            const apiUrl = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${encodeURIComponent(highlightedText)}`;
            const headers = {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
            };

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Error fetching meaning');
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const meaning = data[0]?.definitions?.map(definition => definition.definition).join('; ');
                alert(`Meaning of '${highlightedText}': ${meaning}`);
            } else {
                alert(`Meaning of '${highlightedText}' not found`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching meaning');
        }
    }
});

    // Function to get word meaning from the API
async function getWordMeaningFromAPI(word) {
        const apiUrl = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${encodeURIComponent(word)}`;

        try {
            const headers = {
                'X-RapidAPI-Key': "a936cc43afmsh69a8e457c98b7ccp1ce434jsn335218fd249d",
                'X-RapidAPI-Host': "twinword-word-graph-dictionary.p.rapidapi.com"
            };
        
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers
            });
        
            if (response.ok) {
                const data = await response.json();
                // Assuming the API response structure
                const meanings = data[0]?.definitions?.map(definition => definition.definition);
                return meanings ? meanings.join('; ') : 'Meaning not found';
            } else {
                console.error('Error fetching meaning:', response.statusText);
                return 'Error fetching meaning';
            }
        } catch (error) {
            console.error('Error fetching meaning:', error.message);
            return 'Error fetching meaning';
        }
    }

    // Function to show word meaning in a dialogue box
    function showWordMeaning(element, meaning) {
        const rect = element.getBoundingClientRect();
        wordMeaning.style.top = `${rect.top - 40}px`;
        wordMeaning.style.left = `${rect.left}px`;

        wordMeaning.textContent = meaning;
        wordMeaning.style.display = 'block';

        // Hide the meaning after a delay (adjust as needed)
        setTimeout(() => {
            wordMeaning.style.display = 'none';
        }, 3000);
    }
});*/

