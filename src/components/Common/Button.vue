<template>
    <div :class="ns.b()">
        <div :class="ns.e('pics')">
            
        
        </div>

    </div>
</template>

<script setup lang="ts">

import { useNamespace } from '@/utils/useNamespace';


const ns = useNamespace('button')
</script>

<style lang="scss">
@use '@style/mixins/mixins.scss' as *;

@include b(button) {
    width: 120px;
    height: 40px;

    

    

}
</style>