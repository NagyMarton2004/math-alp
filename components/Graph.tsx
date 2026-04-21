"use client"
import React, {useEffect, useRef} from 'react'
import cytoscape from 'cytoscape';

type graphSettings = {
  isDirected: boolean,
}

type graphProps = {
  graphSettings: graphSettings,
}

const Graph = ({graphSettings}: graphProps) => {
    const cyRef = useRef<HTMLDivElement | null>(null);
    const cyInstance = useRef<cytoscape.Core | null>(null);
    const nodeIdCounter = useRef<number>(1);
    const currentSourceId = useRef<string | null>(null);
    
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
                'target-arrow-shape': "none",
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

        cyInstance.current.on('cxttap', (e) => {

            if (e.target === cyInstance.current || !e.target.isNode()) {
                if (currentSourceId.current) {
                cyInstance.current?.$(`#${currentSourceId.current}`).style('background-color', '#6366f1');
                currentSourceId.current = null;
                }
                return;
            }
        
            if (!currentSourceId.current) {
                currentSourceId.current = e.target.data('id');
                cyInstance.current?.$(`#${currentSourceId.current}`).style('background-color', '#f59e0b');
            } else {
                const targetId = e.target.data('id');
                const edgeId = `${currentSourceId.current}-${targetId}`;
                const alreadyExists = (cyInstance.current?.edges(`[source = "${currentSourceId.current}"][target = "${targetId}"]`)?.length ?? 0) > 0;
                if (!alreadyExists) {
                    cyInstance.current?.add({
                        group: "edges",
                        data: { 
                            id: edgeId,
                            source: currentSourceId.current,
                            target: targetId,
                        },
                    });
                }
                cyInstance.current?.$(`#${currentSourceId.current}`).style('background-color', '#6366f1');
                currentSourceId.current = null;
            }

        });

        return () => {
            cyInstance.current?.destroy();
        };
    }, []);

    useEffect(() => {
       if (!cyInstance.current) return;
            cyInstance.current.style()
            .selector('edge')
            .style({
                'target-arrow-shape': graphSettings.isDirected ? 'triangle' : 'none',
            })
            .update();
    },[graphSettings.isDirected])


  return (
    <div ref={cyRef} className='h-full w-full' />
  )
}

export default Graph