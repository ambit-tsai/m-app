<template>
    <Dialog
        title="Micro App Record"
        v-model="showRecord"
        width="500px"
    >
        <Form
            ref="formRef"
            :rules="rules"
            :model="model"
            label-position="left"
            label-width="100px"
        >
            <FormItem label="Name" prop="name">
                <Input v-model="model.name" :clearable="true" />
            </FormItem>
            <FormItem label="Route" prop="route">
                <Input v-model="model.route" placeholder="/URL/pathname/" :clearable="true" />
            </FormItem>
            <FormItem label="Entry" prop="entry">
                <Input v-model="model.entry" placeholder="URL" :clearable="true" />
            </FormItem>
            <FormItem label="Icon">
                <Input v-model="model.icon" placeholder="css class" :clearable="true" />
            </FormItem>
            <FormItem label="FetchOption" prop="fetchOption">
                <Input
                    v-model="model.fetchOption"
                    type="textarea"
                    rows="3"
                    placeholder="JS object"
                    :clearable="true"
                />
            </FormItem>
        </Form>
        <template #footer>
            <Button @click="hideRecord">Cancel</Button>
            <Button @click="saveRecord" type="primary">Save</Button>
        </template>
    </Dialog>
</template>


<script>
import Dialog from 'element-plus/es/el-dialog';
import Form from 'element-plus/es/el-form';
import FormItem from 'element-plus/es/el-form-item';
import Input from 'element-plus/es/el-input';
import Button from 'element-plus/es/el-button';
import { inject, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { createMicroApp } from '../createMicroApp';

export default {
    components: {
        Dialog,
        Form,
        FormItem,
        Input,
        Button,
    },
    props: {
        showRecord: Boolean,
        index: Number,
    },
    setup,
}

function setup(props, { emit }) {
    const rules = reactive({
        name: [{ required: true, trigger: 'blur' }],
        entry: [{ required: true, trigger: 'blur' }],
        route: [
            { required: true, trigger: 'blur' },
            { validator: (_, value) => /^\/(\w+\/)+$/.test(value), message: 'format: /URL/pathname/' },
        ],
        fetchOption: [{
            validator(_, value) {
                if (!value) return true;
                try {
                    const obj = eval(`(${value})`);
                    return obj && typeof obj === 'object';
                } catch (error) {}
                return false;
            },
            message: 'not a JS object',
        }],
    });
    const formRef = ref(null);
    const appList = inject('appList');
    const model = ref({});
    const router = useRouter();
    const hideRecord = () => emit('update:modelValue', false);
    const saveRecord = async () => {
        try {
            await formRef.value.validate();
            if (props.index == null) {
                appList.value.push(model.value);
            } else {
                const currentModel = appList.value[props.index];
                router.removeRoute(currentModel.name);
                appList.value[props.index] = model.value;
            }
            router.addRoute({
                name: model.value.name,
                path: `${model.value.route}:pathMatch(.*)*`,
                component: createMicroApp({ ...model.value }),
            });
            hideRecord();
        } catch (error) {
            console.warn(error);
        }
    };

    watchEffect(() => model.value = { ...appList.value[props.index] });

    return {
        rules,
        formRef,
        appList,
        model,
        hideRecord,
        saveRecord,
    };
}
</script>
