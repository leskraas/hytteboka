import React from 'react';
import {Navbar as NavbarComp} from "./components/Navbar";
import styled from "styled-components";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AllUserGuide} from "./components/AllUserGuide";
import {OneUserGuide} from "./components/OneUserGuide";
import {MainMargin, NavHeight} from "./utils/dimentions";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {colors} from "./utils/colors";
import {ImageGallery} from "./components/ImageGallery";
import {Page} from "./components/Page";

// const Page = lazy(() => import("./components/Page").then(({Page}) => ({default: Page})));
// const AllUserGuide = lazy(() => import("./components/AllUserGuide").then(({AllUserGuide}) => ({default: AllUserGuide})));
// const OneUserGuide = lazy(() => import("./components/OneUserGuide").then(({OneUserGuide}) => ({default: OneUserGuide})));


const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: colors.core,
        },
        secondary: {
            main: colors.secondary,
        },
    },
    typography: {
        htmlFontSize: 10,
        fontSize: 14,

    },
})
const {breakpoints} = defaultTheme
const theme = {
    ...defaultTheme,
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: "5rem",
                [breakpoints.down("xs")]: {
                    fontSize: "4rem"
                }
            },
            h2: {
                fontSize: "4rem",
                [breakpoints.down("xs")]: {
                    fontSize: "3rem"
                }
            },
            h3: {
                fontSize: "3rem",
                [breakpoints.down("xs")]: {
                    fontSize: "2.5rem"
                }
            },
            h4: {
                fontSize: "2.5rem",
                [breakpoints.down("xs")]: {
                    fontSize: "2rem"
                }
            },
            body1: {
                fontSize: "1.6rem",
                [breakpoints.down("xs")]: {
                    fontSize: "1.6rem"
                }
            },
            body2: {
                fontSize: "1.6rem",
                [breakpoints.down("xs")]: {
                    fontSize: "1.4rem"
                }
            },
        }
    }
}

// theme = responsiveFontSizes(theme);

// const SanityImageFallback = () => (
//     <ImagePlaceHolder/>
// )

// const ImagePlaceHolder = styled.div`
//   background-color: lightgray;
//   height: 300px;
//   width: 100vw;
//   margin: -${MainMargin} -${MainMargin} 2rem;
// `;

export const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <ThemeProvider theme={theme}>
                <Content>
                    {/*<Suspense fallback={<></>}>*/}
                    <Switch>
                        <Route path={'/brukermanual/:slug'} component={OneUserGuide}/>
                        <Route path={'/brukermanual/'} component={AllUserGuide}/>
                        <Route path={'/bildegalleri/'} component={ImageGallery}/>
                        <Route component={Page}/>
                    </Switch>
                    {/*</Suspense>*/}
                </Content>
            </ThemeProvider>
        </BrowserRouter>
    );
}

const Content = styled.div`
  position: relative;
  top: 0;
  padding: ${MainMargin} ${MainMargin} calc(${MainMargin} + ${NavHeight});
  min-height: calc(100vh - ${NavHeight} - 2*${MainMargin});
`

const Navbar = styled(NavbarComp)`
  position: fixed;
  bottom: 0;
`

