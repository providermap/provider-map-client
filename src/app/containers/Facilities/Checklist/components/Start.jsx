import React, { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

// UI-Kit
import Text from "@airbnb/lunar/lib/components/Text";
import Button from "@airbnb/lunar/lib/components/Button";
import Input from "@airbnb/lunar/lib/components/Input";
import CheckboxController from "@airbnb/lunar/lib/components/CheckBoxController";
import RadioButtonController from "@airbnb/lunar/lib/components/RadioButtonController";
import Link from "@airbnb/lunar/lib/components/Link";
import { Container, Form, Row, Col, Div, Card } from "ui-kit/components";

// Action creators
import { addChecklistData } from "containers/Facilities/Checklist/store/actions";


// Form validation
const ValidationSchema = yup.object().shape({
  dischargeTo: yup.string().required("Field is required"),
  facilityType: yup.string().when("dischargeTo", {
    is: "facility",
    then: yup.string().required("Field is required"),
  }),
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

  // Watch form values
  const zip = watch("zip");
  const dischargeTo = watch("dischargeTo");
  const facilityType = watch("facilityType");

  // Flag to check if discharge is to facility
  const isDischargingToFacility = useMemo(() => (dischargeTo === "facility"), [dischargeTo]);

  // Get push from react router history
  const { push } = useHistory();

  // Fn to navigate user to the facility list
  const pushToFacility = useCallback(() => void push(`/facility/all?zip=${zip}&facilityType=${facilityType}`), [push, zip, facilityType]);

  // Fn to navigate user to the next step
  const pushToNextStep = useCallback(() => void push("/facility/checklist/2"), [push]);

  // Get dispatch from react-redux
  const dispatch = useDispatch();

  // On submit function
  const onSubmit = (data) => {
    // Add checklist form date to state
    dispatch(addChecklistData(data));

    // Navigate user to the next step
    pushToNextStep();
  }

  return (
    <Container paddingY="20px">
      <Row>
        <Col lg={8} lgOffset={2} md={12}>

          <Card>
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
                  >
                    {(RadioButton) => (
                      <Div>
                        <RadioButton label="Facility" value="facility" />
                        <RadioButton label="Home" value="home" />
                      </Div>
                    )}
                  </Controller>
                </Col>

                { isDischargingToFacility &&
                  <Col>
                    <Controller
                      as={CheckboxController}
                      control={control}
                      name="facilityType"
                      label="If facility, please specify:"
                      invalid={!!errors?.facilityType}
                      errorMessage={errors?.facilityType?.message}
                    >
                      {(Checkbox) => (
                        <Div>
                          <Checkbox label="General Acute Care" value="General Acute Care"/>
                          <Checkbox label="Critical Access" value="Critical Access"/>
                          <Checkbox label="Temporary Facility" value="Temporary Facility"/>
                          <Checkbox label="Psychiatric" value="Psychiatric"/>
                          <Checkbox label="Military" value="Military"/>
                          <Checkbox label="Long Term Care" value="Long Term Care"/>
                          <Checkbox label="Other (please specify)" value="Other"/>
                        </Div>
                      )}
                    </Controller>
                  </Col>
                }

                <Col col="6">
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
                    label="Has the patient been diagnosed with COVID?"
                    invalid={!!errors?.hasBeenDiagnosedWithCovid}
                    errorMessage={errors?.hasBeenDiagnosedWithCovid?.message}
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

          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default memo(Start);