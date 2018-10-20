// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
 firebase: {
    apiKey: "AIzaSyBH-J_y2c9HfL4E2tFX80pob2FUwHdqMoc",
    authDomain: "pwa-banking-tt.firebaseapp.com",
    databaseURL: "https://pwa-banking-tt.firebaseio.com",
    projectId: "pwa-banking-tt",
    storageBucket: "pwa-banking-tt.appspot.com",
    messagingSenderId: "230097368996"
  }   
};
