import React from 'react';
import styled, {css} from 'styled-components';
import {NavLink} from "react-router-dom";
import {colors} from "../utils/colors";
import {Logo} from "../images/Logo";
import {IconButton} from "@material-ui/core";
import {AssignmentRounded, PhotoLibraryRounded} from "@material-ui/icons";
import {useApplePwaDetection} from "../utils/ApplePWADetection";
import {useLocation} from "react-router";

interface Props {
    className?: string
}

export const Navbar: React.FC<Props> = ({className}) => {
    const location = useLocation();
    const isApplePwa = useApplePwaDetection()

    return (
        <NavbarContainer className={className}>
            <LogoContainer isApplePwa={isApplePwa} exact to={{pathname: '/', state: {prevPath: location.pathname}}}>
                <Logo/>
            </LogoContainer>
            <Menu isApplePwa={isApplePwa}>
                <MenuItem to={{pathname: '/brukermanual/', state: {prevPath: location.pathname}}}>
                    <StyledIconButton aria-label="Bruksanvisning">
                        <StyledAssignmentRounded/>
                    </StyledIconButton>
                </MenuItem>
                <MenuItem to={{pathname: '/bildegalleri/', state: {prevPath: location.pathname}}}>
                    <StyledIconButton aria-label="Bruker manual">
                        <StyledPhotoLibraryRounded/>
                    </StyledIconButton></MenuItem>
            </Menu>
        </NavbarContainer>
    );
};


const NavbarContainer = styled.div`
  box-shadow: 0 0 10px 2px ${colors.shadowCore} ;
  background-color: ${colors.navbarBackground};
  display: flex;
`;

const LogoContainer = styled(NavLink)<MenuProps>`
    margin-bottom: ${props => props.isApplePwa ? '2.5rem' : '2rem'};
    position: absolute;
    left: 3rem;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledIconButton = styled(IconButton)`
    &:hover{
      color: ${colors.iconCore}
    };
`;

interface MenuProps {
    isApplePwa: boolean
}

const Menu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: ${props => props.isApplePwa ? '2.5rem' : '1rem'};

`;

const MenuItem = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  :not(:first-of-type) {
    margin-left: 1em;
  }

  &.active {
    &::after {
        content: '';
        height: 2px;
        width: 100%;
        background-color: ${colors.blue400};
        position: absolute;
        bottom: 0;
        border-radius: 2rem;
     }
  }
`;

const CommonIconStyle = css`
   && {
        font-size: 30px;
       ${MenuItem}.active & {
        color: ${colors.iconCore};
       } 
     }
`;

const StyledPhotoLibraryRounded = styled(PhotoLibraryRounded)`
    ${CommonIconStyle}
`;

const StyledAssignmentRounded = styled(AssignmentRounded)`
    ${CommonIconStyle}
`;
