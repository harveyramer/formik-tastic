import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from "rollup-plugin-postcss";
import inject from '@rollup/plugin-inject';
import pkg from './package.json';

let config;
if (process.env.NODE_ENV === 'test') {
  config = {
    plugins: [inject({ React: 'react' })],
  }
} else {
  config = {
    input: './src/react-library/index.tsx',
    "output": {
      "file": "./lib/index.js",
      "format": "umd",
      "name":"index",
      "sourcemap": true
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      typescript(),
      commonjs(),
      postcss({
        extensions: ['.css']
      }),
      inject({ React: 'react' }),
    ],
  };
}

export default config;