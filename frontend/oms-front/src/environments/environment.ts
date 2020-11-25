
//const host = (<any>window).host;
//Endpoint servicios
//const hostSeguridad = 'http://localhost:9092';
const hostApiGateway = 'http://localhost:9092';

//Variables Aplicacion
const clientId = '89792737-705f-4358-a95b-744962644de4';
const clientSecret = '0b78c28e-6abc-4252-85d1-214da95bc6ca';
const grant_type = 'refresh_token';

export const environment = {
  production: false,
  login_endpoint: `${hostApiGateway}/uua/oauth/token`,
  createUser_endpoint: `${hostApiGateway}/registry/users`,
  searchUser_endpoint: `${hostApiGateway}/security/users`,
  clientId_variable: `${clientId}`,
  clientSecret_variable: `${clientSecret}`,
  grant_type_variable: `${grant_type}`,
  createimage_variable: `${hostApiGateway}/images/cmd`,
  createProduct_variable: `${hostApiGateway}/products/cmd`,
  searchProduct_endpoint: `${hostApiGateway}/products/qrs`,
  createCampaign_variable: `${hostApiGateway}/campaigns/cmd`,
  searchCampaign_endpoint: `${hostApiGateway}/campaigns/qrs`,
};