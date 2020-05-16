import React, { memo, useState } from "react";
import styled from "styled-components";
import { UsaStates } from "usa-states";
import { useForm, Controller } from "react-hook-form";

// UI
import Text from "@airbnb/lunar/lib/components/Text";
import Button from "@airbnb/lunar/lib/components/Button";
import Input from "@airbnb/lunar/lib/components/Input";
import Toast from "@airbnb/lunar/lib/components/Toast";
import CheckboxController from "@airbnb/lunar/lib/components/CheckBoxController";
import RadioButtonController from "@airbnb/lunar/lib/components/RadioButtonController";
import Select from "@airbnb/lunar/lib/components/Select";
import { Container, Form, Row, Col, Div } from "ui-kit/components";

// Utils
import { db } from "utils/firebase";
import { envPrefix } from "utils/environment";


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

const AddFacility = () => {

  // Initialize useForm hook for control inputs and handleSubmit handler
  const { control, errors, handleSubmit, reset, watch } = useForm();
  // TODO: https://react-hook-form.com/api#validationSchema use this with Yup for validation rules so they are centralized

  // Watch isContactable & facilityType fields for dynamic form flags
  const isContactable = watch("isContactable") === "Y" ? true : false;
  const isOtherFacilityType = watch("facilityType")?.includes("Other") ? true : false;

  // Get usa states for dropdown
  const usaStates = new UsaStates().arrayOf("names");

  const [ { success: successToast, danger: dangerToast }, setToast ] = useState({});
  const setToastWithResetTimeout = (toastConfig) => {
    // Set toast state based on config
    setToast(toastConfig);

    // After duration (ms), reset toast state to de-render the toast message
    setTimeout(() => void setToast({}), toastConfig?.duration);
  }

  // Submit function to submit form to firestore
  const onSubmit = async (formValues) => {
    try {

      // Facility information
      const normalizedFacility = {
        name: formValues?.name,
        address: formValues?.address,
        city: formValues?.city,
        country: "USA" ,
        zip: formValues?.zip,
        // icu_bed_count: , // TODO: CAPTURE
        created_by: "User Submission",
        // source: source, // TODO: CAPTURE*
        // treats_covid: ,// TODO: CAPTURE* (Yes|No|Unknown) RADIO
        source_date: new Date().toISOString(),
        // status: "", // TODO: CAPTURE (Open|Under Construction)* RADIO
        total_bed_count: formValues?.bedCount,
        // telephone: , // TODO: CAPTURE
        type: formValues?.facilityType,
        population: formValues?.staffCount,
        is_submission_user_employee: formValues?.isEmployee,
        user_submission_email: formValues?.email,
        //ventilator_count: , // TODO: CAPTURE
        record_created_date: new Date().toISOString(),
      };

      // Document object to be added to firestore collection
      const document = {
        ...normalizedFacility,

        // Email trigger information
        to: [ "contact@providermap.org" ],
        message: {
          subject: "New Facility Added by User!",
          text: "The following information has been submitted by a user:",
          html: JSON.stringify(normalizedFacility),
        }
      };

      // Add facility document to collection
      await db.collection(`${envPrefix}_facilities_submission`).add(document);

      // Display success toast if submission is successful
      setToastWithResetTimeout({
        success: {
          id: "add_facility_success",
          title: "Success!",
          message: "Thank you for adding a facility! One of our members will now be validating the information then add it our database.",
        },
        duration: 5000
      });

      // Reset the form after successful submit
      reset();
    }
    catch (error) {
      // Display error toast if submission fails
      setToastWithResetTimeout({
        danger: {
          id: "add_facility_success",
          title: "Error.",
          message: "There was an issue adding your facility. Please try again later.",
        },
        duration: 5000
      });
    }
  }

  return (
    <Container paddingY="20px">
      <Row>
        <Col lg={10} lgOffset={1} md={12}>

          {/* Toast displays will be handled by their handler functions - injecting into screen here */}
          <Div marginBottom="20px">
            { successToast && <Toast success id={successToast?.id} title={successToast?.title} message={successToast?.message} duration={0} /> }
            { dangerToast && <Toast danger id={dangerToast?.id} title={dangerToast?.title} message={dangerToast?.message} duration={0} /> }
          </Div>

          <CardContainer>
            {/* Title and description for adding facility */}
            <Div fontSize="24px">Add Facility</Div>
            <Text muted>This information will be shared publicly.</Text>

            <Form onSubmit={handleSubmit(onSubmit)} paddingY="20px">
              <Row>
                <Col>
                  <Controller as={Input} control={control} name="name" label="Facility Name" defaultValue="" />
                </Col>

                <Col lg={4} md={6} xs={12}>
                  <Controller as={Input} control={control} name="address" label="Address" defaultValue="" />
                </Col>

                <Col lg={3} md={6} xs={12}>
                  <Controller as={Input} control={control} name="city" label="City" defaultValue="" />
                </Col>

                <Col lg={3} md={6} xs={6}>
                  <Controller as={Select} control={control} name="state" label="States">
                    { usaStates.map((state) => <option key={state} value={state}>{ state }</option>) }
                  </Controller>
                </Col>

                <Col lg={2} md={6} xs={6}>
                  <Controller as={Input} control={control} name="zip" label="Zip Code" defaultValue="" />
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <Controller
                    as={Input}
                    control={control}
                    name="bedCount"
                    label="Bed Count"
                    defaultValue=""
                    rules={{ validate: (value) => Number.isInteger(Number(value)) }}
                    invalid={errors?.bedCount?.type === "validate"}
                    errorMessage="Please enter a number."
                  />
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <Controller
                    as={Input}
                    control={control}
                    name="staffCount"
                    label="Staff Count"
                    defaultValue=""
                    rules={{ validate: (value) => Number.isInteger(Number(value)) }}
                    invalid={errors?.staffCount?.type === "validate"}
                    errorMessage="Please enter a number."
                    optional
                  />
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    as={CheckboxController}
                    control={control}
                    name="facilityType"
                    label="Type"
                    rules={{ required: true }}
                    invalid={errors?.facilityType?.type === "required"}
                  >
                    { (Checkbox) => (
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

                  {/* Display other facility type input option if user has selected other */}
                  { isOtherFacilityType && <Controller as={Input} control={control} name="facilityTypeOther" defaultValue="" /> }
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    as={RadioButtonController}
                    control={control}
                    name="isEmployee"
                    label="Do you work here?"
                    rules={{ required: true }}
                    invalid={errors?.isEmployee?.type === "required"}
                  >
                    { (RadioButton) => (
                      <Div>
                        <RadioButton label="Yes" value="Y" />
                        <RadioButton label="No" value="N" />
                      </Div>
                    )}
                  </Controller>

                  <Controller
                    as={RadioButtonController}
                    control={control}
                    name="isContactable"
                    label="Can we contact you for more information?"
                    rules={{ required: true }}
                    invalid={errors?.isContactable?.type === "required"}
                  >
                    { (RadioButton) => (
                      <Div>
                        <RadioButton label="Yes" value="Y" />
                        <RadioButton label="No" value="N" />
                      </Div>
                    )}
                  </Controller>

                  {/* Display email option if user has selected that they are contactable */}
                  { isContactable && <Controller as={Input} control={control} name="email" label="Email" defaultValue="" optional /> }
                </Col>


                <Col>
                  <Div marginY="20px">
                    <Button type="submit">Submit</Button>
                  </Div>
                </Col>

              </Row>
            </Form>

          </CardContainer>
        </Col>
      </Row>

    </Container>
  );
}

export default memo(AddFacility);