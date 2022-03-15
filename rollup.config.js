import vue from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';
import node from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only'

import fs from 'fs';

const baseFolder = './src/';
const componentFolder = 'components/';
const mixinFolder = 'mixins/';

const components = fs.readdirSync(baseFolder + componentFolder);
const mixins = fs.readdirSync(baseFolder + mixinFolder);

const mapEntry = (f, ext, folder) => ({
  input: baseFolder + folder + f,
  external: ['vue', 'xlsx'],
  output: {
    format: 'esm',
    dir: './dist',
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: { 'process.env.NODE_ENV': 'production' },
    }),
    node({
      extensions: ['.vue', '.js']
    }),
    vue({
      css: false,
    }),
    cjs(),
    css(),
  ]
});

export default [
  ...components.map(f => mapEntry(f, 'vue', componentFolder)),
  ...mixins.map(f => mapEntry(f, 'js', mixinFolder)),
  {
    input: './src/utils.js',
    external: ['vue', 'xlsx'],
    output: {
      format: 'esm',
      file: `dist/utils.js`
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: { 'process.env.NODE_ENV': 'production' },
      }),
      node({
        extensions: ['.vue', '.js']
      }),
      cjs(),
    ]
  },
  {
    input: 'src/index.js',
    external: ['vue', 'xlsx'],
    output: [
      {
        format: 'cjs',
        dir: './dist',
      }
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: { 'process.env.NODE_ENV': 'production' },
      }),
      node({
        extensions: ['.vue', '.js']
      }),
      vue({
        css: false,
      }),
      cjs(),
      css(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
      }),
    ]
  },
  {
    input: 'src/index.js',
    external: ['vue', 'xlsx'],
    output: {
      dir: './dist',
      format: 'umd',
      name: 'vue-xlsx',
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: { 'process.env.NODE_ENV': 'production' },
      }),
      node({
        extensions: ['.vue', '.js']
      }),
      vue({
        css: false,
      }),
      cjs(),
      css(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
      })
    ]
  }
];
