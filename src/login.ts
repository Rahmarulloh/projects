import './index';
import './tabledata';
import './search';
import { Auth } from './services';
import { init } from './index';

const mainContainerBody = document.querySelector('#mainContainerBody') as HTMLDivElement;
const btnLogin = document.querySelector('#btnLogin') as HTMLAnchorElement;
console.log(btnLogin);
btnLogin.addEventListener('click', async () => {
  mainContainerBody.innerHTML = ``;
  createLoginForm();
  
  const loginBtn = document.querySelector('#login');
  const registerEmail = document.querySelector('#email') as HTMLInputElement;
  const registerPassword = document.querySelector('#password') as HTMLInputElement;
  
  loginBtn.addEventListener('click', async () => {
    const token = await login(registerEmail.value, registerPassword.value);
    const user = await Auth.Me(token);
    console.log('user = ', user);
    console.log(await init());
  });

  console.log(loginBtn);
});

function createLoginForm(): string {
  mainContainerBody.innerHTML = ``;
  const h1Tag = document.createElement('h3') as HTMLHeadingElement;
  h1Tag.textContent = 'Login';

  const input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('placeholder', 'Your Username');
  input1.setAttribute('class', 'form-control my-3 shadow-none');
  input1.setAttribute('id', 'email');

  const input2 = document.createElement('input');
  input2.setAttribute('type', 'password');
  input2.setAttribute('placeholder', 'Your Password');
  input2.setAttribute('class', 'form-control my-3 shadow-none');
  input2.setAttribute('id', 'password');

  const btn = document.createElement('button');
  btn.textContent = 'Login';
  btn.setAttribute('type', 'button');
  btn.className = 'btn btn-primary';
  btn.id = 'login';

  const container = document.createElement('div');
  container.appendChild(h1Tag);
  container.appendChild(input1);
  container.appendChild(input2);
  container.appendChild(btn);
  mainContainerBody.appendChild(container);

  return container.innerHTML;
}

async function init2() {}

async function login(email: string, password: string) {
  const token = await Auth.Login({ email, password });
  console.log('token = ', token);
  return token;
}
