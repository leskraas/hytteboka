import React, {useEffect, useState} from 'react';
import {CircularProgress, IconButton, Typography} from "@material-ui/core";
import styled from "styled-components";
import {AddAPhotoRounded} from "@material-ui/icons";
import sanityClient from "../client";
import {colors} from "../utils/colors";
import {MainMargin, NavHeight} from "../utils/dimentions";
import groq from "groq";
import {IImage} from "../types/sanity";
import {nanoid} from "nanoid";
import {usePrevious} from "../utils/hooks/usePrevious";
import {SanityImage} from "../utils/SanityImage";
import {FadeIn} from "../utils/FadeIn";


const imageGalleryQuery = groq`
    *[_type == "image-gallery"][0]{
    ...,
        images[] {
        ...,
            _key,
            asset->{
                _id,
                url
             }
        },
    }
`

export const ImageGallery: React.FC = () => {
    const [image, setImage] = useState("");
    const [imageGallery, setImageGallery] = useState<IImage[]>();
    const [uploadingImage, setUploadingImage] = useState<boolean>(false)
    const [uploaded, setUploaded] = useState<boolean>(true)
    const inputRef = React.useRef<HTMLInputElement>(null);

    const prevImage = usePrevious(image);

    useEffect(() => {
        if (uploaded) {
            sanityClient.fetch(imageGalleryQuery,)
                .then((data: { images: IImage[] }) => {
                    setImageGallery(data.images)
                })
                .catch(console.error);
            setUploaded(false);
        }
        if (image !== "" && image !== prevImage) {
            sanityFileUpload(image)
        }
    }, [image, prevImage, uploaded])

    const sanityFileUpload = (file: any) => {
        sanityClient.assets.upload('image', file, {
            filename: file.name
        })
            .then((imageAsset: any) => {
                setUploadingImage(true);
                return sanityClient
                    .patch('global-image-gallery')
                    .insert("before", 'images[0]', [
                        {
                            _type: 'image',
                            _key: nanoid(),
                            asset: {
                                _type: "reference",
                                _ref: imageAsset._id
                            }
                        }
                    ])
                    .commit()
            })
            .then(() => {
                setUploadingImage(false);
                setUploaded(true);
            }).catch(() => {
                setUploadingImage(false);
                setUploaded(false);
                alert('Noe gikk galt!!!');
            }
        )
    }


    const handleUpload = async (e: any) => {
        e.preventDefault();
        inputRef.current !== null && inputRef.current.click()

    };

    const handleChange = (e: any) => {
        if (e.target.files.length) {
            setImage(e.target.files[0]);
        }
    };
    return (
        <FadeIn>
            <ImageGalleryWrapper>
                <Typography gutterBottom variant="h1" component="h1">
                    Bildegalleri
                </Typography>
                <ImageWrapper>
                    {imageGallery &&
                    imageGallery.map((image) => (
                        <Image key={image._key}>
                            <SanityImage image={image}/>
                        </Image>
                    ))
                    }
                </ImageWrapper>
                <input ref={inputRef} type="file" id="upload-button" accept="image/*" onChange={handleChange}
                       style={{display: "none"}}/>
                <ButtonProgress>
                    <StyledIconButton aria-label="Legg til bilde" onClick={handleUpload}>
                        <StyledAddAPhotoRounded/>
                    </StyledIconButton>
                    {uploadingImage && <StyledCircularProgress size={68}/>}
                </ButtonProgress>
            </ImageGalleryWrapper>
        </FadeIn>
    );
};


const ImageGalleryWrapper = styled.div`
  position: relative;
`;

const ButtonProgress = styled.div`
        position:fixed;
        bottom: calc(${NavHeight} - 15px);
        right: ${MainMargin};
        z-index: 2;
`;

const StyledCircularProgress = styled(CircularProgress)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -34px 0 0 -34px;
  }
`;

const StyledIconButton = styled(IconButton)`
    && {
        z-index: 3;
        box-shadow: 0 5px 5px 0 ${colors.shadowCore};
        transition: box-shadow ease-in-out .2s;
        background-image: ${colors.linearGradeBlue};
        &:hover{
          box-shadow: 0 0 10px 5px ${colors.shadowCore};
        }
    }
`;

const StyledAddAPhotoRounded = styled(AddAPhotoRounded)`
      && {
        font-size: 30px;
        color: white;
       ${StyledIconButton}.active & {
          color: ${colors.iconCore};
       } 
     }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


const Image = styled.div`
  && {
      flex: 1 1 100px;
      min-height: 100px;
      max-width: 50%;
      width: 100%;
      object-fit: cover;
  }
`;
