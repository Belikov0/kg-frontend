import tinycolor from 'tinycolor2'
import * as d3 from 'd3'
import {ref} from 'vue'

const radius = {
    课程: 50,
    章节: 25,
    节: 15,
    小节: 10
}

// 颜色
const colors = {
    课程: '#902921',
    章节: '#294853',
    节: '#837451',
    小节: '#f8ad19'
}


const highlight = (color, percentage) => {
    if (!percentage) {
        percentage = 20
    }
    const originColor = tinycolor(color)
    const brighterColor = originColor.brighten(percentage)

    return brighterColor.toHexString()
}






export const currentActiveNode = ref(null)

const onClickNode = (e, links, actives, activeCenter) => {
    const t = d3.transition().duration(500).ease(d3.easeLinear)

    // active状态
    if (activeCenter.includes(d3.select(e.currentTarget).attr('identity'))) {
        return
    }
    // 颜色复原
    d3.selectAll('circle')
        .filter((d) => {
            return d ? actives.includes(d.id) : false
        })
        .transition(t)
        .attr('fill', (d3) => colors[d3.label])

    actives.splice(0)
    activeCenter.splice(0)
    const id = d3.select(e.currentTarget).attr('identity')
    activeCenter.push(id)

    // 搜索现结点的相邻结点
    const subs = links
        .filter((item) => {
            return item.source.id == '' + id || item.target.id == '' + id
        })
        .map((item) => {
            if (item.source.id === id) {
                return item.target.id
            } else {
                return item.source.id
            }
        })

    subs.push(id)

    // 高亮
    d3.selectAll('circle')
        .filter((d) => {
            return d ? subs.includes(d.id) : false
        })
        .transition(t)
        .attr('fill', (d) => {
            return highlight(colors[d.label])
        })

    d3.select(e.currentTarget).attr('fill', (d) => highlight(colors[d.label], 50))

    actives.push(...subs)


    return activeCenter[0]
}

const createChart = (data) => {
    // Specify the dimensions of the chart.
    const width = 1600
    const height = 1000
    let actives = []
    let activeCenter = []

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const nodes = data.nodes.map((d, i) => ({ ...d, index: i }))
    const links = data.links.map((d, i) => ({ ...d, index: i }))

    // Create a simulation with several forces.
    const simulation = d3
        .forceSimulation(nodes)
        .force(
            'link',
            d3
                .forceLink(links)
                .id((d) => d.id)
                .distance(300)
        )
        .force('charge', d3.forceManyBody())
        .force('x', d3.forceX())
        .force('y', d3.forceY())
        .force('collide', d3.forceCollide(60).iterations(10))
        .force('charge', d3.forceManyBody().strength(-200))

    // Create the SVG container.
    const svg = d3
        .select('#kg-svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'max-width: 100%; height: auto;')

    // Add a line for each link, and a circle for each node.
    const link = svg
        .append('g')
        .attr('stroke', '#000')
        .attr('stroke-opacity', 0.4)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', () => Math.sqrt(2))
        .text((d) => d.label)

    const g = svg.append('g')

    const node = g
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', (d) => radius[d.label])
        .attr('fill', (d) => colors[d.label])
        .attr('identity', (d) => d.id)
        // .attr('id')
        .on('click', (e) => {
            currentActiveNode.value = onClickNode(e, links, actives, activeCenter)[0]
            console.log(currentActiveNode.value)

        }) // 点击事件

    node.append('title').text((d) => d.properties.name)

    // Add a drag behavior.
    node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

    const nodeText = g
        .append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('dy', '.3em')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none')
        .text(function (d) {
            return d.properties.name
        })
        .attr('fill', (d) => colors[d.label])

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on('tick', () => {
        link.attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => {
                return d.target.x
            })
            .attr('y2', (d) => d.target.y)

        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

        nodeText.attr('x', (d) => d.x).attr('y', (d) => d.y)
    })

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
    }

    const handleZoom = (e) => {
        const t = d3.transition().duration(500).ease(d3.easeLinear)
        svg.transition(t).attr('transform', e.transform)
    }

    let zoom = d3.zoom().scaleExtent([0.5, 5]).on('zoom', handleZoom)

    svg.call(zoom)

    return {
        nodes: svg.node(),
        simulation: simulation
    }
}

export default createChart
