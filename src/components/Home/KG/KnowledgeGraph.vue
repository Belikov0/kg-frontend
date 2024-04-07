<template>
    <div :class="[ns.b()]">

        <div id="KG" :class="ns.e('kg')">
            <svg id="kg-svg"></svg>
        </div>

        <div :class="[ns.e('panel-wrapper')]">
            <FunctionPanel></FunctionPanel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNamespace } from '@/utils/useNamespace';

import createChart from './chart.js';
import nodes from '@/assets/data/nodes.json'
import links from '@/assets/data/relationship.json'

// 元素属性
const props = defineProps({
    width: {
        type: Number
    },
    height: {
        type: Number
    }
})

let nodeList = nodes.map(a => {
    const b = {
        id: '',
        labels: '',
        prop: {
            name: '',
            description: '',
        }
    }
    b.id = '' + (a.id)
    b.labels = a.labels
    b.prop.name = a.prop.name
    b.prop.description = a.prop.description
    return b
})

let linkList = links.map(a => {
    const b = {
        source: '',
        target: '',
        type: ''
    }
    b.source = '' + (a.source)
    b.target = '' + (a.target)
    b.type = a.type
    return b
})



import FunctionPanel from './FunctionPanel/FunctionPanel.vue';

const ns = useNamespace('graph')

onMounted(async () => {
    createChart({
        nodes: nodeList,
        links: linkList
    })
})






</script>

<style scoped></style>