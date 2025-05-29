import React, { useEffect, useMemo } from 'react'
import { useCustomHook, useCustomHookWrapper } from '../hooks/useCustomHook';

type Props = {
  data: string;
  delayData: number
  children: React.ReactElement
}

const DataReciever: React.FC<Props>  = ({data, delayData, children}) => {
  function heavyComputationBlocking(durationMs = 500) {
    const start = Date.now();
    while (Date.now() - start < durationMs) {
      Math.sqrt(Math.random()); 
      
    }
    console.log(`heavyComputationBlocking is finished`)
    return `Delay - ${durationMs} ms`
  }
 
  const prefix = useMemo(()=>heavyComputationBlocking(delayData),[delayData]);
  useCustomHook([delayData]);
  return (
    <div>
      <h1>{children}</h1>
         <div>{`DataReciever: ${prefix} - ${data}`}</div>
    </div>
  )
}

export default DataReciever