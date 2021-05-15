import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import layoutSize from './layoutSize';

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
  width: ${layoutSize[6]};
  height: ${layoutSize[6]};
  margin-left: ${layoutSize[2]};
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: ${layoutSize[4]};
  height: ${layoutSize[4]};
  color: white;
`;

export { StyledNavDatePicker, SearchButton, StyledSearchIcon };
