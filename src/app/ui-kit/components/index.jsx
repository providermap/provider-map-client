import styled from "styled-components";
import {
  Container as BootstrapContainer,
  Row as BootstrapRow,
  Col as BootstrapCol
} from "styled-bootstrap-grid";


const Container = styled(BootstrapContainer)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Div = styled.div`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Row = styled(BootstrapRow)`
  margin: 0;
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Col = styled(BootstrapCol)`
  padding: 0;
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Flexbox = styled.div`
  display: flex;
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Image = styled.img`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export { Container, Div, Row, Col, Flexbox, Image };