import { PROTOTYPE } from './constant';
import { addEventListenerTo, warn } from './utils';


export function syncUrlToTopWindow(contentWindow: Window, option: MicroAppOption) {
    const { history: contentHistory } = contentWindow;
    const { pushState, replaceState } = contentWindow.History[PROTOTYPE];
    contentHistory.pushState = (...args) => {
        pushState.apply(contentHistory, args);
        updateTopWindowUrl(option, contentWindow);
    };
    contentHistory.replaceState = (...args) => {
        replaceState.apply(contentHistory, args);
        updateTopWindowUrl(option, contentWindow);
    };
    addEventListenerTo(contentWindow, 'hashchange', () => {
        updateTopWindowUrl(option, contentWindow);
    });
}


export function updateTopWindowUrl(option: MicroAppOption, contentWindow: Window) {
    const { route } = option;
    const { location: contentLocation, history: contentHistory } = contentWindow;
    const { pathname, href } = contentLocation;
    if (route.test(pathname)) {
        history.replaceState(contentHistory.state, '', href);
    } else {
        warn(`mismatched pathname "${pathname}", expect ${route.toString()}`);
    }
}
