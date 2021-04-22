
export function hijackEventAttr(nodes: (string | Node)[] | HTMLCollection, root: MicroAppRoot, win?: Window) {
    for (const node of <Node[]> nodes) {
        if (typeof node === 'string' || node.nodeType !== 1) {
            continue
        }
        if (!win) {
            win = root.frameElement?.contentWindow
            if (!win) return    // the node is not under <m-ap>
        }
        const el = <HTMLElement> node
        for (let i = el.attributes.length - 1; i >= 0; --i) {
            const { name, value } = el.attributes[i]
            if (name.startsWith('on')) {
                const listener = <(ev: Event)=>void> win.Function('event', value)
                el.addEventListener(name.substring(2), listener)
                el.setAttribute(name, '')
            }
        }
        if (el.children.length) {
            hijackEventAttr(el.children, root, win)
        }
    }
}
