import {useEffect, useState} from 'react';


export const useApplePwaDetection = () => {
    const [isApplePwa, setIsApplePwa] = useState<boolean>(false);

    useEffect(() => {
        if (("standalone" in window.navigator) && !(window.navigator['standalone'])) {
            setIsApplePwa(true)
        }
    }, []);

    return isApplePwa;
}
