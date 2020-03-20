import styled from "styled-components";


const Text = styled.p`
  font-size: 12px;
  line-height: 1.71;
  letter-spacing: 0.9px;
  display: inline-block;

  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Header = styled.p`
  font-size: 16px;
  letter-spacing: 0.9px;
  display: inline-block;

  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export { Text, Header };