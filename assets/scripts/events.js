const button = document.querySelector('button');
const form = document.querySelector('form');
const div = document.querySelector('div');
const listItems = document.querySelectorAll('li');
const list = document.querySelector('ul');

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
    event.stopPropagation();
    console.log('button');
    console.log(event);
});

div.addEventListener('click', event => {
    console.log('div')
    console.log(event);
});

// listItems.forEach(listItem => {
//     listItem.addEventListener('click', event => {
//         event.target.classList.toggle('highlight');
//     });
// });

list.addEventListener('click', event => {
    console.log(event.currentTarget);
    event.target.classList.toggle('highlight');
});