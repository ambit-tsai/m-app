
declare interface MicroAppOption {
    id?: string;
    entry?: string;
    route?: RegExp;
    shadowMode?: ShadowRootMode;
    runtimePath?: string;
    fetchOption?: object;
    beforeReady?: (win: Window) => void;
    initialUrl?: string;
    initialState?: any;
    publicPath?: string;
}

declare interface MicroAppRoot extends ShadowRoot {
    frameElement: HTMLIFrameElement;
    documentElement: HTMLHtmlElement;
    head: HTMLHeadElement;
    body: HTMLBodyElement;
    host: MicroAppElement;
    document: HTMLElement;
}

declare interface MicroAppElement extends HTMLElement {
    _option: MicroAppOption;
}

declare interface HTMLElement {
    replaceChildren(...nodes: (string | Node)[]): void;
}

declare interface Window {
    mRoot?: MicroAppRoot;
    HTMLElement: Function;
    ShadowRoot: Function;
    History: Function;
    Node: Function;
    Function: (...args: string[]) => Function
}

declare function setAppOption(id: string, option: MicroAppOption, merge?: boolean) 
