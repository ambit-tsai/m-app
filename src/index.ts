import { appOptionMap } from './helpers/init-option';
import { appendChildTo } from './helpers/utils';
import { APP_TAG } from './helpers/constant';
import { hijackNodeMethodsOfGlobal } from './helpers/hijack-node-methods';
import MicroAppElement from './MicroAppElement';


export function setAppOption(id: string, option: object, merge = true) {
    appOptionMap[id] = merge ? {
        ...appOptionMap[id],
        ...option,
    } : option;
}


// Append default style
const styleEL = document.createElement('style');
styleEL.textContent = `${APP_TAG}{display:block;position:relative;}`;
appendChildTo(document.head, styleEL);


hijackNodeMethodsOfGlobal();


customElements.define(APP_TAG, MicroAppElement);
