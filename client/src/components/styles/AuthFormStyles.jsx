import styled from 'styled-components';

import layoutSize from './layoutSize';
import fontSize from './fontSize';

const StyledAuthForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  min-width: 250px;
  max-width: 320px;
  width: 50%;
  background-color: #FFFFFF;
  color: #484848;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 19px;
  line-height: 27.17px;
`;

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${layoutSize[4]};
`;

const StyledLabel = styled.label`
  margin: ${layoutSize[2]} ${layoutSize[1]};
`;

const StyledInput = styled.input`
  padding: ${layoutSize[2]} ${layoutSize[3]};
  border-radius: 8px;
  border: rgb(176 176 176) solid 1px;
  font-size: ${fontSize[1]};
`;

const StyledButton = styled.button`
  margin: ${layoutSize[4]} 0;
  background-color: #008489;
  border-style: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: ${fontSize[4]};
  font-weight: 800;
  line-height: 24px;
  padding: 10px 22px;
  text-align: center;
`;

const StyledLink = styled.a`
  white-space: nowrap;
`;

export {
  StyledAuthForm, StyledFormSection, StyledLabel, StyledButton, StyledLink, StyledInput,
};
