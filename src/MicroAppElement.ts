import { initOption } from './helpers/init-option';
import { initApp } from './helpers/init-app';


export default class MicroAppElement extends HTMLElement {
    #option: MicroAppOption;
    #root: MicroAppRoot;

    connectedCallback() {
        const ctx = this;
        const option = initOption(ctx);
        ctx.#option = option;
        let shadowRoot: MicroAppRoot;
        if (ctx.#root) {
            shadowRoot = ctx.#root;
        } else {
            shadowRoot = ctx.attachShadow({ mode: option.shadowMode });
            ctx.#root = shadowRoot;
        }
        initApp(option, shadowRoot);
    }

    disconnectedCallback() {
        this.#root.innerHTML = '';
    }

}
