import React from 'react';
import {Serializers} from "../types/sanity";
import BlockContent from '@sanity/block-content-to-react'
import sanityClient from '../client'
import {Typography} from "@material-ui/core";

const {projectId, dataset} = sanityClient.config()


const BlockRenderer: React.FC = (props: any) => {
    const style = props.node.style || 'normal';
    if (/^h\d/.test(style)) {
        const level = parseInt(style.match(/\d+/g)[0], 10);
        switch (level) {
            case 1:
                return <Typography variant={'h1'}>{props.children}</Typography>;
            case 2:
                return <Typography variant={'h2'}>{props.children}</Typography>;
            case 3:
                return <Typography variant={'h3'}>{props.children}</Typography>;
            case 4:
                return <Typography variant={'h4'}>{props.children}</Typography>;
            case 5:
                return <Typography variant={'h5'}>{props.children}</Typography>;
        }
    }
    return <Typography variant={'body1'}>{props.children}</Typography>;
};

const serializers: Serializers = {
    types: {
        block: BlockRenderer,
    },
};


interface Props {
    blocks: any;
}

export const SimpleBlockContent: React.FC<Props> = ({blocks}) => {

    if (!blocks) {
        console.error('Missing blocks')
        return null
    }

    return <BlockContent blocks={blocks} serializers={serializers} projectId={projectId} dataset={dataset}/>
}
