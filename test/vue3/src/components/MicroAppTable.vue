<template>
    <Drawer title="Manage Micro App" v-model="showAppTable" size="800px">
        <Table :data="appList" stripe>
            <TableColumn type="index" align="center" />
            <TableColumn label="Name" prop="name" align="center" width="150px" />
            <TableColumn label="Route" prop="route" align="center" width="100px" />
            <TableColumn label="Entry" prop="entry" align="center" />
            <TableColumn label="Icon" prop="icon" align="center" width="130px" />
            <TableColumn align="center" width="100px">
                <template #header>
                    <Button
                        @click="addRecord"
                        icon="el-icon-plus"
                        type="primary"
                        size="mini"
                        circle
                    />
                </template>
                <template #default="{$index, row}">
                    <Button
                        @click="editRecord($index)"
                        :disabled="row.readonly"
                        icon="el-icon-edit-outline"
                        type="warning"
                        size="mini"
                        circle
                    />
                    <DeleteRecordButton :index="$index" />
                </template>
            </TableColumn>
        </Table>
        
        <MicroAppRecord v-model="showRecord" :index="selectedIndex" />
    </Drawer>
</template>


<script>
export default {
    props: {
        showAppTable: Boolean,
    },
}
</script>
<script setup>
import Drawer from 'element-plus/es/el-drawer';
import Table from 'element-plus/es/el-table';
import TableColumn from 'element-plus/es/el-table-column';
import Button from 'element-plus/es/el-button';
import DeleteRecordButton from './DeleteRecordButton.vue';
import MicroAppRecord from './MicroAppRecord.vue';
import { inject, ref } from 'vue';

const appList = inject('appList');
const selectedIndex = ref(null);
const showRecord = ref(false);

function addRecord() {
    selectedIndex.value = null;
    showRecord.value = true;
}

function editRecord(index) {
    selectedIndex.value = index;
    showRecord.value = true;
}
</script>