const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'ru', 'uz'],
    defaultLocale: 'uz',
  },
  localePath: path.resolve('./public/locales'),
};
