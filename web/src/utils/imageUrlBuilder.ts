import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client";
import {IImage} from "../types/sanity";

const builder: SanityImageUrl = imageUrlBuilder(sanityClient);

export const urlFor = (image: IImage): SanityImageUrl => {

    return builder.image(image).auto('format');
};
