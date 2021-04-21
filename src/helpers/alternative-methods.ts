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
        const nodes = [aChild]
        hijackEventAttr(nodes)
        hijackScriptElements([aChild], appendChild, this, nodes);
        return aChild;
    },
    insertBefore<T extends Node>(newNode: T, referenceNode: Node): T {
        hijackEventAttr([newNode])
        hijackScriptElements([newNode], insertBefore, this, [newNode, referenceNode]);
        return newNode;
    },
    replaceChild<T extends Node>(newChild: Node, oldChild: T): T {
        hijackEventAttr([newChild])
        hijackScriptElements([newChild], replaceChild, this, [newChild, oldChild]);
        return oldChild;
    },
    append(...nodes: (string | Node)[]) {
        hijackEventAttr(nodes)
        hijackScriptElements(nodes, append, this, nodes);
    },
    prepend(...nodes: (string | Node)[]) {
        hijackEventAttr(nodes)
        hijackScriptElements(nodes, prepend, this, nodes);
    },
    after(...nodes: (string | Node)[]) {
        hijackEventAttr(nodes)
        hijackScriptElements(nodes, after, this, nodes);
    },
    before(...nodes: (string | Node)[]) {
        hijackEventAttr(nodes)
        hijackScriptElements(nodes, before, this, nodes);
    },
    replaceWith(...nodes: (string | Node)[]) {
        hijackEventAttr(nodes)
        hijackScriptElements(nodes, replaceWith, this, nodes);
    },
};

if (replaceChildren) {
    alternativeMethods.replaceChildren = function (...nodes: (string | Node)[]) {
        hijackScriptElements(nodes, replaceChildren, this, nodes);
    };
}


const ELEMENT_OR_DOCUMENT_FRAGMENT = [1, 11];


function hijackScriptElements(nodes: (string | Node)[], method: Function, ctx: Node, args: unknown[]) {
    const newScripts: HTMLScriptElement[] = [];
    const root = <MicroAppRoot> ctx.getRootNode();
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
        el.setAttribute(attr, publicPath + url)
    }
}