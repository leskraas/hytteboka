import React from 'react';
import {ITextSection} from "../types/sanity";
import {SimpleBlockContent} from "./SimpleBlockContent";
import {Typography} from "@material-ui/core";

export const TextSection: React.FC<ITextSection> = (content) => {
    return (
        <div>
            <Typography variant={'h2'}>{content.heading}</Typography>
            {content.text && <SimpleBlockContent blocks={content.text} />}
        </div>
    );
};
