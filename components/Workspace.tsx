"use client"
import React, {useState} from 'react'
import Graph from './Graph';
import GraphSettings from './GraphSettings';


type graphSettings = {
    isDirected: boolean,
}

const Workspace = () => {
    const [graphSettings, setGraphSettings] = useState<graphSettings>({
        isDirected: false,
    });
    return (
    <div className='relative bg-zinc-300 h-full w-full'>
        <Graph graphSettings={graphSettings}/>
        <GraphSettings graphSettings={graphSettings} setGraphSettings={setGraphSettings}/>
    </div>


    )
}

export default Workspace