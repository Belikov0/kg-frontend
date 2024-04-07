import * as d3 from 'd3'

// interface Data {
//     nodes: {
//         id: string,
//         labels: string,
//         props: {
//             name: string,
//             description: string,
//         }

//     },
//     links: {
//         source: string,
//         target: string,
//         type: string
//     }
// }

// 半径
const radius = {
    '课程': 50,
    '章节': 40,
    '节': 30,
    '小节': 25
}

// 颜色




const createChart = (data) => {
    // Specify the dimensions of the chart.
    const width = 928
    const height = 680

    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map((d) => ({ ...d }))
    const nodes = data.nodes.map((d) => ({ ...d }))

    // Create a simulation with several forces.
    const simulation = d3
        .forceSimulation(nodes)
        .force(
            'link',
            d3.forceLink(links).id((d) => d.id).distance(200)
        )
        .force('charge', d3.forceManyBody())
        .force('x', d3.forceX())
        .force('y', d3.forceY())
        .force('collide', d3.forceCollide(60).iterations(10))
        .force('charge', d3.forceManyBody().strength(-200));
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
        .attr('stroke', '#fff')
        .attr('stroke-opacity', 0.9)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', () => Math.sqrt(30))
        .text((d) => d.labels)

    const g = svg.append('g')

    const node = g
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', (d) => radius[d.labels])
        .attr('fill', (d) => color(d.labels))
        // .text((d) => d.properties.description)
        

    node.append('title').text((d) => d.prop.name)

    // Add a drag behavior.
    node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // const g = node.selectAll('g')
    const nodeText = g
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dy', '.3em')
    //   .attr('class', 'node-name')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('color', '#000')
    //   .attr('fill', '')
      .text(function (d) {
        console.log(d)
        return d.prop.name;
      });

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

    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    // invalidation.then(() => simulation.stop())

    const handleZoom = (e) => {
        // d3.select('svg g').attr('transform', e.transform)
        svg.attr('transform', e.transform)
    }

    let zoom = d3.zoom().on('zoom', handleZoom)

    svg.call(zoom)

    return svg.node()
}

export default createChart
