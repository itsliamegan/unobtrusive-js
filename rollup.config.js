import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import closure from '@ampproject/rollup-plugin-closure-compiler';
import pkg from './package.json';

let input = './src/unobtrusive.ts';
let plugins = [
  resolve({
    extensions: ['.js', '.ts'],
  }),
  commonjs(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        module: 'es2015',
      },
    },
  }),
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
