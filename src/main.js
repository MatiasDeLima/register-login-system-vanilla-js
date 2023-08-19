// Codigo simple feito por mim 
// vou fazer uma melhora em outra pagina

const registerDados = {
    users: JSON.parse(localStorage.getItem('users')) || [],

    criaUser(dados) {
        registerDados.users.push({
            name: dados.name,
            email: dados.email,
            password: dados.password
        });

        localStorage.setItem('users', JSON.stringify(registerDados.users))

        setTimeout(() => {
            location.href = 'login.html'
        }, 3000);
    }
};

const form = document.getElementById('register-form'),
    userName = document.getElementById('user-input'),
    email = document.getElementById('email-input'),
    password = document.getElementById('password-input'),
    emailError = document.getElementById('email-error')

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Verifica se o email já existe na lista de usuários
        const userExists = registerDados.users.some(user => user.email === email.value);
        if (userExists) {
            emailError.textContent = 'Este email já está em uso.';
            return; // esse retorn impede o submit()
        } else {
            emailError.textContent = '';
        }

        registerDados.criaUser({ name: userName.value, email: email.value, password: password.value });

        userName.value = ''
        email.value = ''
        password.value = ''

        // console.log(registerDados.users)
    });
}

const loginForm = document.getElementById('login-form'),
    loginError = document.getElementById('login-error')

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();


        const loginEmail = document.getElementById('login-email').value
        const loginPassword = document.getElementById('login-password').value
        let validaLogin = false

        for (let i in registerDados.users) {
            if (loginEmail == registerDados.users[i].email && loginPassword == registerDados.users[i].password) {
                validaLogin = true
                break;
            }
        }

        if (validaLogin) {
            location.href = 'index.html'
        } else {
            loginError.textContent = 'Esse usuario nao existe';
        }

    })
}
