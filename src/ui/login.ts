import { Auth } from '../services';
export const btnLogin = document.querySelector('#btnLogin') as HTMLAnchorElement;
export const mainContainerBody = document.querySelector('#mainContainerBody') as HTMLDivElement;

function createInputElement(type: string, placeholder: string, id: string): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.className = 'form-control my-3 shadow-none';
  input.id = id;
  return input;
}

export function createLoginForm(): string {
  mainContainerBody.innerHTML = ``;
  const h1Tag = document.createElement('h3') as HTMLHeadingElement;
  h1Tag.textContent = 'Login';

  const input1 = createInputElement('text', 'Your Username', 'email');

  const input2 = createInputElement('password', 'Your Password', 'password');

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

export async function login(email: string, password: string) {
  const token = await Auth.Login({ email, password });
  console.log('token = ', token);
  return token;
}
