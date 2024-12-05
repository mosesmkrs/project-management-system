import{ useEffect, useState } from "react"

export const useOrigin = () => {
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ''; 

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [isMounted, setIsMounted] = useState(false);

    if (!isMounted) {
        return '';
    }

    return origin
}