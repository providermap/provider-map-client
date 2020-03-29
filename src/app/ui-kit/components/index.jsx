import styled from "styled-components";
import {
  Container as BootstrapContainer,
  Row as BootstrapRow,
  Col as BootstrapCol
} from "styled-bootstrap-grid";


export const Container = styled(BootstrapContainer)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export const Form = styled.form`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export const Div = styled.div`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export const Row = styled(BootstrapRow)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export const Col = styled(BootstrapCol)`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export const Flexbox = styled.div`
  display: flex;
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;

export const Image = styled.img`
  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;