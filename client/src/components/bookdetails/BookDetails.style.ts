import styled from "styled-components";

export const BookDetailsBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  padding: 30px;
  overflow: auto;
  box-shadow: -2px -3px 5px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  color: #fff;
`;

export const Box = styled.div`
  opacity: 0;

  &.fade {
    opacity: 1;
  }
`;
