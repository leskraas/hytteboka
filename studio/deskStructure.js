import S from '@sanity/desk-tool/structure-builder'
import { FaRegImages } from 'react-icons/fa';


// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
    !['site-config'].includes(listItem.getId()) && !['image-gallery'].includes(listItem.getId())

export default () =>
    S.list()
        .title('Site')
        .items([
            S.listItem()
                .title('Site config')
                .child(
                    S.editor()
                        .id('config')
                        .schemaType('site-config')
                        .documentId('global-config')
                ),
            S.listItem()
                .title('Bildegalleri')
                .icon(FaRegImages)
                .child(
                    S.editor()
                        .id('gallery')
                        .schemaType('image-gallery')
                        .documentId('global-image-gallery')
                ),
            ...S.documentTypeListItems().filter(hiddenDocTypes)
        ])
