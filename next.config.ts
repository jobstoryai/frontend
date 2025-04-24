import { NextConfig } from 'next'; 

const nextConfig: NextConfig = {
  transpilePackages: [
    "rc-util",
    "rc-picker",
    "rc-pagination",
    "@ant-design/icons-svg",
  ],
};

export default nextConfig;
