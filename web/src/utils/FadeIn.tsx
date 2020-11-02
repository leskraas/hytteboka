import React from 'react';
import styled, {css} from "styled-components";
import {RouteComponentProps, useLocation} from "react-router-dom";

interface ILocation extends RouteComponentProps {
    prevPath?: string;
}

export const FadeIn: React.FC = ({children}) => {
    const location = useLocation<ILocation>();

    const getFadeInDirection = (): 'left' | 'right' | 'none' => {
        if (location.state?.prevPath === '/bildegalleri/') {
            return 'left';
        } else if (location.state?.prevPath === '/brukermanual/' && location.pathname.includes('/brukermanual/') && location.pathname.length > location.state?.prevPath.length) {
            return 'right';
        }else if (location.state?.prevPath.includes('/brukermanual/') && location.pathname === '/brukermanual/' && location.pathname.length < location.state?.prevPath.length) {
            return 'left';
        } else if (location.state?.prevPath === '/brukermanual/' && location.pathname === '/bildegalleri/') {
            return 'right';
        } else if (location.state?.prevPath === '/brukermanual/' && location.pathname === '/') {
            return 'left';
        } else if (location.state?.prevPath === '/' && location.pathname !== '/') {
            return 'right';
        } else {
            return 'none';
        }
    }
    return (
        <FadeInEffect direction={getFadeInDirection()}>
            {children}
        </FadeInEffect>
    );
};


const fadeInKeyframesFromLeft = css`
    0% { 
    opacity: 0;
    transform: translateX(-100vw);
     }
    20% { 
    opacity: 0;
    transform: translateX(-100vw);
     }
    to   { 
    opacity: 1;
    transform: translateX(0);
      }
`;
const fadeInKeyframesFromRight = css`
    0% { 
    opacity: 0;
    transform: translateX(100vw);
     }
    20% { 
    opacity: 0;
    transform: translateX(100vw);
     }
    to   { 
    opacity: 1;
    transform: translateX(0);
      }
`;


interface IFadeIn {
    direction: 'left' | 'right' | 'none';
}

const FadeInnWithDirection = ({direction}: IFadeIn) => {
    switch (direction) {
        case "left":
            return css`
                      -webkit-animation: fadeinFromLeft .6s; /* Safari, Chrome and Opera > 12.1 */
                       -moz-animation: fadeinFromLeft .6s; /* Firefox < 16 */
                         -o-animation: fadeinFromLeft .6s; /* Opera < 12.1 */
                          animation: fadeinFromLeft .6s; /* Safari, Chrome and Opera > 12.1 */
            `;
        case "right":
            return css`
                       -webkit-animation: fadeinFromRight .6s; /* Safari, Chrome and Opera > 12.1 */
                       -moz-animation: fadeinFromRight .6s; /* Firefox < 16 */
                         -o-animation: fadeinFromRight .6s; /* Opera < 12.1 */
                          animation: fadeinFromRight .6s; /* Safari, Chrome and Opera > 12.1 */
            `;
        default:
            return css`
            `;
    }
}

const FadeInEffect = styled.div<IFadeIn>`
    z-index: -1;
    ${(props) => FadeInnWithDirection(props)}
            

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeinFromRight {
    ${fadeInKeyframesFromRight}
};
@-webkit-keyframes fadeinFromLeft {
    ${fadeInKeyframesFromLeft}
};
           
/* Firefox < 16 */
@-moz-keyframes fadeinFromRight {
    ${fadeInKeyframesFromRight}
};
@-moz-keyframes fadeinFromLeft {
    ${fadeInKeyframesFromLeft}
};


/* Opera < 12.1 */
@-o-keyframes fadeinFromRight {
    ${fadeInKeyframesFromRight}
};
@-o-keyframes fadeinFromLeft {
    ${fadeInKeyframesFromLeft}
};

@keyframes fadeinFromRight {
    ${fadeInKeyframesFromRight}
};
@keyframes fadeinFromLeft {
    ${fadeInKeyframesFromLeft}
};
`

