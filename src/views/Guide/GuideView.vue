<template>
    <div>
        
        <Nav :items="items"></Nav>
        <Main desc="开始您的个性化学习之旅！"></Main>
    </div>
    
</template>

<script setup lang="ts">
import Nav from '@/components/Guide/Nav.vue';
import Main from '@/components/Guide/Main.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

router.beforeEach((to, from) => {
    if (to.hash){
        const elem = document.querySelector(to.hash)
        if (elem) {
            elem.scrollIntoView({behavior: 'smooth'})
        }
    }
})

// const items = ['开始', '关于我们', '课程', '登录']


const items = [
    {
        msg: '开始',
        func: () => {
            router.push("#start")
        }
    },
    {
        msg: '关于我们',
        func: () => {
            router.push("#introduction")
        }
    },
    {
        msg: '课程',
        func: () => {
            router.push("#lessons")
        }
    },
    {
        msg: '登录',
        func: () => {}
    }
]


</script>

<style scoped></style>