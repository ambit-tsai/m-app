import { initOption } from './helpers/init-option';
import { initApp } from './helpers/init-app';
import { defineProperties } from './helpers/utils';


export default class MicroAppElement extends HTMLElement {
    _option: MicroAppOption;
    #root: MicroAppRoot;

    connectedCallback() {
        const ctx = this;
        const option = initOption(ctx);
        ctx._option = option;
        let shadowRoot: MicroAppRoot;
        if (ctx.#root) {
            shadowRoot = ctx.#root;
        } else {
            shadowRoot = <MicroAppRoot> ctx.attachShadow({ mode: option.shadowMode });
            ctx.#root = shadowRoot;
        }
        initApp(option, shadowRoot);
    }

    disconnectedCallback() {
        this.#root.innerHTML = '';
        defineProperties(this.#root, {
            documentElement: { value: null },
            head: { value: null },
            body: { value: null },
        });
    }

}
