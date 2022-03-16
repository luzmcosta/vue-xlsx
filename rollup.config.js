import fs from 'fs';

import cjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';
import node from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only'
import copy from 'rollup-copy-plugin';

import pkg from './package.json'

const baseFolder = './src/';
const componentFolder = 'components/';
const mixinFolder = 'mixins/';

const components = fs.readdirSync(baseFolder + componentFolder);
const mixins = fs.readdirSync(baseFolder + mixinFolder);

const formatOutput = 'esm'
const fileTypesExternal = ['vue', 'xlsx']

const configBabel = {
  babelHelpers: 'bundled',
  exclude: 'node_modules/**',
}
const configNode = {
  extensions: ['.js', '.vue'],
}
const configReplace = {
  preventAssignment: true,
  values: { 'process.env.NODE_ENV': 'production' },
}
const configVue = {
  compileTemplate: true,
  css: false,
}

const mapEntry = (f, ext, folder) => ({
  input: baseFolder + folder + f,
  external: fileTypesExternal,
  output: {
    format: formatOutput,
    dir: `dist/${folder}${f.replace(ext, 'js')}`,
  },
  plugins: [
    replace(configReplace),
    node(configNode),
    vue(configVue),
    cjs(),
  ],
});

export default [
  ...components.map(f => mapEntry(f, 'vue', componentFolder)),
  ...mixins.map(f => mapEntry(f, 'js', mixinFolder)),
  {
    input: './src/utils.js',
    external: fileTypesExternal,
    output: {
      format: formatOutput,
      file: `dist/utils.js`
    },
    plugins: [
      replace(configReplace),
      node(configNode),
      cjs(),
      copy({
        'src/index.js': pkg.module,
        'src/polyfills.js': 'dist/polyfills.js',
      })
    ],
  },
  {
    input: 'src/index.js',
    external: fileTypesExternal,
    output: [
      {
        dir: 'dist',
        // file: pkg.main,
        format: 'cjs',
      }
    ],
    plugins: [
      replace(configReplace),
      node(configNode),
      babel(configBabel),
      css(),
      vue(configVue),
      cjs(),
    ]
  },
];
