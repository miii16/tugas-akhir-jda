import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // contoh, sesuaikan

export const authOptions: NextAuthOptions = {
  providers: [GitHubProvider({ clientId: "...", clientSecret: "..." })],
  // konfigurasi lainnya
};
