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
import { getCourses, getData, getDataByArbitraryId } from '@/utils/apis';
import type { Link, Node } from './node';
import graph from '@/assets/data/data.json'

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
const data = ref<{ nodes: Array<Node>, links: Array<Link> }>({})
onMounted(async () => {
    // data.value = await getData('1')
    data.value = graph
    sim.value = createChart(data.value).simulation
})


const handleClickCourse = async (id: string) => {
    data.value = await getData(id)
    const svg = d3.select('#kg-svg')
    svg.selectAll('*').remove()
    sim.value!.stop()

    sim.value = createChart(data.value).simulation
}

// const currentShowNode = ref(null)

const currentShowNode = computed(() => {
    if (data.value.nodes) {
        return data.value?.nodes.find(item => item.id === currentActiveNode.value)
    }
    else {
        return null
    }
})

const handleClickReset = () => {
}


const handleClickSetRoot = async () => {
    data.value = await getDataByArbitraryId(currentActiveNode.value)

    console.log(currentActiveNode, data.value)
    const svg = d3.select('#kg-svg')
    svg.selectAll('*').remove()
    sim.value!.stop()

    sim.value = createChart(data.value).simulation

}

const dataToTree = () => {

}

const treeToData = () => {

}



provide('clickCourse', handleClickCourse)
provide('cur', currentShowNode)

provide('reset', handleClickReset)
provide('setRoot', handleClickSetRoot)











</script>

<style scoped></style>