
await import("./env.mjs")

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["firebase"],
        serverActions: true,
    },
    images: {
        domains: ["upload.wikimedia.org", "firebasestorage.googleapis.com", "lh3.googleusercontent.com", "encrypted-tbn0.gstatic.com"],
    }

}

export default nextConfig
