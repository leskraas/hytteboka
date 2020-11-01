import React from 'react';
import styled, {css} from "styled-components";

export const FadeIn: React.FC = ({children}) => {
    return (
        <FadeInEffect>
            {children}
        </FadeInEffect>
    );
};


const fadeInKeyframes = css`
    0% { 
    opacity: 0;
     }
    20% { 
    opacity: 0;
    transform: rotateY(90deg);
     }
    to   { 
      opacity: 1;
      transform: rotateY(0)
      }
`;

const FadeInEffect = styled.div`
z-index: -1;
   //-webkit-animation: fadein .6s; /* Safari, Chrome and Opera > 12.1 */
   //    -moz-animation: fadein .6s; /* Firefox < 16 */
   //     -ms-animation: fadein .6s; /* Internet Explorer */
   //      -o-animation: fadein .6s; /* Opera < 12.1 */
   //       animation: fadein .6s; /* Safari, Chrome and Opera > 12.1 */
            

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    ${fadeInKeyframes}
}
           
/* Firefox < 16 */
@-moz-keyframes fadein {
    ${fadeInKeyframes}
}

/* Internet Explorer */
@-ms-keyframes fadein {
    ${fadeInKeyframes}
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    ${fadeInKeyframes}
}

@keyframes fadein {
    ${fadeInKeyframes}
} 
`

