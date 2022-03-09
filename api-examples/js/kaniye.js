const loadWuotes = () => {
    fetch('https://api.kanye.rest/')
        .then(res => res.json())
        .then(data => displayQuate(data));
}

const displayQuate = quote => {
    const quateElement = document.getElementById('quote');
    quateElement.innerText = quote.quote;
    // console.log(quote)
} 