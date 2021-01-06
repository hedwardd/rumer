import styled from 'styled-components';
import device from './device';

const StyledDropDown = styled.div`
  display: none;
  margin: 0 24px;
  @media ${device.laptop} {
    display: block;
  }
`;

const DropDownButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-width: 5vw;
  height: 42px;
  text-decoration: none;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 21px;
  box-shadow: ${({ isOpen }) => (isOpen ? 'rgba(0, 0, 0, 0.18) 0 2px 4px;' : 'none')}
  transition: box-shadow .2s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
  }
`;

const DropDownContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 4vw;
  right: 1vw;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 2;
  border-radius: 12px;
  line-height: 20px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 8px 0;
  display: none;

  @media ${device.laptop} {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`;

const DropDownLink = styled.a`
  // font-weight: ${({ primary }) => (primary === 'true' ? 'bold' : 'normal')};
  color: black;
  cursor: pointer;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  font-size: 14px;
  line-height: 18px;
  margin: 0;
  outline: none;
  overflow: visible;
  quotes: auto;
  text-align: start;
  text-decoration: none;
  user-select: auto;
  white-space: nowrap;
  width: 100%;
  z-index: 3;
  &:hover {
      background-color: #F7F7F7;
  }
`;

const MenuDivider = styled.div`
  background-color: #DDDDDD;
  box-sizing: border-box;
  height: 1px;
  line-height: 20px; 
  margin: 8px 0;
`;

export {
  StyledDropDown, DropDownButton, DropDownContainer, DropDownLink, MenuDivider,
};
