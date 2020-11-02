
//const host = (<any>window).host;

const hostSeguridad = 'http://localhost:9092';

export const environment = {
  production: false,
  login_endpoint: `${hostSeguridad}/uua/oauth/token`,
  createUser_endpoint: `${hostSeguridad}/registry/users`
};

