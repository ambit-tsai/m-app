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
                if (SCRIPT_TYPES.includes((<HTMLScriptElement> node).type)) {
                    newScripts.push(<HTMLScriptElement> node.cloneNode(true));
                    (<HTMLScriptElement> node).type = 'm;' + (<HTMLScriptElement> node).type;
                }
            } else if (ELEMENT_OR_DOCUMENT_FRAGMENT.includes(node.nodeType) && node.childNodes.length) {
                const list = (<Element> node).querySelectorAll('script');
                for (let i = 0, { length } = list; i < length; ++i) {
                    if (SCRIPT_TYPES.includes((<HTMLScriptElement> node).type)) {
                        newScripts.push(<HTMLScriptElement> node.cloneNode(true));
                        (<HTMLScriptElement> node).type = 'm;' + (<HTMLScriptElement> node).type;
                    }
                }
            }
        }
    }
    method.apply(ctx, args);
    if (isMicroApp && newScripts.length) {
        appendTo(root.frameElement.contentDocument.firstChild, ...newScripts);
    }
}