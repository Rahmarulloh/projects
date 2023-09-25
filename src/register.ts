import './index';
import './tabledata';
import './search';
import { Auth } from './services';

export const mainContainerBody = document.querySelector('#mainContainerBody') as HTMLDivElement;
export const btnRegister = document.querySelector('#btnRegister') as HTMLAnchorElement;

btnRegister.addEventListener('click', () => {
  mainContainerBody.innerHTML = ``;
  console.log(btnRegister);
  createRegisterForm();

  const registerBtn = document.querySelector('#register');
  const registerName = document.querySelector('#name') as HTMLInputElement;
  const registerEmail = document.querySelector('#email') as HTMLInputElement;
  const registerPassword = document.querySelector('#password') as HTMLInputElement;

  registerBtn.addEventListener('click', () => {
    registerUser(registerEmail.value, registerPassword.value, registerName.value);
  });

  console.log(registerBtn);
});

function createRegisterForm(): string {
  mainContainerBody.innerHTML = ``;
  const h1Tag = document.createElement('h3') as HTMLHeadingElement;
  h1Tag.textContent = 'Register';

  const input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('placeholder', 'Your Username');
  input1.setAttribute('class', 'form-control my-3 shadow-none');
  input1.setAttribute('id', 'name');

  const input2 = document.createElement('input');
  input2.setAttribute('type', 'email');
  input2.setAttribute('placeholder', 'Your Email');
  input2.setAttribute('class', 'form-control my-3 shadow-none');
  input2.setAttribute('id', 'email');

  const input3 = document.createElement('input');
  input3.setAttribute('type', 'password');
  input3.setAttribute('placeholder', 'Your Password');
  input3.setAttribute('class', 'form-control my-3 shadow-none');
  input3.setAttribute('id', 'password');

  const btn = document.createElement('button');
  btn.textContent = 'Register';
  btn.setAttribute('type', 'button');
  btn.className = 'btn btn-primary';
  btn.setAttribute('id', 'register');

  const container = document.createElement('div');
  container.appendChild(h1Tag);
  container.appendChild(input1);
  container.appendChild(input2);
  container.appendChild(input3);
  container.appendChild(btn);
  mainContainerBody.appendChild(container);

  return container.innerHTML;
}

async function registerUser(email: string, password: string, name: string) {
  const fake = {
    email: email,
    password: password,
    name: name
  };

  const newUser = await Auth.Register(fake);
  console.log('newUser = ', newUser);
}
