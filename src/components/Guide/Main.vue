<template>
    <div :class="[
        ns.b(),
        ns.is('login', showLogin)
    ]" id="start">
        <div :class="ns.e('content-wrapper')">
            <div :class="[ns.e('title')]">
                <span>{{ title }}</span>
            </div>
            <div :class="[ns.e('sub-title')]">
                <span>Smart Navigation</span>
                <img src="@/assets/pics/ship.png" width="50">
            </div>
            <div :class="[ns.e('desc')]">
                <span>{{ desc }}</span>
            </div>

            <div :class="[ns.e('button-group')]">
                <el-form-item>
                    <el-button type="primary" round :size="buttonSize" @click='buttonClick'>开始航行</el-button>
                </el-form-item>

                

            </div>
        </div>

        <div :class="[
            ns.e('introduction'),
            ns.e('content-wrapper')
        ]" id="introduction">
            介绍
        </div>

        <div :class="[
            ns.e('lessons'),
            ns.e('content-wrapper')
        ]" id="lessons">
            课程
        </div>




        <div :class="[ns.e('image-wrapper')]">

        </div>

    </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@/utils/useNamespace';
import { useRouter } from 'vue-router'
import LoginPanel from '@/components/Login/LoginPanel.vue'
import { ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: '智慧学航'
    },
    desc: {
        type: String,
        default: '这是一段关于智慧学航的描述'
    }
})

const ns = useNamespace('main')
const buttonSize = ref('large')
const showLogin = ref(false)

const router = useRouter()

const buttonClick = () => {
    router.push('/home')
}

</script>

<style scoped></style>