const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const banner = require('./banner');


(async () => {
    const bundle = await rollup.rollup({
        input: 'src/index.ts',
        plugins: [
            typescript(),
            terser(),
        ],
    });

    // Create the UMD version
    await bundle.write({
        file: 'dist/m-app.js',
        format: 'umd',
        name: 'MicroApp',
        banner,
        sourcemap: true,
    });

    // Create the ESM version
    await bundle.write({
        file: 'dist/m-app.mjs',
        format: 'esm',
        banner,
        sourcemap: true,
    });

})();

