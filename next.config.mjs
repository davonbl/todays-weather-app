import dotenv from 'dotenv'
dotenv.config()
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        WEATHER_API_KEY: process.env.WEATHER_API_KEY
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
