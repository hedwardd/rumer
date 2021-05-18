import styled from 'styled-components';
import device from './device';
import layoutSize from './layoutSize';
import fontSize from './fontSize';

const StyledListingForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  background-color: #FFFFFF;
  color: #484848;
  display: flex;
  flex-direction: column;
  color: #484848;
  font-size: 19px;
  line-height: 27.17px;
  padding: 16px 30px;
  
  @media ${device.laptop} {
    width: 50%;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 24px;
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
  background-color: #008489;
  border-style: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 24px;
  padding: 10px 22px;
  text-align: center;
`;

const StyledTextArea = styled.textarea`
  resize: none;
  padding: ${layoutSize[2]} ${layoutSize[3]};
  border-radius: 8px;
  border: rgb(176 176 176) solid 1px;
  font-size: ${fontSize[1]};
`;

export {
  StyledListingForm, FormSection, StyledLabel, StyledButton, StyledTextArea, StyledInput,
};
