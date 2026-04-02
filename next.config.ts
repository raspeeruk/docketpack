import type { NextConfig } from "next";
const config: NextConfig = {
  // No output: "export" — API routes need server-side execution
  trailingSlash: true,
};
export default config;
