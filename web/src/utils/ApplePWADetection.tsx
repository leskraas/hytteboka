import {useEffect, useState} from 'react';


export const useApplePwaDetection = () => {
    const [isApplePwa, setIsApplePwa] = useState<boolean>(false);

    useEffect(() => {
        if (("fullscreen" in window.navigator)) {
            setIsApplePwa(true)
        }
    }, []);

    return isApplePwa;
}
