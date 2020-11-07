
//const host = (<any>window).host;
//Endpoint servicios
const hostSeguridad = 'http://localhost:9092';

//Variables Aplicacion
const clientId = '89792737-705f-4358-a95b-744962644de4';
const clientSecret = '0b78c28e-6abc-4252-85d1-214da95bc6ca';


export const environment = {
  production: false,
  login_endpoint: `${hostSeguridad}/uua/oauth/token`,
  createUser_endpoint: `${hostSeguridad}/registry/users`,
  clientId_variable: `${clientId}`,
  clientSecret_variable: `${clientSecret}`
};

