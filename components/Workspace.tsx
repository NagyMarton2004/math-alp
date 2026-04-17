"use client"
import React, {useEffect, useRef} from 'react'
import cytoscape from 'cytoscape';


const Workspace = () => {
    const cyRef = useRef<HTMLDivElement | null>(null);
    const cyInstance = useRef<cytoscape.Core | null>(null);
    const nodeIdCounter = useRef<number>(1);

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

        return () => {
            cyInstance.current?.destroy();
        };
    }, []);

  return (
    <div ref={cyRef} className='bg-zinc-300 h-full w-full' />
  )
}

export default Workspace