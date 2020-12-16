// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const REDIRECT_URL = 'http://localhost:4200/home';
const LOGOUT_URL = 'http://localhost:4200/home';

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
