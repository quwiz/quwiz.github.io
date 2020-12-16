const REDIRECT_URL = 'https://quwiz.github.io/home';
const LOGOUT_URL = 'https://quwiz.github.io/home';

export const environment = {
  production: true,
  API_SERVER: 'https://16li335nt1.execute-api.ap-northeast-1.amazonaws.com',

  CLIENT_ID: '6ua26dh6usg18plunc86fe2254',
  CLIENT_SECRET: '1hgvg4lfcga9tefg4jnheuib8c2knl0l2kfn8kjmie6tgtrrfq4e',
  API_BASE_URL: 'https://16li335nt1.execute-api.ap-northeast-1.amazonaws.com',
  LOGIN_URL: 'https://quwiz.auth.ap-northeast-1.amazoncognito.com/login?' +
              'client_id=6ua26dh6usg18plunc86fe2254&response_type=code&scope=openid+profile&' +
              `redirect_uri=${REDIRECT_URL}`,

  REDIRECT_URL: (REDIRECT_URL),

  COGNITO_TOKEN_URL: 'https://quwiz.auth.ap-northeast-1.amazoncognito.com/oauth2/token',

  LOGOUT_URL: 'https://quwiz.auth.ap-northeast-1.amazoncognito.com/logout?' +
          'client_id=6ua26dh6usg18plunc86fe2254&' +
          `logout_uri=${LOGOUT_URL}`
};
