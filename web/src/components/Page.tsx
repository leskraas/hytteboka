import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import sanityClient from "../client";
import groq from 'groq';
import {IPage} from "../types/sanity";
import {TextSection} from "./TextSection";
import {Hero} from "./Hero";
import {FadeIn} from "../utils/FadeIn";


const pageQuery = groq`
*[_type == "route" && slug.current == $slug][0]{
  page->{
    ...,
    content[] {
        ...,
         backgroundImage{
                asset->{
                    _id,
                    url
                }
         },
    }
  }
}
 `


export const Page: React.FC = () => {
    const [pageData, setPageData] = useState<IPage>();
    const slug = useLocation().pathname;

    useEffect(() => {
        if (slug) {
            sanityClient.fetch(pageQuery, {slug})
                .then((data) => setPageData(data.page))
                .catch(console.error);
        }

    }, [slug]);
    return (
        <FadeIn>
            {pageData?.content.map((content) => {
                    switch (content._type) {
                        case "hero":
                            return <Hero key={content._key} {...content}/>
                        case "textSection": {
                            return <TextSection key={content._key} {...content}/>
                        }
                    }
                }
            )}
        </FadeIn>
    );
};
