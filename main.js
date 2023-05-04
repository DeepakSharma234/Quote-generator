const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

//SHOW LOADING
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//HIDE LOADING
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true; 
}

// Show new quotes

function newQuotes(){
    loading();
    // Pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    
    //Check if Author field is black and replace it with "Unknown"
    if(!quote.author){
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }

    //Check Quote length to determine styling

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //SET QUOTE HIDE LOADER
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes from API

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    }catch(error){

    }
}



//Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} : ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listeners

newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// ON LOAD
getQuotes()


// --------------------------------------------------------------------------------------
// USING LOCAL QUOTES AVAILABLE LOCALLY IN ANOTHER FILE
// function newQuote(){
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }



// newQuote()
// -----------------------------------------------------------------------------------------
