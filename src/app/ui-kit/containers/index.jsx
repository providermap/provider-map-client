import styled from "styled-components";
import { Container as BootstrapContainer } from "styled-bootstrap-grid";

const Container = styled(BootstrapContainer)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Div = styled.div`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Image = styled.img`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export { Container, Div, Image };