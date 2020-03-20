import styled from "styled-components";


const Flexbox = styled.div`
  display: flex;
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export { Flexbox };