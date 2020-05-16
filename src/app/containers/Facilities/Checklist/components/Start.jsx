import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

// UI
import Text from "@airbnb/lunar/lib/components/Text";
import Button from "@airbnb/lunar/lib/components/Button";
import Input from "@airbnb/lunar/lib/components/Input";
// import Toast from "@airbnb/lunar/lib/components/Toast";
import RadioButtonController from "@airbnb/lunar/lib/components/RadioButtonController";
import { Container, Form, Row, Col, Div } from "ui-kit/components";
import Link from "@airbnb/lunar/lib/components/Link";
import { useHistory } from "react-router-dom";


// Styled component
const CardContainer = styled(Div)`
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
    margin-top: 6px;
    margin-bottom: 6px;
  }
`;

// const Div = styled(Div)`
//   display: flex;
//   align-items: center;
//   padding-left: 10px;

//   section {
//     padding: 0 10px;
//     margin: 0 !important;
//   }
// `;

// Facility search validation schema
const ValidationSchema = yup.object().shape({
  dischargeTo: yup.string().required("Field is required"),
  zip: yup.string().matches(/^[0-9]{5}$/, "Zip Code must be exactly 5 digits"),
  hasBeenDiagnosedWithCovid: yup.string().required("Field is required"),
  hasTwoConsecutiveNegativeCovidTests: yup.string().required("Field is required")
});

const Start = () => {

  // Initialize useForm hook for control inputs and handleSubmit handler
  const {
    control,
    errors,
    formState,
    handleSubmit,
    watch
  } = useForm({
    mode: "onChange",
    nativeValidation: false,
    validationSchema: ValidationSchema
  });

  // Watch zip form value
  const zip = watch("zip");

  // On submit function
  const onSubmit = (data) => console.log(data);

  // Get push from react router history
  const { push } = useHistory();

  // Create push function to navigate user to the facility list
  const pushToFacility = useCallback(() => void push(`/facility/all?zip=${zip}`), [push, zip]);

  return (
    <Container paddingY="20px">
      <Row>
        <Col lg={10} lgOffset={1} md={12}>

          {/* Toast displays will be handled by their handler functions - injecting into screen here */}
          {/* <Div marginBottom="20px">
            { successToast && <Toast success id={successToast?.id} title={successToast?.title} message={successToast?.message} duration={0} /> }
            { dangerToast && <Toast danger id={dangerToast?.id} title={dangerToast?.title} message={dangerToast?.message} duration={0} /> }
          </Div> */}

          <CardContainer>
            {/* Title and description for adding facility */}
            <Div fontSize="24px">Start Discharge Checklist</Div>
            <Text muted>This information may be shared publicly.</Text>

            <Form onSubmit={handleSubmit(onSubmit)} paddingY="20px">
              <Row>

                <Col>
                  <Controller
                    as={RadioButtonController}
                    control={control}
                    name="dischargeTo"
                    label="Where is the patient being discharged to?"
                    invalid={!!errors?.dischargeTo}
                    errorMessage={errors?.dischargeTo?.message}
                    // inline
                  >
                    {(RadioButton) => (
                      <Div>
                        <RadioButton label="Facility" value="facility" />
                        <RadioButton label="Home" value="home" />
                      </Div>
                    )}
                  </Controller>
                </Col>

                <Col>
                  <Controller
                    as={Input}
                    control={control}
                    name="zip"
                    label="Zip Code"
                    placeholder="Enter Zip Code"
                    invalid={!!errors?.zip}
                    errorMessage={errors?.zip?.message}
                    width={300}
                    />
                </Col>

                <Col>
                  <Controller
                    as={RadioButtonController}
                    control={control}
                    name="hasBeenDiagnosedWithCovid"
                    label="Has the patient been diagnosed with COVID??"
                    invalid={!!errors?.hasBeenDiagnosedWithCovid}
                    errorMessage={errors?.hasBeenDiagnosedWithCovid?.message}
                    // inline
                  >
                    {(RadioButton) => (
                      <Div>
                        <RadioButton label="Yes" value="Y" />
                        <RadioButton label="No" value="N" />
                      </Div>
                    )}
                  </Controller>
                </Col>

                <Col>
                  <Controller
                    as={RadioButtonController}
                    control={control}
                    name="hasTwoConsecutiveNegativeCovidTests"
                    label="Two consecutive negative COVID-19 results at least 24 hours apart?"
                    invalid={!!errors?.hasTwoConsecutiveNegativeCovidTests}
                    errorMessage={errors?.hasTwoConsecutiveNegativeCovidTests?.message}
                    // inline
                  >
                    {(RadioButton) => (
                      <Div>
                        <RadioButton label="Yes" value="Y" />
                        <RadioButton label="No" value="N" />
                      </Div>
                    )}
                  </Controller>
                </Col>

                <Col display="flex" alignItems="center" justifyContent="flex-end">
                  <Link onClick={pushToFacility} disabled={!formState.isValid}>See Results</Link>
                  <Div paddingX="6px" />
                  <Button type="submit" disabled={!formState.isValid}>Submit</Button>
                </Col>

              </Row>
            </Form>

          </CardContainer>
        </Col>
      </Row>

    </Container>
  );
}

export default memo(Start);