import { babel } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import replace from '@rollup/plugin-replace'

const pkg = 'uploadPin'
const extensions = ['.ts']
export default {
  input: './src/index.ts',
  output: [
    {
      file: `./dist/${pkg}.umd.js`,
      format: 'umd',
      name: pkg
    },
    {
      file: `./dist/${pkg}.cjs.js`,
      format: 'cjs',
      plugins: [terser()]
    },
    {
      file: `./dist/${pkg}.esm.js`,
      format: 'esm',
      plugins: [terser()]
    },
    {
      file: `./dist/${pkg}.umd.min.js`,
      format: 'umd',
      name: pkg,
      plugins: [terser()]
    }
  ],
  plugins: [
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    typescript(),
    nodeResolve({ browser: true }),
    nodePolyfills(),
    babel({ babelHelpers: 'bundled', extensions: [...DEFAULT_EXTENSIONS, ...extensions] })
  ]
}
