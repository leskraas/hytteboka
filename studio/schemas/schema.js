// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import imageGallery from './documents/imageGallery';

// We import object and document schemas
import page from './documents/page';
import route from './documents/route';
import blockContent from './objects/blockContent'
import userGuide from './documents/userGuide';
import hero from './objects/hero';
import portableText from './objects/portableText';
import textSection from './objects/textSection';
import userGuideStep from './objects/userGuideStep';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    userGuide,
    page,
    imageGallery,
    route,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    hero,
    portableText,
    textSection,
    userGuideStep,
    blockContent
  ])
})
