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

import * as d3 from 'd3'
import { onBeforeMount, onMounted, provide, ref, computed, watch } from 'vue';
import { useNamespace } from '@/utils/useNamespace';
import createChart from './chart'
import { currentActiveNode } from './chart'
import { getCourses, getData } from '@/utils/apis';
import type { Link, Node } from './node';

import axios from 'axios'

const props = defineProps({
    width: {
        type: Number
    },
    height: {
        type: Number
    }
})




const ns = useNamespace('graph')



const courses = ref({})
const sim = ref({})

provide('courses', courses)
onBeforeMount(async () => {
    // courses.value = (await getCourses()).nodes.map((node: Node) => {
    //     return {
    //         id: node.id,
    //         name: node.properties.name
    //     }
    // })
})
const data = ref({nodes, links})
onMounted(async () => {

    // const data = await getData('1')


    sim.value = createChart(data.value).simulation
})


const handleClickCourse = async (id: string) => {
    const data = await getData(id)

    const svg = d3.select('#kg-svg')
    svg.selectAll('*').remove()
    sim.value!.stop()

    sim.value = createChart(data).simulation
}

// const currentShowNode = ref(null)

const currentShowNode = computed(() => {
    return nodes.find(item => item.id === currentActiveNode.value)
})

const handleClickReset = () => {
}




const handleClickSetRoot = () => {
    const root = currentActiveNode.value
    data.value.links = nodes.map(node => {
        
    })
}

const dataToTree = () => {

}

const treeToData = () => {

}


// watch(() => currentActiveNode, ()=>{
//     console.log(currentActiveNode.value)
//     currentShowNode.value = nodes.find(item => item.id === currentActiveNode)
// })
watch(() => data, () => {
    sim.value = createChart(data.value).simulation
})

provide('clickCourse', handleClickCourse)
provide('cur', currentShowNode)

provide('reset', handleClickReset)
provide('setRoot', handleClickSetRoot)











</script>

<style scoped></style>