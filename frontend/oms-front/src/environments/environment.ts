
//const host = (<any>window).host;
//Endpoint servicios
//const hostSeguridad = 'http://localhost:9092';
const HOST_API_GATEWAY = 'http://10.39.1.85:9092';

//Variables Aplicacion
const clientId = '89792737-705f-4358-a95b-744962644de4';
const clientSecret = '0b78c28e-6abc-4252-85d1-214da95bc6ca';
const grant_type = 'refresh_token';

export const environment = {
  production: false,
  login_endpoint: `${HOST_API_GATEWAY}/uua/oauth/token`,
  createUser_endpoint: `${HOST_API_GATEWAY}/registry/users`,
  searchUser_endpoint: `${HOST_API_GATEWAY}/security/users`,
  clientId_variable: `${clientId}`,
  clientSecret_variable: `${clientSecret}`,
  grant_type_variable: `${grant_type}`,
  createimage_endpoint: `${HOST_API_GATEWAY}/images/cmd`,
  createProduct_endpoint: `${HOST_API_GATEWAY}/products/cmd`,
  searchProduct_endpoint: `${HOST_API_GATEWAY}/products/qrs`,
  createCampaign_endpoint: `${HOST_API_GATEWAY}/campaigns/cmd`,
  searchCampaign_endpoint: `${HOST_API_GATEWAY}/campaigns/qrs`,
  searchOrder_endpoint: `${HOST_API_GATEWAY}/orders/qrs`,
  cancelOrder_endpoint: `${HOST_API_GATEWAY}/orders/cmd`,
  createVendor_endpoint: `${HOST_API_GATEWAY}/vendors/cmd`,
  searchVendor_endpoint: `${HOST_API_GATEWAY}/vendors/qrs`,
  cancelOrderBPM_endpoint: `${HOST_API_GATEWAY}/bpm/cancel`
};
