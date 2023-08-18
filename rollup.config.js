import { babel } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const pkg = 'foreverland'
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
      plugins: [terser()],
      globals: {
        S3: 'S3',
        Upload: 'Upload'
      }
    }
  ],
  plugins: [
    commonjs(),
    json(),
    typescript(),
    nodeResolve({ browser: true }),
    nodePolyfills(),
    babel({ babelHelpers: 'bundled', extensions: [...DEFAULT_EXTENSIONS, ...extensions] })
  ]
}
