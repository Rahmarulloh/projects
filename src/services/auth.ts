import * as Mappers from '../mappers';
import { IForm } from '../types';

const baseURL = 'http://localhost:4000/api';

export const Register = async (form: IForm.Auth.Register) => {
  const body = JSON.stringify(form);
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(`${baseURL}/users`, { method: 'POST', body, headers });
  const data = await res.json();
  const user = Mappers.User(data);

  return user;
};

export const Login = async (form: IForm.Auth.Login) => {
  const body = JSON.stringify(form);
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(`${baseURL}/auth`, { method: 'POST', body, headers });
  const data = await res.json();
  const token = data.data;
  console.log(data);

  return token;
};

export const Me = async (token: string) => {
  const res = await fetch(`${baseURL}/users/me`, { headers: { 'x-auth-token': token } });
  const data = await res.json();

  const user = Mappers.User(data);
  return user;
};
