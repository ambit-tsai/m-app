import { EL_TAG_NAME, SCRIPT_TYPES } from './constant';
import { hijackEventAttr } from './hijack-event-attr';
import {
    appendTo,
    isObject,
    appendChild,
    insertBefore,
    replaceChild,
    append,
    prepend,
    replaceChildren,
    after,
    before,
    replaceWith,
} from './utils';


export const alternativeMethods: {
    [key: string]: Function
} = {
    appendChild<T extends Node>(aChild: T): T {
        const root = <MicroAppRoot> this.getRootNode()
        const nodes = [aChild]
        hijackEventAttr(nodes, root)
        hijackScriptElements([aChild], appendChild, this, nodes, root)
        return aChild;
    },
    insertBefore<T extends Node>(newNode: T, referenceNode: Node): T {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr([newNode], root)
        hijackScriptElements([newNode], insertBefore, this, [newNode, referenceNode], root);
        return newNode;
    },
    replaceChild<T extends Node>(newChild: Node, oldChild: T): T {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr([newChild], root)
        hijackScriptElements([newChild], replaceChild, this, [newChild, oldChild], root)
        return oldChild;
    },
    append(...nodes: (string | Node)[]) {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr(nodes, root)
        hijackScriptElements(nodes, append, this, nodes, root)
    },
    prepend(...nodes: (string | Node)[]) {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr(nodes, root)
        hijackScriptElements(nodes, prepend, this, nodes, root)
    },
    after(...nodes: (string | Node)[]) {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr(nodes, root)
        hijackScriptElements(nodes, after, this, nodes, root)
    },
    before(...nodes: (string | Node)[]) {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr(nodes, root)
        hijackScriptElements(nodes, before, this, nodes, root)
    },
    replaceWith(...nodes: (string | Node)[]) {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr(nodes, root)
        hijackScriptElements(nodes, replaceWith, this, nodes, root)
    },
};

if (replaceChildren) {
    alternativeMethods.replaceChildren = function (...nodes: (string | Node)[]) {
        const root = <MicroAppRoot> this.getRootNode()
        hijackEventAttr(nodes, root)
        hijackScriptElements(nodes, replaceChildren, this, nodes, root)
    };
}


const ELEMENT_OR_DOCUMENT_FRAGMENT = [1, 11];


function hijackScriptElements(nodes: (string | Node)[], method: Function, ctx: Node, args: unknown[], root: MicroAppRoot) {
    const newScripts: HTMLScriptElement[] = [];
    const isMicroApp = root?.host?.tagName === EL_TAG_NAME;
    if (isMicroApp) {
        for (const node of nodes) {
            if (!isObject(node)) continue;
            if ((<Element> node).tagName === 'SCRIPT') {
                const el = <HTMLScriptElement> node
                modifyAssetPath(el, 'src', root)
                if (SCRIPT_TYPES.includes(el.type)) {
                    newScripts.push(<HTMLScriptElement> el.cloneNode(true));
                    el.type = 'm;' + el.type;
                }
            }if ((<Element> node).tagName === 'LINK') {
                modifyAssetPath(<Element> node, 'href', root)
            } else if (ELEMENT_OR_DOCUMENT_FRAGMENT.includes(node.nodeType) && (<Element> node).children.length) {
                const list = (<Element> node).querySelectorAll('script');
                for (let i = 0, { length } = list; i < length; ++i) {
                    const el = list[i]
                    if (SCRIPT_TYPES.includes(el.type)) {
                        newScripts.push(<HTMLScriptElement> node.cloneNode(true));
                        el.type = 'm;' + el.type;
                    }
                }
            }
        }
    }
    method.apply(ctx, args);
    if (isMicroApp && newScripts.length) {
        appendTo((<any> root.frameElement.contentDocument).__documentElement, ...newScripts);
    }
}


function modifyAssetPath(el: Element, attr: string, root: MicroAppRoot) {
    const url = el.getAttribute(attr)
    if (!url || /^\w+:\/\//.test(url) || url.startsWith('//')) {
        return
    }
    const { publicPath } = root.host._option
    if (publicPath) {
        el.setAttribute(attr, new URL(url, publicPath).href)
    }
}