interface SanityImageUrl {
    image: (source: Asset | Image) => SanityImageUrl;
    dataset: (dataset: string) => SanityImageUrl;
    projectId: (projectId: string) => SanityImageUrl;
    width: (pixels: number) => SanityImageUrl;
    height: (pixels: number) => SanityImageUrl;
    size: (width: number, height: number) => SanityImageUrl;
    focalPoint: (x: number, y: number) => SanityImageUrl;
    minWidth: (pixels: number) => SanityImageUrl;
    maxWidth: (pixels: number) => SanityImageUrl;
    minHeight: (pixels: number) => SanityImageUrl;
    maxHeight: (pixels: number) => SanityImageUrl;
    blur: (amount: any) => SanityImageUrl;
    sharpen: (amount: any) => SanityImageUrl;
    invert: () => SanityImageUrl;
    rect: (left, top, width, height) => SanityImageUrl;
    format: (name: string) => SanityImageUrl;
    auto: (mode: 'format') => SanityImageUrl;
    orientation: (angle: 0 | 90 | 180 | 270) => SanityImageUrl;
    quality: (value: any) => SanityImageUrl;
    forceDownload: (defaultFileName: string) => SanityImageUrl;
    flipHorizontal: () => SanityImageUrl;
    flipVertical: () => SanityImageUrl;
    crop: (mode: any) => SanityImageUrl;
    fit: (value: any) => SanityImageUrl;
    ignoreImageParams: () => SanityImageUrl;
    url: () => string;
    toString: () => string;
}

declare module '@sanity/image-url' {
    import { SanityClient } from '@sanity/client';
    export default function sanityUrl(client: SanityClient): SanityImageUrl;
}
