
//const host = (<any>window).host;
//Endpoint servicios
//const hostSeguridad = 'http://localhost:9092';
const hostApiGateway = 'http://10.39.1.85:9092';



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
  createimage_endpoint: `${hostApiGateway}/images/cmd`,
  createProduct_endpoint: `${hostApiGateway}/products/cmd`,
  searchProduct_endpoint: `${hostApiGateway}/products/qrs`,
  createCampaign_endpoint: `${hostApiGateway}/campaigns/cmd`,
  searchCampaign_endpoint: `${hostApiGateway}/campaigns/qrs`,
  searchOrder_endpoint: `${hostApiGateway}/orders/qrs`,
  cancelOrder_endpoint: `${hostApiGateway}/orders/cmd`,
  createVendor_endpoint: `${hostApiGateway}/vendors/cmd`,
  searchVendor_endpoint: `${hostApiGateway}/vendors/qrs`,
  cancelOrderBPM_endpoint: `${hostApiGateway}/bpm/cancel`
};
