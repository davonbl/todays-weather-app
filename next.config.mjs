import dotenv from 'dotenv'
dotenv.config()
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_IP_API_BASE_URL: process.env.NEXT_PUBLIC_IP_API_BASE_URL,
        NEXT_PUBLIC_WEATHER_API_BASE_URL: process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL,
        WEATHER_API_KEY: process.env.WEATHER_API_KEY,
        IP_API_KEY: process.env.IP_API_KEY

    },
    images: {
        remotePatterns:[
        {     
            protocol: 'https',
            hostname: 'cdn.weatherapi.com',
            port: '',
            pathname: '**',
            search: '',
            }
        ] 
    } 
};

export default nextConfig;
