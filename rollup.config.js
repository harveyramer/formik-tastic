import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json'

const rollupConfig = {
  input: './src/react-library/index.tsx',
  "output": {
    "file": "lib/index.js",
    "format": "esm",
    "sourcemap": true
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
  ],
};

export default rollupConfig;