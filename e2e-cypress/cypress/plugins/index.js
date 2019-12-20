// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path');
module.exports = (on, config) => {
  // eslint-disable-next-line consistent-return
  on('before:browser:launch', (browser = {}, args) => {
      console.log(config, browser, args);
      if (browser.name === 'chrome') {
        const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');
        args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
        args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
      }
      return args; 
  });

};
