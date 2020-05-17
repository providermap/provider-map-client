import React, { memo, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

// UI-Kit
import Text from "@airbnb/lunar/lib/components/Text";
import Button from "@airbnb/lunar/lib/components/Button";
import DatePickerInput from '@airbnb/lunar/lib/components/DatePickerInput'
import Input from "@airbnb/lunar/lib/components/Input";
import CheckboxController from "@airbnb/lunar/lib/components/CheckBoxController";
import RadioButtonController from "@airbnb/lunar/lib/components/RadioButtonController";
import { Container, Form, Row, Col, Div, Card } from "ui-kit/components";

// Action creators
import { addChecklistData } from "containers/Facilities/Checklist/store/actions";


// Form validation
const ValidationSchema = yup.object().shape({
  paymentInformation: yup.string().required("Field is required"),
  paymentInformationOther: yup.string().when("paymentInformation", {
    is: (paymentInformation) => paymentInformation?.includes("Other"),
    then: yup.string().required("Field is required")
  }),
  dateOfDiagnosis: yup.date().required("Field is required"),
  primaryDiagnosis: yup.string().required("Field is required"),
  otherDiagnosis: yup.string().required("Field is required"),
  treatmentsRequired: yup.string().required("Field is required"),
  treatmentsRequiredOther: yup.string().when("treatmentsRequired", {
    is: (treatmentsRequired) => treatmentsRequired?.includes("Other"),
    then: yup.string().required("Field is required")
  }),
  allergies: yup.string().required("Field is required"),
  allergiesDescription: yup.string().when("allergies", {
    is: (allergies) => allergies === "Y",
    then: yup.string().required("Field is required")
  }),
  historyOfFalls: yup.string().required("Field is required")
});

const Step2 = () => {

  // Initialize useForm hook for control inputs and handleSubmit handler
  const {
    control,
    errors,
    handleSubmit,
    watch
  } = useForm({
    nativeValidation: false,
    validationSchema: ValidationSchema
  });

  // Watch form values
  const paymentInformation = watch("paymentInformation");
  const treatmentsRequired = watch("treatmentsRequired");
  const allergies = watch("allergies");

  // Form value flags
  const isPaymentInformationOther = useMemo(() => (paymentInformation?.includes("Other")), [paymentInformation]);
  const isTreatmentsRequiredOther = useMemo(() => (treatmentsRequired?.includes("Other")), [treatmentsRequired]);
  const hasAllergies = useMemo(() => (allergies == "Y"), [allergies]);

  // Get push from react router history
  const { push } = useHistory();

  // Fn to navigate user to the next step
  const pushToNextStep = useCallback(() => void push("/facility/checklist/3"), [push]);

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
            <Div fontSize="24px">Medical and Payment Information</Div>
            <Text muted>
              For this section, please provide a listing of medical diagnoses, comorbid diseases and complications, and procedures based on a review of the patient’s clinical records available at the time of assessment.
            </Text>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate paddingY="20px">
              <Row>

                <Col col="6">
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="paymentInformation"
                    label="Payment Information"
                    invalid={!!errors?.paymentInformation}
                    errorMessage={errors?.paymentInformation?.message}
                  >
                    {(Checkbox) => (
                      <Div>
                        <Checkbox label="No Insurance" value="No Insurance"/>
                        <Checkbox label="Medicare" value="Medicare"/>
                        <Checkbox label="Medicaid" value="Medicaid"/>
                        <Checkbox label="Private" value="Private"/>
                        <Checkbox label="Other (please specify)" value="Other"/>
                      </Div>
                    )}
                  </Controller>

                  { isPaymentInformationOther &&
                    <Controller
                      as={Input}
                      control={control}
                      name="paymentInformationOther"
                      invalid={!!errors?.paymentInformationOther}
                      errorMessage={errors?.paymentInformationOther?.message}
                    />
                  }
                </Col>

                <Col col="6">
                  <Controller
                    as={DatePickerInput}
                    control={control}
                    name="dateOfDiagnosis"
                    label="Date Of Diagnosis"
                    placeholder="01/01/000"
                    autoComplete="false" // TODO: Make autocomplete disabled so the suggestions dont cover the date input
                    invalid={!!errors?.dateOfDiagnosis}
                    errorMessage={errors?.dateOfDiagnosis?.message}
                  />
                </Col>

                <Col col="6">
                  <Controller
                    as={Input}
                    control={control}
                    name="primaryDiagnosis"
                    label="Primary Diagnosis"
                    invalid={!!errors?.primaryDiagnosis}
                    errorMessage={errors?.primaryDiagnosis?.message}
                  />
                </Col>

                <Col col="6">
                  <Controller
                    as={Input}
                    control={control}
                    name="otherDiagnosis"
                    label="Other Diagnosis"
                    invalid={!!errors?.otherDiagnosis}
                    errorMessage={errors?.otherDiagnosis?.message}
                  />
                </Col>

                <Col col="6">
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="treatmentsRequired"
                    label="Treatments Required"
                    invalid={!!errors?.treatmentsRequired}
                    errorMessage={errors?.treatmentsRequired?.message}
                  >
                    {(Checkbox) => (
                      <Div>
                        <Checkbox label="Feeding Tube" value="Feeding Tube"/>
                        <Checkbox label="Dialysis" value="Dialysis"/>
                        <Checkbox label="Continuous Cardiac Monitoring" value="Continuous Cardiac Monitoring"/>
                        <Checkbox label="High O2 Concentration Delivery System" value="High O2 Concentration Delivery System"/>
                        <Checkbox label="Complex Wound Management" value="Complex Wound Management"/>
                        <Checkbox label="Ventilator" value="Ventilator"/>
                        <Checkbox label="Multiple Types of IV Administration" value="Multiple Types of IV Administration"/>
                        <Checkbox label="Other (please specify)" value="Other"/>
                      </Div>
                    )}
                  </Controller>

                  { isTreatmentsRequiredOther &&
                    <Controller
                      as={Input}
                      control={control}
                      name="treatmentsRequiredOther"
                      invalid={!!errors?.treatmentsRequiredOther}
                      errorMessage={errors?.treatmentsRequiredOther?.message}
                      />
                  }
                </Col>

                <Col col="6">
                  <Row>
                    <Col>
                      <Controller
                        as={RadioButtonController}
                        control={control}
                        name="allergies"
                        label="Allergies"
                        invalid={!!errors?.allergies}
                        errorMessage={errors?.allergies?.message}
                      >
                        {(RadioButton) => (
                          <Div>
                            <RadioButton label="Yes (Please list)" value="Y" />
                            <RadioButton label="No" value="N" />
                          </Div>
                        )}
                      </Controller>

                      { hasAllergies &&
                        <Controller
                          as={Input}
                          control={control}
                          name="allergiesDescription"
                          invalid={!!errors?.allergiesDescription}
                          errorMessage={errors?.allergiesDescription?.message}
                        />
                      }
                    </Col>

                    <Col>
                      <Controller
                        as={RadioButtonController}
                        control={control}
                        name="historyOfFalls"
                        label="History of Falls"
                        invalid={!!errors?.historyOfFalls}
                        errorMessage={errors?.historyOfFalls?.message}
                      >
                        {(RadioButton) => (
                          <Div>
                            <RadioButton label="Yes" value="Y" />
                            <RadioButton label="No" value="N" />
                          </Div>
                        )}
                      </Controller>
                    </Col>
                  </Row>
                </Col>

                <Col display="flex" alignItems="center" justifyContent="flex-end">
                  {/* <Link onClick={pushToFacility} disabled={!formState.isValid}>See Results</Link>
                  <Div paddingX="6px" /> */}
                  <Button type="submit">Submit</Button>
                </Col>

              </Row>
            </Form>

          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default memo(Step2);