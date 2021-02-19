const { build } = require('vite');
const sharedOptions = require('./shared');
const copy = require('rollup-plugin-copy-assets');
const path = require('path');


module.exports = build({
    ...sharedOptions,
    build: {
        rollupOptions: {
            plugins: [
                copy({
                    assets: [
                        'js-runtime.html',
                        '404.html',
                        '.spa'
                    ],
                }),
            ],
        },
        target: 'es2015',
        emptyOutDir: true,
        outDir: path.resolve(__dirname, '../../../docs'),
        sourcemap: true,
    },
});