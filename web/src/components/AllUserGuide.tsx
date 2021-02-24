import React, {lazy, Suspense, useEffect, useState} from 'react';
import sanityClient from "../client";
import {IUserGuide} from "../types/sanity";
// import {Card} from "./Card";
import {urlFor} from "../utils/imageUrlBuilder";
import {Grid, Typography} from '@material-ui/core';
import styled from "styled-components";
import {FadeIn} from "../utils/FadeIn";

const Card = lazy(() => import("./Card").then(({Card}) => ({default: Card})));


export const AllUserGuide: React.FC = () => {
    const [allGuideData, setAllGuideDate] = useState<IUserGuide[]>([]);

    useEffect(() => {
        sanityClient.fetch(
            `*[!(_id in path('drafts.**')) && _type == "userGuide"] | order(order asc){
                        title,
                        slug,
                        description,
                         mainImage{
                            asset->{
                                _id,
                                url
                            }
                        },
                     }
         `
        )
            .then((data) => setAllGuideDate(data))
            .catch(console.error);

    }, [])
    return (
        <FadeIn>
            <Typography gutterBottom variant="h1" component="h1">
                Brukermanualer
            </Typography>
            <StyledGrid container spacing={3}>
                {allGuideData.length > 0 &&
                allGuideData.map(
                    (userGuide: IUserGuide, index: number) =>
                        <Grid key={`userGuide-${index}`} item xs={"auto"}>
                            <Suspense fallback={''}>
                                <Card title={userGuide.title}
                                      description={userGuide.description}
                                      image={urlFor(userGuide.mainImage).fit('min')
                                          .height(400).url()}
                                      slug={`/brukermanual/${userGuide.slug.current}`}
                                />
                            </Suspense>
                        </Grid>
                )}
            </StyledGrid>
        </FadeIn>
    );
};


const StyledGrid = styled(Grid)`
  //align-content: center;
  //justify-content: center;
`;

