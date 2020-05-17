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

export const Card = styled(Div)`
  padding: 24px;
  box-shadow: rgba(48, 48, 48, 0.12) 0px 4px 16px !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(214, 214, 214) !important;
  border-image: initial !important;
  border-radius: 4px !important;
  background: rgb(255, 255, 255) !important;
  overflow: hidden !important;

  ${Col} {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  ${({ theme: { applyGroove }, ...props }) => applyGroove(props)}
`;