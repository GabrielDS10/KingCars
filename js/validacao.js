   //conf para cadastro

let user = document.getElementById('user');
let userLabel = document.getElementById('userLabel');
let validUser = false

let email = document.getElementById('emailCad');
let emailLabel = document.getElementById('emailLabel');
let validEmail = false

let senha = document.getElementById('senha');
let senhaLabel = document.getElementById('senhaLabel');
let validSenha = false

let inputBox = document.querySelector('div#color');
let colorSenha = document.querySelector('div#colorSenha');
let inputEmail = document.querySelector('div#colorEmail');

let userIcon = document.querySelector('.bi.bi-person-fill');
let emailIcon = document.querySelector('ion-icon[name="mail"]');
let lockIcon = document.querySelector('.bi.bi-lock-fill');


let msgError = document.getElementById('error')
let msgSuccess = document.getElementById('success')

let boxCard = document.querySelector('.boxCard');

//eventos

user.addEventListener('keyup', () => {
    if(user.value.length <= 6){
        userLabel.setAttribute('style', 'color:red')
        userLabel.innerHTML = 'Usuario <sub>deve ter no minimo 6 caracteres<sub>'
        inputBox.setAttribute('style', 'border-color: red');
        userIcon.setAttribute('style', 'color:red')
        validUser = false;
    }
    else{
        userLabel.setAttribute('style', 'color:green')
        userLabel.innerHTML = 'Usuario'
        inputBox.setAttribute('style', 'border-color: green')
        userIcon.setAttribute('style', 'color:green')
        validUser = true;

    }
})

email.addEventListener('keyup', () => {
    if(email.value.length <= 6){
        emailLabel.setAttribute('style', 'color: red')
        emailLabel.innerHTML = 'Email deve ter no minimo 6 caracteres'
        inputEmail.setAttribute('style', 'border-color: red');
        emailIcon.setAttribute('style', 'color:red')
        validEmail = false
    }
    else{
        emailLabel.setAttribute('style', 'color:green')
        emailLabel.innerHTML = 'email'
        inputEmail.setAttribute('style', 'border-color: green')
        emailIcon.setAttribute('style', 'color:green')
        validEmail = true

    }
})

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 7){
        senhaLabel.setAttribute('style', 'color:red')
        senhaLabel.innerHTML = 'Usuario <sub>deve ter no minimo 8 caracteres<sub>'
        colorSenha.setAttribute('style', 'border-color: red');
        lockIcon.setAttribute('style', 'color:red')
        validSenha = false
    }
    else{
        senhaLabel.setAttribute('style', 'color:green')
        senhaLabel.innerHTML = 'Usuario'
        colorSenha.setAttribute('style', 'border-color: green')
        lockIcon.setAttribute('style', 'color:green')
        validSenha = true

    }
})

// eventos



function cadastro(){
    if(validUser && validEmail && validSenha){

        let userList = JSON.parse(localStorage.getItem('userList') || '[]');

        userList.push(
            {
                userCad: user.value,
                emailCad: email.value,
                senhaCad: senha.value
            }
        )

            localStorage.setItem('userList', JSON.stringify(userList));

        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerHTML = 'Cadastrando usuario...';
        msgError.setAttribute('style', 'display: none');

        setTimeout(() =>{
            window.location.href = "file:///C:/Users/Nog/Desktop/buyCars/interface/adminTela.html?";
        }, 3000)


    }else{
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Ops verifique os campos e tente novamente';
        msgSuccess.setAttribute('style', 'display: none');
    }
}

