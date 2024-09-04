import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/es/auth/login',
          permanent: false,
        },
      ];
    },
  };
 
export default withNextIntl(nextConfig);