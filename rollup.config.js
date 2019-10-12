import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import closure from '@ampproject/rollup-plugin-closure-compiler';
import pkg from './package.json';

let input = './src/unobtrusive.ts';
let plugins = [
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js', '.ts'],
  }),
  resolve({
    extensions: ['.js', '.ts'],
  }),
  commonjs(),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'Unobtrusive',
    },
    plugins: [...plugins, closure()],
  },
];
