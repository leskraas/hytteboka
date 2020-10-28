import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'n45k2lw1',
    dataset: 'production',
    useCdn: true, // `false` if you want to ensure fresh data
    token: 'skeH5gngwJmZ30IG5GOPmeItlGwe4QWHghrocBRZdGZA51stBeBjNroJALy9rTdSHrixIZAhEuirrngKsmY2gEeA2kAScPfjgr6Z374N0KF9pPpkVrkCxxx9luUh5hpvusIYv9G9KcKG5y8Bfl5ToGtjnKzqQMEfMVeDTm0tYlgyq1keoLAP'
})
