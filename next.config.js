/** @type {import('next').NextConfig} */
module.exports = {
  // ‼️ esta linha desliga a trava nos erros de tipos no build
  typescript: {
    ignoreBuildErrors: true,
  },
};
