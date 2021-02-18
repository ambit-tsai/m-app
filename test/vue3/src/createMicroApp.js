import { h, ref } from 'vue';
import { setAppOption } from 'm-app';
import { PROJECT_NAME } from './constant';


export function createMicroApp(option) {
    setAppOption(option.name, {
        ...option,
        route: null,
        fetchOption: eval(`(${option.fetchOpion})`),
        runtimePath: `${PROJECT_NAME}js-runtime.html`,
    });
    return {
        render() {
            return [
                h('m-app', {
                    id: option.name,
                    entry: option.entry,
                    onLoad: () => this.loading = false,
                }),
                this.loading ? h('i', {
                    class: 'el-icon-loading',
                    style: {
                        display: 'inline-block',
                        fontSize: '40px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }) : null,
            ];
        },
        setup() {
            const loading = ref(true);
            return {
                loading,
            };
        },
    };
}
