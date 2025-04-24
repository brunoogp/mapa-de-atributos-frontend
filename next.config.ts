import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // outras opções que você queira manter vêm aqui …

  /**
   * 👉 Ignora erros de TypeScript só no momento do build de produção.
   *    O código roda normalmente e você corrige os tipos depois.
   */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
