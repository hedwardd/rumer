import styled from 'styled-components';

const StyledBookingForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #DDDDDD;
  border-radius: 12px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 6px 16px;
  box-sizing: border-box;
  color: #222222;
  line-height: 20px;
  padding: 24px;
  quotes: auto;
`;

const FormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDateRangePicker = styled.div`
  width: 100%;
`;

const ReserveButton = styled.input`
  background-image: linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin-top: 15px;
  outline: none;
  padding: 14px 24px;
  position: relative;
  quotes: auto;
  text-align: center;
  width: 100%;
  &:active {
    background-color: #FF385C; transform: scale(.96);
  }
`;

export {
  StyledBookingForm, FormContentWrapper, StyledDateRangePicker, ReserveButton,
};
