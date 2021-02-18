import { assign, warn } from './utils';


export const appOptionMap = {};


const defaultOption: MicroAppOption = {
    shadowMode: 'closed',
    runtimePath: '/js-runtime.html',
};
const SHADOW_MODES = ['closed', 'open'];


export function initOption(app: MicroAppElement): MicroAppOption {
    const { attributes } = app;
    const option = { ...defaultOption };
    for (let i = attributes.length - 1; i >= 0; --i) {
        const { name, value } = attributes[i];
        if (name === 'shadowMode' && !SHADOW_MODES.includes(value)) {
            continue;
        }
        option[name] = value;
    }
    if (option.id) {
        assign(option, appOptionMap[option.id]);
    }
    if (!option.entry) {
        warn('"entry" is not set');
    }
    initRoute(option);
    return option;
}


function initRoute(option) {
    let { route } = option;
    if (!route) {
        route = location.pathname.replace(/[^/]+$/, '');
    }
    if (route[0] !== '^') {
        route = '^' + route;
    }
    option.route = new RegExp(route);
}
