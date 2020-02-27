const button = document.querySelector('button');
const form = document.querySelector('form');
const div = document.querySelector('div');

const btnHandler = function () {
    alert('Click');
};

// button.addEventListener('click', btnHandler);

// setTimeout(() => {
//     button.removeEventListener('click', btnHandler);
// }, 2000);


form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('form');
    console.log(event);
});

button.addEventListener('click', event => {
    console.log('button');
    console.log(event);
});

div.addEventListener('click', event => {
    console.log('div')
    console.log(event);
});