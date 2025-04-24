/** @type {import('next').NextConfig} */
module.exports = {
  // ignora erros de tipagem na transpilação
  typescript: { ignoreBuildErrors: true },

  // ignora QUALQUER erro do ESLint durante o build
  eslint: { ignoreDuringBuilds: true },
};
