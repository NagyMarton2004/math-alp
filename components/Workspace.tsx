"use client"
import React, {useEffect, useRef} from 'react'
import cytoscape from 'cytoscape';


const Workspace = () => {
    const cyRef = useRef<HTMLDivElement | null>(null);
    const cyInstance = useRef<cytoscape.Core | null>(null);
    const nodeIdCounter = useRef<number>(1);
    const currentSourceId = useRef<string | null>(null);
    const edgesArray = useRef<string[]>([]);

    useEffect(() => {

        if (!cyRef.current) return;

      

        cyInstance.current = cytoscape({
        container: cyRef.current,
        style: [
            {
            selector: 'node',
            style: {
                'background-color': '#6366f1',
                'label': 'data(id)',
                'color': '#fff',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '12px',
            }
            },
            {
            selector: 'edge',
            style: {
                'width': 2,
                'line-color': '#a1a1aa',
                'target-arrow-color': '#a1a1aa',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }
            }
        ],
        layout: { name: 'grid' },
        });
        
        cyInstance.current.on('tap', (e) =>{
            if (e.target !== cyInstance.current) return;

            const newId = `${nodeIdCounter.current}`;
            const pos = e.position;

            cyInstance.current?.add({
                data: { id: newId },
                position: { x: pos.x, y:pos.y },
            });

            nodeIdCounter.current++;
        })

        cyInstance.current.on('cxttap', "node", (e) => {
        
            if (!currentSourceId.current) {
                currentSourceId.current = e.target.data('id');
            } else {
                const targetId = e.target.data('id');
                const edgeId = `${currentSourceId.current}-${targetId}`
                if (!edgesArray.current.includes(edgeId)) {
                    cyInstance.current?.add({
                        group: "edges",
                        data: { 
                            id: edgeId,
                            source: currentSourceId.current,
                            target: targetId,
                        },
                    });
                    edgesArray.current.push(edgeId)
                }
                currentSourceId.current = null;
            }

        });

        return () => {
            cyInstance.current?.destroy();
        };
    }, []);

  return (
    <div ref={cyRef} className='bg-zinc-300 h-full w-full' />
  )
}

export default Workspace