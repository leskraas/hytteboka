import React from 'react';
import {urlFor} from "./imageUrlBuilder";
import {useDeviceDetect} from "./hooks/useDeviceDetect";
import {IImage} from "../types/sanity";
import styled from "styled-components";

interface IProps {
    image: IImage;
    quality?: number;
    height?: number;
    width?: number;
}

export const SanityImage: React.FC<IProps> = (props) => {
    const {isMobile, readyToUse} = useDeviceDetect();
    if (!readyToUse) {
        return <></>;
    }
    return (
        isMobile ? (
                props.height ?
                    <Image height={props.height} width={props.width} src={urlFor(props.image).fit('min')
                        .quality(props.quality ?? 60)
                        .width(props.width ?? 300)
                        .height(props.height)
                        .url()}/> :
                    <Image height={props.height} width={props.width}  src={urlFor(props.image).fit('min')
                        .quality(props.quality ?? 60)
                        .width(props.width ?? 300)
                        .url()}/>)
            :
            <Image height={props.height} width={props.width}  src={urlFor(props.image).fit('min')
                .quality(props.quality ?? 90)
                .width(1400)
                .url()}/>
    );
};
interface ImageProps{
    height?: number;
    width?: number;
}

const Image = styled.img<ImageProps>`
  height: ${props => props.height ? props.height + 'px' : '100%'};
  width: 100%;
  object-fit: cover;
  max-width: 100vw;
  max-height: 100vh;
`;
