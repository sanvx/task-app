import { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "http", hostname: "**" },
            { protocol: "https", hostname: "**" }
        ]
    },
    experimental: {
        appDir: false
    }
};

export default nextConfig;