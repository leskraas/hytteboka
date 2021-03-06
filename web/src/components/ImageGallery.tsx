import React, {useEffect, useRef, useState} from 'react';
import {Button, CircularProgress, IconButton, Modal, Typography} from "@material-ui/core";
import styled, {css} from "styled-components";
import {AddAPhotoRounded, DeleteRounded, MoreVertRounded} from "@material-ui/icons";
import sanityClient from "../client";
import {colors} from "../utils/colors";
import {MainMargin, NavHeight} from "../utils/dimentions";
import groq from "groq";
import {IImage} from "../types/sanity";
import {nanoid} from "nanoid";
import {usePrevious} from "../utils/hooks/usePrevious";
import {SanityImage} from "../utils/SanityImage";
import {FadeIn} from "../utils/FadeIn";
import {useHistory} from "react-router";


const imageGalleryQuery = groq`
    *[_type == "image-gallery"][0]{
    ...,
        images[] {
        ...,
            _key,
            asset->{
                _id,
                url,
                _createdAt
             }
        },
    }
`


export const ImageGallery: React.FC = () => {
    const [image, setImage] = useState("");
    const [visibleToolbar, setVisibleToolbar] = useState<boolean>(false);
    const [fullViewImage, setFullViewImage] = useState<IImage>(undefined);
    const [imageGallery, setImageGallery] = useState<IImage[]>([]);
    const [uploadingImage, setUploadingImage] = useState<boolean>(false);
    const [uploadingImageFail, setUploadingImageFail] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<boolean>(true);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const history = useHistory()

    const refCloseButton = useRef(null);
    const prevImage = usePrevious(image);

    useEffect(() => {
        if (image !== "" && image !== prevImage) {
            sanityFileUpload(image)
        }
        if (uploaded) {
            sanityClient.fetch(imageGalleryQuery)
                .then((data: { images: IImage[] }) => {
                    setImageGallery((data.images).sort(function(a, b) {
                        return (a.asset._createdAt > b.asset._createdAt) ? -1 : ((a.asset._createdAt < b.asset._createdAt) ? 1 : 0);
                    }))})
                .catch((err) => {
                    setUploadingImageFail(true);
                    console.log('error', err);
                });
            setUploaded(false);
        }
    }, [image, prevImage, uploaded])

    const handleCloseClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (e.target === refCloseButton.current) {
            e.preventDefault();
            e.stopPropagation();
            setFullViewImage(undefined);
            setVisibleToolbar(false);
        }
    };
    const handleToolClick = () => {
        setVisibleToolbar(!visibleToolbar);
    };

    const sanityRemoveFileAsync = (imageFile: IImage) => sanityClient.patch('global-image-gallery').unset([`images[_key=="${imageFile._key}"]`]).commit()

    const sanityRemoveFile = (imageFile: IImage) => {
        sanityRemoveFileAsync(imageFile).then(() => {
            setFullViewImage(undefined);
            setVisibleToolbar(false);
            setUploaded(true);
            history.go(0) // refresh page
            history.go(0) // refresh page
        }).catch((err) => {
            setUploadingImageFail(true);
            console.log('error', err);
        });
    }

    const sanityDeleteFile = (imageFile: IImage) => {
        sanityRemoveFileAsync(imageFile).then(() => {
            setFullViewImage(undefined);
            setVisibleToolbar(false);
            setUploaded(true);
            history.go(0) // refresh page
            history.go(0) // refresh page
            sanityClient.delete(imageFile.asset._id).catch(err => console.log('gikk ikke å slette', err))
        }).catch((err) => {
            setUploadingImageFail(true);
            console.log('error', err);
        });
    }

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
                history.go(0) // refresh page
                history.go(0) // refresh page
            }).catch(() => {
                setUploadingImage(false);
                setUploaded(false);
                setUploadingImageFail(true);
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
        <>
            <FadeIn>
                <ImageGalleryWrapper>
                    <Typography gutterBottom variant="h1" component="h1">
                        Bildegalleri
                    </Typography>
                    <ImageWrapper>
                        {imageGallery.length > 0 &&
                        imageGallery.map((image) => (
                            <Image key={image._key}
                                   onClick={() =>
                                       fullViewImage === image ?
                                           setFullViewImage(undefined) :
                                           setFullViewImage(image)}>
                                <SanityImage image={image}/>
                            </Image>
                        ))
                        }
                    </ImageWrapper>
                    <input ref={inputRef} type="file" id="upload-button" accept="image/*" onChange={handleChange}
                           style={{display: "none"}}/>
                </ImageGalleryWrapper>
            </FadeIn>
            <Modal
                open={uploadingImageFail}
                onClose={() => setUploadingImageFail(false)}
            >
                <ModalStyle>
                    Noe gikk galt, klarte ikke laste opp bilde!
                    <Button onClick={() => setUploadingImageFail(false)} variant="contained"
                            style={{backgroundColor: colors.core, color: "white"}}>Ok</Button>
                </ModalStyle>
            </Modal>
            <ButtonProgress>
                <StyledIconButton aria-label="Legg til bilde" onClick={handleUpload}>
                    <StyledAddAPhotoRounded/>
                </StyledIconButton>
                {uploadingImage && <StyledCircularProgress size={68}/>}
            </ButtonProgress>
            {fullViewImage &&
            <BackDrop>
                <FullWidthImage>
                    <ImageTools onClick={handleToolClick}>
                        <MoreVertRounded/>
                    </ImageTools>
                    <CloseImage onClick={handleCloseClick} ref={refCloseButton}/>
                    <ImageToolbar>
                        {visibleToolbar &&
                        <Toolbar>
                            <IconButton aria-label="Fjern" onClick={() => sanityRemoveFile(fullViewImage)}>
                                <DeleteRounded/> Fjern
                            </IconButton>
                            <IconButton aria-label="Slett" onClick={() => sanityDeleteFile(fullViewImage)}>
                                <DeleteRounded style={{color: colors.red}}/> Slett
                            </IconButton>
                        </Toolbar>
                        }
                        <SanityImage image={fullViewImage} quality={100} width={700}/>
                    </ImageToolbar>
                </FullWidthImage>
            </BackDrop>
            }
        </>
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
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey900Transparent8};
  z-index: 2;
`;


const fadeInKeyframes = css`
    0% { 
    opacity: 0;
    transform: scale(0);
     }
    10% { 
    opacity: 0;
    transform: scale(0);
     }
    to   { 
    opacity: 1;
    transform: scale(1);
      }
`;


const FullWidthImage = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  img {
    object-fit: contain;
  }
    -webkit-animation: fadein .6s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein .6s; /* Firefox < 16 */
    -o-animation: fadein .6s; /* Opera < 12.1 */
    animation: fadein .6s; /* Safari, Chrome and Opera > 12.1 */
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    ${fadeInKeyframes}
};
   
/* Firefox < 16 */
@-moz-keyframes fadein {
    ${fadeInKeyframes}
};

/* Opera < 12.1 */
@-o-keyframes fadein {
    ${fadeInKeyframes}
};

@keyframes fadein {
    ${fadeInKeyframes}
};
`;

const ImageTools = styled(IconButton)`
  &&{
    z-index: 10;
    position:absolute;
    top: 0;
    right: 10px;
    box-shadow: 0 5px 5px 0 ${colors.shadowCore};
    transition: box-shadow ease-in-out .2s;
    transform: translate(0, -50%);
    background-color: lightgray;
    &:hover{
      box-shadow: 0 0 10px 5px ${colors.shadowCore};
      background-color: lightgray;
    }
  }
`;

const ImageToolbar = styled.div`
    max-height: calc(100vh - 48px);
    width: 100%;
    height: 100%;
`;

const Toolbar = styled.div`
    background-color: lightgray;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    z-index: 9;
    position:absolute;
    top: 5px;
    right: 10px;
    transform: translate(0, 26px);
    box-shadow: 0 5px 5px 0 ${colors.shadowCore};
     &:hover{
      box-shadow: 0 0 10px 5px ${colors.shadowCore};
      background-color: lightgray;
    }
    button {
      border-radius: 2rem;
      font-size: 1.6rem;
      padding-right: 2rem;
    }
`;

const CloseImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ModalStyle = styled.div`
&&{
  position: absolute;
  width: 90%;
  max-width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 2rem;
  box-shadow: ${colors.shadowCore};
  padding: 2rem;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  button {
    margin-top: 2rem;
  }
}
`;

