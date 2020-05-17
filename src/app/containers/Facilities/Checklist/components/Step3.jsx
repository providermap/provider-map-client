import React, { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

// UI-Kit
import Button from "@airbnb/lunar/lib/components/Button";
import Input from "@airbnb/lunar/lib/components/Input";
import RadioButtonController from "@airbnb/lunar/lib/components/RadioButtonController";
import CheckboxController from "@airbnb/lunar/lib/components/CheckBoxController";
import TextArea from "@airbnb/lunar/lib/components/TextArea";
import { Container, Form, Row, Col, Div, Card } from "ui-kit/components";

// Action creators
import { generateChecklistDataPDF } from "containers/Facilities/Checklist/store/actions";

// Selectors
import { getChecklistData } from "containers/Facilities/Checklist/store/selectors";


// Form validation
const ValidationSchema = yup.object().shape({
  cognitiveStatus: yup.string().required("Field is required"),
  cognitiveStatusOther: yup.string().when("cognitiveStatus", {
    is: (cognitiveStatus) => cognitiveStatus?.includes("Other"),
    then: yup.string().required("Field is required")
  }),
  behavioralCharacteristics: yup.string().required("Field is required"),
  behavioralCharacteristicsOther: yup.string().when("behavioralCharacteristics", {
    is: (behavioralCharacteristics) => behavioralCharacteristics?.includes("Other"),
    then: yup.string().required("Field is required")
  }),
  mobility: yup.string().required("Field is required"),
  mobilityOther: yup.string().when("mobility", {
    is: (mobility) => mobility?.includes("Other"),
    then: yup.string().required("Field is required")
  }),
  continence: yup.string().required("Field is required"),
  continenceOther: yup.string().when("continence", {
    is: (continence) => continence?.includes("Other"),
    then: yup.string().required("Field is required")
  }),
  activity: yup.string().required("Field is required"),
  activityOther: yup.string().when("activity", {
    is: (activity) => activity?.includes("Other"),
    then: yup.string().required("Field is required")
  }),
  agreedToGoals: yup.string().required("Field is required"),
  agreedToGoalsDescription: yup.string().when("agreedToGoals", {
    is: (agreedToGoals) => agreedToGoals === "Y",
    then: yup.string().required("Field is required")
  }),
});

const Step3 = () => {

  // Non-complete checklist form state data (previous steps)
  const nonCompleteChecklistData = useSelector(getChecklistData);

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
  const cognitiveStatus = watch("cognitiveStatus");
  const behavioralCharacteristics = watch("behavioralCharacteristics");
  const mobility = watch("mobility");
  const continence = watch("continence");
  const activity = watch("activity");
  const agreedToGoals = watch("agreedToGoals");

  // Form value flags
  const isCognitiveStatusOther = useMemo(() => (cognitiveStatus?.includes("Other")), [cognitiveStatus]);
  const isBehavioralCharacteristicsOther = useMemo(() => (behavioralCharacteristics?.includes("Other")), [behavioralCharacteristics]);
  const isMobilityOther = useMemo(() => (mobility?.includes("Other")), [mobility]);
  const isContinenceOther = useMemo(() => (continence?.includes("Other")), [continence]);
  const isActivityOther = useMemo(() => (activity?.includes("Other")), [activity]);
  const hasAgreedToGoals = useMemo(() => (agreedToGoals === "Y"), [agreedToGoals]);

  // Get dispatch from react-redux
  const dispatch = useDispatch();

  // On submit function
  const onSubmit = (data) => {
    // Combine previous steps data with this final step and fire off action to generate PDF
    const completeChecklistData = {
      ...nonCompleteChecklistData,
      ...data
    }
    // Add checklist form date to state
    dispatch(generateChecklistDataPDF(completeChecklistData));
  }

  return (
    <Container paddingY="20px">
      <Row>
        <Col lg={8} lgOffset={2} md={12}>

          <Card>
            {/* Title and description for adding facility */}
            <Div fontSize="24px">Cognitive and Functional Status</Div>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate paddingY="20px">
              <Row>

                <Col col="6">
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="cognitiveStatus"
                    label="Cognitive Status"
                    invalid={!!errors?.cognitiveStatus}
                    errorMessage={errors?.cognitiveStatus?.message}
                  >
                    {(Checkbox) => (
                      <Div>
                        <Checkbox label="Alert and Oriented" value="Alert and Oriented"/>
                        <Checkbox label="Obtunded" value="Obtunded"/>
                        <Checkbox label="Unconscious" value="Unconscious"/>
                        <Checkbox label="Other (please specify)" value="Other"/>
                      </Div>
                    )}
                  </Controller>

                  { isCognitiveStatusOther &&
                    <Controller
                      as={Input}
                      control={control}
                      name="cognitiveStatusOther"
                      invalid={!!errors?.cognitiveStatusOther}
                      errorMessage={errors?.cognitiveStatusOther?.message}
                    />
                  }
                </Col>

                <Col col="6">
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="behavioralCharacteristics"
                    label="Behavioral Characteristics"
                    invalid={!!errors?.behavioralCharacteristics}
                    errorMessage={errors?.behavioralCharacteristics?.message}
                  >
                    {(Checkbox) => (
                      <Div>
                        <Checkbox label="Aggressive / Violent" value="Aggressive / Violent"/>
                        <Checkbox label="Suicidal / Depressive" value="Suicidal / Depressive"/>
                        <Checkbox label="Other (please specify)" value="Other"/>
                      </Div>
                    )}
                  </Controller>

                  { isBehavioralCharacteristicsOther &&
                    <Controller
                      as={Input}
                      control={control}
                      name="behavioralCharacteristicsOther"
                      invalid={!!errors?.behavioralCharacteristicsOther}
                      errorMessage={errors?.behavioralCharacteristicsOther?.message}
                      />
                  }
                </Col>

                <Col col="6">
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="mobility"
                    label="Mobility"
                    invalid={!!errors?.mobility}
                    errorMessage={errors?.mobility?.message}
                  >
                    {(Checkbox) => (
                      <Div>
                        <Checkbox label="Fully weight bearing" value="Fully weight bearing"/>
                        <Checkbox label="Not fully weight bearing" value="Not fully weight bearing"/>
                        <Checkbox label="Other (please specify)" value="Other"/>
                      </Div>
                    )}
                  </Controller>

                  { isMobilityOther &&
                    <Controller
                      as={Input}
                      control={control}
                      name="mobilityOther"
                      invalid={!!errors?.mobilityOther}
                      errorMessage={errors?.mobilityOther?.message}
                      />
                  }
                </Col>

                <Col col="6">
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="continence"
                    label="Continence"
                    invalid={!!errors?.continence}
                    errorMessage={errors?.continence?.message}
                  >
                    {(Checkbox) => (
                      <Div>
                        <Checkbox label="Continent" value="Continent"/>
                        <Checkbox label="Incontinent" value="Incontinent"/>
                        <Checkbox label="Other (please specify)" value="Other"/>
                      </Div>
                    )}
                  </Controller>

                  { isContinenceOther &&
                    <Controller
                      as={Input}
                      control={control}
                      name="continenceOther"
                      invalid={!!errors?.continenceOther}
                      errorMessage={errors?.continenceOther?.message}
                      />
                  }
                </Col>

                <Col col="6">
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="activity"
                    label="Activity Daily Living"
                    invalid={!!errors?.activity}
                    errorMessage={errors?.activity?.message}
                  >
                    {(Checkbox) => (
                      <Div>
                        <Checkbox label="Independent" value="Independent"/>
                        <Checkbox label="Partially Dependent" value="Partially Dependent"/>
                        <Checkbox label="Dependent" value="Dependent"/>
                        <Checkbox label="Other (please specify)" value="Other"/>
                      </Div>
                    )}
                  </Controller>

                  { isActivityOther &&
                    <Controller
                      as={Input}
                      control={control}
                      name="activityOther"
                      invalid={!!errors?.activityOther}
                      errorMessage={errors?.activityOther?.message}
                      />
                  }
                </Col>

                <Col>
                  <Controller
                    as={RadioButtonController}
                    control={control}
                    name="agreedToGoals"
                    label="Has the patient agreed to agreed upon care goals?"
                    invalid={!!errors?.agreedToGoals}
                    errorMessage={errors?.agreedToGoals?.message}
                  >
                    {(RadioButton) => (
                      <Div>
                        <RadioButton label="No" value="N" />
                        <RadioButton label="Yes (Please list)" value="Y" />
                      </Div>
                    )}
                  </Controller>

                  { hasAgreedToGoals &&
                    <Controller
                      as={TextArea}
                      control={control}
                      name="agreedToGoalsDescription"
                      invalid={!!errors?.agreedToGoalsDescription}
                      errorMessage={errors?.agreedToGoalsDescription?.message}
                    />
                  }
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

export default memo(Step3);