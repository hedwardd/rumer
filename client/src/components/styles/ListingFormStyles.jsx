import styled from 'styled-components';
import device from './device';

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
  margin-bottom: 4px;
  padding-bottom: 9px;
  padding-top: 9px;
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
`;

export {
  StyledListingForm, FormSection, StyledLabel, StyledButton, StyledTextArea,
};
