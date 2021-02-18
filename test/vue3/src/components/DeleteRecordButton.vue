<template>
    <Popover
        placement="left"
        :width="200"
        trigger="hover"
    >
        <p>Are you sure to delete this?</p>
        <div>
            <Button @click="deleteRecord" type="primary" size="mini">Confirm</Button>
        </div>
        <template #reference>
            <Button
                icon="el-icon-minus"
                type="danger"
                size="mini"
                circle
            />
        </template>
    </Popover>
</template>


<script>
import Popover from 'element-plus/es/el-popover';
import Button from 'element-plus/es/el-button';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: {
        Popover,
        Button,
    },
    props: {
        index: Number,
    },
    setup,
}

function setup(props) {
    const appList = inject('appList');
    const router = useRouter();
    return {
        appList,
        deleteRecord() {
            const record = appList.value[props.index];
            appList.value.splice(props.index, 1);
            router.removeRoute(record.name);
        },
    };
}
</script>