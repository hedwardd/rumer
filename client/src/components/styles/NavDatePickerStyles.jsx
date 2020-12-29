import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

const StyledNavDatePicker = styled.div`
  display: flex;
  align-items: center;
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF385C;
  border-radius: 50%;
  color: #FFFFFF;
  width: 32px;
  height: 32px;
  margin-left: 5px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 12px;
  height: 12px;
  color: white;
`;

export { StyledNavDatePicker, SearchButton, StyledSearchIcon };
