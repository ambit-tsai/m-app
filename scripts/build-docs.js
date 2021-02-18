const { fork } = require('child_process');
const { resolve } = require('path');


const BASE = resolve(__dirname, '../test');


(async () => {
    await require(`${BASE}/vue3/scripts/build`);
    require(`${BASE}/react/scripts/build`);
    fork(`${BASE}/vue2/scripts/build`);
})();