module.exports = {
  i18n: {
    locales: ['en', 'ru', 'uz'], // Supported languages
    defaultLocale: 'uz', // Default language
    localeDetection: true, // Automatically detect user locale
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pc.repid.uz',
      },
    ],
  },
};
