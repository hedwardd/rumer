import styled from 'styled-components';
import device from './device';
import layoutSize from './layoutSize';

const StyledNavBar = styled.nav`
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: ${layoutSize[8]};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;

  @media ${device.laptop} {
    padding: 0 ${layoutSize[9]};
    justify-content: space-between;
    height: ${layoutSize[9]};
  }
`;

const StyledNavLink = styled.a`
  /* margin: 0 ${layoutSize[5]}; */
  text-decoration: none;
  color: black;
  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  min-width: ${layoutSize[8]};
  height: 42px;
  font-size: 14px;
  padding: ${layoutSize[1]} ${layoutSize[4]};
  position: relative;
  vertical-align: middle;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 21px;
  transition: box-shadow .2s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
  }
  @media ${device.laptop} {
    display: inline-flex;
  }
`;

export { StyledNavBar, StyledNavLink };
