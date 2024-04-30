<template>
    <div :class="ns.b()">
        <div :class="ns.e('title')">
            <span>智能问答系统</span>
        </div>
        <div :class="ns.e('content-wrapper')" v-if="courseVisible">
            <div :class="ns.e('conver-panel')">
                <div>欢迎来到智能问答系统，有什么能为您服务的吗？</div>
                <div>计算机网络有哪些前置课程</div>
                <div>
                    <p>

                        学习计算机网络通常需要一些前置课程，以建立必要的基础知识和技能。以下是一些常见的前置课程：
                        <br>
                        <span style="font-weight: bold;">1.计算机基础知识</span>：了解计算机的基本概念、组成和工作原理，包括计算机硬件、操作系统和编程基础等。
                        <br>
                        <span
                            style="font-weight: bold;">2.数据结构与算法</span>：学习数据结构（如链表、栈、队列、树等）和算法设计与分析的基本原理。这将帮助你理解网络协议和数据传输的底层机制。
                        <br>
                        <span
                            style="font-weight: bold;">3.操作系统</span>：熟悉操作系统的基本概念和功能，包括进程管理、内存管理、文件系统等。计算机网络的实现和应用通常依赖于操作系统的支持。
                        <br>
                        <span
                            style="font-weight: bold;">4.编程语言</span>：掌握至少一种编程语言，如C、C++、Java或Python等。网络编程需要对编程语言的基本语法和面向对象编程有一定的了解。
                        <br>
                        <span
                            style="font-weight: bold;">5.离散数学</span>：学习离散数学的基本概念和方法，如集合论、逻辑、图论和概率论。离散数学是计算机科学的基础，对理解网络协议和算法设计有重要意义。
                        <br>
                        <span
                            style="font-weight: bold;">6.数据库</span>：了解数据库的基本概念和操作，包括数据库管理系统、SQL查询语言和数据模型等。在网络应用开发和数据交换中，数据库常常扮演重要角色。
                    </p>
                </div>

            </div>

            <div :class="ns.e('text')">
                <!-- <el-input type="textarea" resize="none"></el-input> -->
                <textarea></textarea>
            </div>
            <div :class="ns.e('send')">
                <Button>发送</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Common/Button.vue';

import { useNamespace } from '@/utils/useNamespace';
import { getPrecourse, getPath } from '@/utils/apis'
import { ref, reactive } from 'vue'
import axios from 'axios'

interface FormData {
    course: string
    time: string
}

const formData = reactive({
    course: '机器学习',
    time: '8',
    major: '计算机科学与技术'
})

const courseVisible = ref(true)

const precourse = ref([])
const selectedCourses = ref([])

const handleClickGetPrecourse = async () => {
    const body = {
        course: formData.course,
        time: formData.time + '周',
        major: formData.major
    }
    console.log("click get precourse", body)
    const resp = await getPrecourse(body)
    console.log(resp)
    precourse.value = resp.precourse

}

const path = ref({})
const handleClickGetPath = async () => {
    const body = {
        course: formData.course,
        time: formData.time + '周',
        major: formData.major,
        precourse: selectedCourses.value
    }
    console.log("click get path", body)
    path.value = await getPath(body)

    courseVisible.value = true
}



const ns = useNamespace('recommend')
</script>

<style lang="scss">
@use '@style/mixins/mixins.scss' as *;

@include b(recommend) {
    width: 1400px;
    height: 1000px;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 30px;

    background-color: rgb(228, 228, 228);
    margin-top: 200px;



    @include e(content-wrapper) {
        width: 96%;
        height: 80%;
        background-color: white;

        border-radius: 10px;
        margin: 0 auto;
        position: relative;

        box-sizing: border-box;
        padding: 20px;

    }

    @include e(conver-panel) {
        width: 100%;
        height: 500px;
        border-radius: 5px;
        margin: 0 auto;

        box-sizing: border-box;
        padding: 20px;

        display: flex;
        flex-direction: column;


        overflow: scroll;
        scrollbar-width: auto;
        border: 1px black solid;

        div {
            display: inline-block;
            max-width: 500px;
            font-size: 16px;
            padding: 15px;
            border: gray 1px solid;
            flex-grow: 0;
        }

        div:nth-of-type(2n+1) {
            align-self: flex-start;
        }

        div:nth-of-type(2n) {
            align-self: flex-end;
        }
    }


    @include e(send) {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
}

textarea {
    margin-top: 40px;
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    resize: none;

    font-size: 20px;
}


.el-checkbox__label {
    font-size: 40px;
    color: $color-white;
}

.el-checkbox {
    width: 40%;
    height: 50px;
}

.el-checkbox__inner {
    width: 20px;
    height: 20px;

    &::after {
        left: 5px;
        height: 12px;
    }

}
</style>