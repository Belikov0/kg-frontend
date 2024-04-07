import type { ExtractPropTypes, PropType } from "vue";

interface Node {
    id: Number,
    label: String | Number,
    level?: Number,
    name: String,
    msg: String,
    // Children: 
} 

export const nodeProps = {
    info: {
        type: Node,
    }
}

export type NodeType = ExtractPropTypes<typeof Node>