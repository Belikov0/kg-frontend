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
// components
import FunctionPanel from './FunctionPanel/FunctionPanel.vue';
import nodes from '@/assets/data/nodes.json'
import links from '@/assets/data/relationship.json'


import { onMounted } from 'vue';
import { useNamespace } from '@/utils/useNamespace';
import createChart from './chart'

import axios from 'axios'

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
        start: '',
        end: '',
        type: ''
    }
    b.start = '' + (a.start)
    b.end = '' + (a.end)
    b.type = a.type
    return b
})



const ns = useNamespace('graph')

onMounted(() => {
    createChart({
        nodes: nodeList,
        links: linkList
    })
})






</script>

<style scoped></style>