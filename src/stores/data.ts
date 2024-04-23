import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Tree {
    id: string
    children: Array<Tree>
}

interface Node {
    id: string
    label: string
    properties: {
        name: string
        description: string
    }
}

interface Link {
    source: string
    target: string
    type: string
}

type Courses = Array<Record<string, { nodes: Array<Node>; links: Array<Link> }>>

export const useDataStore = defineStore('data', () => {
    const courses = ref<Courses>({})
    const currentCourseId = ref('')
    const currentActiveCenter = ref('')

    const tree = computed(() => {
        const course = courses.value[currentCourseId]
    })

    const setRoot = () => {}
})
