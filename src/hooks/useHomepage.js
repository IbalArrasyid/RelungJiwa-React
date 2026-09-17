import { useEffect, useState } from 'react'
import { fetchHomepage, homepageFallback } from '../lib/cms'
export function useHomepage(){const [homepage,setHomepage]=useState(homepageFallback);useEffect(()=>{let active=true;fetchHomepage().then((next)=>{if(active)setHomepage(next)});return()=>{active=false}},[]);return homepage}
