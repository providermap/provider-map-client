import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";

// UI
import Card from "@airbnb/lunar/lib/components/Card";
import Button from "@airbnb/lunar/lib/components/Button";
import { Div } from "ui-kit/components";
import Text from "@airbnb/lunar/lib/components/Text";


const StartChecklistBanner = () => {

  // Get push from react-router
  const { push } = useHistory();

  // Create push function to navigate user to the checklist workflow
  const pushToChecklist = useCallback(() => push("/facility/checklist/1"), [push]);

  return (
    <Div marginTop="20px">
      <Card>
        <Div display="flex" alignItems="center" justifyContent="space-between" padding="20px">
          <Div>
            <Text large>
              Breeze through discharge planning in just a few minutes.
            </Text>
            <Text muted small>
              You shouldn’t be spending time filling out forms. Collaborate on a comprehensive discharge checklist 
              to provide the right care at the right place at the right time. The best part? Referral forms are auto-populated 
              for thousands of postacute care facilities, so you do the work once and let us handle the rest.
            </Text>
          </Div>

          <Div width="300px" textAlign="right">
            <Button onClick={pushToChecklist} small>Start Checklist</Button>
          </Div>
        </Div>
      </Card>
    </Div>
  );
}

export default memo(StartChecklistBanner);