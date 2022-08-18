import { User } from './types/User';

const baseUrl = 'http://localhost:8001';
const users = `${baseUrl}/users`;
const signIn = `${baseUrl}/signin`;

export const creteUser = async (user:User):Promise<Response> => {
  const response = await fetch(
    `${users}`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};

export const signInUser = async (user:User):Promise<Response> => {
  console.log(user);
  const response = await fetch(
    `${signIn}`,
    {
      method: 'POST',
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};
