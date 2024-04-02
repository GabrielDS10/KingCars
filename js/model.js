var cardBox = document.querySelector('.boxCard');
const linkLogin = document.querySelector('.linkLogin');
const linkRegister = document.querySelector('.linkRegister');

const btnLogin = document.querySelector('.btnLogin');

const btnClose = document.querySelector('.iconClose');

const pesq = document.getElementById('pesq');




linkRegister.addEventListener('click', () => {
    cardBox.classList.add('actived')
    
})

linkLogin.addEventListener('click', () => {
    cardBox.classList.remove('actived')
    
})

btnLogin.addEventListener('click', () => {
    cardBox.classList.add('activeCard')
    
})

btnClose.addEventListener('click', () => {
    cardBox.classList.remove('activeCard')
    
})