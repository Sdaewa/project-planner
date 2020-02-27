const button = document.querySelector('button');
const form = document.querySelector('form');

const btnHandler = function () {
    alert('Click');
};

// button.addEventListener('click', btnHandler);

// setTimeout(() => {
//     button.removeEventListener('click', btnHandler);
// }, 2000);


form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
});

button.addEventListener('click', event => {
    console.log(event);
});