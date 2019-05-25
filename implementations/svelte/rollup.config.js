import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import json from 'rollup-plugin-json'

export default {
	input: `./client/index.js`,
	output: {
		file: `./public/build/index-bundle.js`,
		format: `iife`,
		sourcemap: true,
	},
	plugins: [
		svelte({
		}),
		commonjs(),
		json(),
		resolve({
			browser: true,
		}),
	],
}
