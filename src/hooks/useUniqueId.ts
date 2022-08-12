import { useRef } from "react";

const useUniqueId = (prefix = "col-") => {
    const counter = useRef(1)
    const id = counter.current
    
    counter.current+=1

    return `${prefix}${id}`
}

export default useUniqueId