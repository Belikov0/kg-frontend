<template>
    <div :class="[ns.b()]">
        <div :class="[ns.e('button-wrapper')]">


            <button :class="[
                ns.e('function-button'),
                ns.is('active', active === index)
            ]" v-for="(tag, index) in iconList" :key="index" @click="handleClick(index)">
                <component :is="tag"></component>
            </button>
        </div>


        <component 
            :class="ns.e('panel-item')"
        v-for="(tag, index) in panelList" :is="tag" :key="index" v-show="active === index"></component>

    </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@/utils/useNamespace';
import { ref } from 'vue'
import { DocumentsOutline, MailOpenOutline, BuildOutline } from '@vicons/ionicons5';
import Details from './Details.vue';
import Lessons from './Lessons.vue';
import Operations from './Operations.vue';


const ns = useNamespace('function-panel')

// button
const iconList = [DocumentsOutline, MailOpenOutline, BuildOutline]
const active = ref(0)
const handleClick = (index: number) => {
    active.value = index

}

// panels
const panelList = [Lessons, Details, Operations]

</script>

<style scoped></style>