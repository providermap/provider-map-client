import styled from "styled-components";
import { Row as BootstrapRow, Col as BootstrapCol } from "styled-bootstrap-grid";


const Row = styled(BootstrapRow)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

const Col = styled(BootstrapCol)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export { Col, Row };