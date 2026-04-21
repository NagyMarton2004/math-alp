import React from 'react'

type graphSettings = {
  isDirected: boolean,
}

type graphSettingsProps = {
  graphSettings: graphSettings,
  setGraphSettings: React.Dispatch<React.SetStateAction<graphSettings>>,
}

const GraphSettings = ({ graphSettings, setGraphSettings }: graphSettingsProps) => {
  return (
     <div className='absolute top-0 right-0 p-4'>
        <h1>Graph Settings</h1>
        <label className=' flex items-center gap-2'>
                <input
                type='checkbox'
                checked={graphSettings.isDirected}
                onChange={(e) => setGraphSettings(prev => ({
                    ...prev,
                    isDirected: e.target.checked,
                }))}
                />
                Directed graph
        </label>
    </div>
  )
}

export default GraphSettings