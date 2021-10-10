console.log('Client side loaded as js!!!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const firstParagraph = document.querySelector('#messageOne');
const secondParagraph = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const weatherLocation = search.value;

    firstParagraph.textContent = '';
    secondParagraph.textContent = 'Loading...';

    fetch(`http://localhost:3000/weather?address=${weatherLocation}`).then( response => {
    response.json().then( data => {
        if (data.error) {
        //    console.log(data.error)
            secondParagraph.textContent = data.error;
        }

        else {
/*             console.log(data.location)
            console.log(data.forecast) */
            firstParagraph.textContent = data.location;
            secondParagraph.textContent = data.forecast;
        }
    })
} )
})