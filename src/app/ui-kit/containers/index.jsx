import styled from "styled-components";
import AirBnBLayout from '@airbnb/lunar-layouts/lib/components/Layout'

const Layout = styled(AirBnBLayout)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Div = styled.div`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Image = styled.img`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export { Layout, Div, Image };