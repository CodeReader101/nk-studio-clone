/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      "*.{glsl,vert,frag,vs,fs,wgsl}": {
        loaders: ["raw-loader"], // treat shader files as raw strings
        as: "*.js", // emitted as JS string module
      },
    },
  },
};

export default nextConfig;
