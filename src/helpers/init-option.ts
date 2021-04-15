import { assign, warn } from './utils';


export const appOptionMap = {};


const defaultOption = <MicroAppOption> {
    shadowMode: 'closed',
    runtimePath: '/js-runtime.html',
};
const SHADOW_MODES = ['closed', 'open'];


export function initOption(app: MicroAppElement): MicroAppOption {
    const { attributes } = app;
    const option = {
        ...defaultOption,
        initialUrl: location.href,
        initialState: history.state,
    };
    for (let i = attributes.length - 1; i >= 0; --i) {
        let { name, value } = attributes[i];
        name = toCamelCase(name)
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
    if (typeof option.beforeReady !== 'function') {
        option.beforeReady = undefined;
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


function toCamelCase(attrName: string): string {
    const list = attrName.split('-')
    let newName = list[0]
    for (let i = 1, { length } = list; i < length; ++i) {
        const [firstLetter, ...rest] = list[1]
        newName += firstLetter.toUpperCase() + rest.join('')
    }
    return newName
}