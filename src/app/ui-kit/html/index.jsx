import styled from "styled-components";

const Flexbox = styled.div`
  display: flex;
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Div = styled.div`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Image = styled.img`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export { Div, Image, Flexbox };