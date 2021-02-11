import styled from "styled-components";

export const Button = styled.button`
  transition: all 0.2s ease-in-out;
  width: 20%;
  cursor: pointer;
  height: 43px;
  padding: 10px;
  border-radius: 4px;
  border: solid 1px #ae0000;
  color: #ae0000;
  background: #fff;

  &:hover {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    background: #ae0000;
    color: white;
  }
`;

export const Book = styled.li`
  transition: all 0.2s ease-in-out;
  display: block;
  margin: 12px;
  padding: 10px;
  width: 90%;
  border-radius: 4px;
  border: 1px solid #880e4f;
  cursor: pointer;
  color: #880e4f;

  span {
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    color: #ffffff;
    background: #880e4f;
  }
`;
