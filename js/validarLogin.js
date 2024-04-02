function entrar(){
   
    let email = document.getElementById('email');
    let emailLabel = document.getElementById('emailLog');
    let borderEmail = document.querySelector('.inputBox')
    let iconEmailL = document.querySelector('.bi.bi-envelope-fill')

    let password = document.getElementById('senhaLogin')
    let senhaLabel = document.getElementById('senhaLog');
    let borderSenha = document.getElementById('password')
    let senhaIconL = document.querySelector('ion-icon[name="lock"]');


    let msgError = document.getElementById('msgError')

    let listaUsers = [];


    let validUser = {
        usuario:'',
        email:'',
        senha:''
    }

        listaUsers = JSON.parse(localStorage.getItem('userList'))

        listaUsers.forEach((item) => {
            
        
        if( email.value === item.emailCad && password.value === item.senhaCad){
            validUser = {
                usuario: item.userCad,
                email: item.emailCad,
                senha: item.senhaCad
            }
        }
    });


    if( email.value !== ''){
        if (email.value === validUser.email ) {
            emailLabel.setAttribute('style', 'color:green')
            borderEmail.setAttribute('style', 'border-color: green')
            iconEmailL.setAttribute('style', 'color:green')
            
        } else {
            emailLabel.setAttribute('style', 'color:red')
            borderEmail.setAttribute('style', 'border-color: red')
            iconEmailL.setAttribute('style', 'color:red')
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = 'Email ou senha incorretos!'

        }
    } else {
        // alert('preencha todos os campos corretamente!')
        emailLabel.setAttribute('style', 'color:red')
        borderEmail.setAttribute('style', 'border-color: red')
        iconEmailL.setAttribute('style', 'color:red')

       
    }

    if( password.value !== ''){
        if (password.value === validUser.senha) {

            let token = Math.random().toString(16).substring(2)+Math.random().toString(16).substring(2)
             localStorage.setItem('token', token)

             setTimeout(() =>{
                 window.location.href = "file:///C:/Users/Nog/Desktop/buyCars/interface/estoqueCars.html?";
             }, 3000)
            senhaLabel.setAttribute('style', 'color:green')
            borderSenha.setAttribute('style', 'border-color: green')
            senhaIconL.setAttribute('style', 'color:green')
            msgError.setAttribute('style', 'display: block; background: #bbffbe; color: green' )
            msgError.innerHTML = ' Logando usuario...'

        } else {
        senhaLabel.setAttribute('style', 'color:red')
        borderSenha.setAttribute('style', 'border-color: red')
        senhaIconL.setAttribute('style', 'color:red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = ' Email ou senha incorretos!'


       

        }
    } else {
        // alert('preencha todos os campos corretamente!')
        senhaLabel.setAttribute('style', 'color:red')
        borderSenha.setAttribute('style', 'border-color: red')
        senhaIconL.setAttribute('style', 'color:red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Preencha todos os campos e tente novamente'

       
    }
    
    //    console.log(validUser);
      

      
}