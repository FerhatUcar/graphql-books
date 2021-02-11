import styled from "styled-components";

export const FilterSearch = styled.input`
  transition: all 0.2s ease-in-out;
  display: block;
  margin: 0 0 10px 12px;
  padding: 10px;
  width: 15%;
  border-radius: 4px;
  border: 1px solid #880e4f;
  color: #880e4f;
  height: 23px;

  &:focus {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    outline: 0;
    width: calc(100% - 35px);
  }
`;
