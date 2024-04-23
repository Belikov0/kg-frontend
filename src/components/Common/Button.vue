<template>
    <div :class="ns.b()">

        <span :class="ns.e('label')">
            <slot></slot>
        
        </span>
    </div>
</template>

<script setup lang="ts">

import { useNamespace } from '@/utils/useNamespace';


const ns = useNamespace('button')
</script>

<style lang="scss">

</style>