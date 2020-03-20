import React, { useState, useEffect } from "react";
import axios from "axios";

// U-Kit
import { Container, Div } from "../../ui-kit/containers";
import { Flexbox } from "../../ui-kit/flexbox";
import { Header, Text } from "../../ui-kit/text";

const Home = () => {

  // Local state to store facilities
  const [ facilities, setFacilities ] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      // Make API call to get random person
      const facilitiesResponse = await axios("http://localhost:8080/api/facility/all");
      console.log("fetchFacilities -> facilitiesResponse", facilitiesResponse)

      // Set random person in local state
      setFacilities(facilitiesResponse?.data);
    };

    // Call the fetch facilities async method
    fetchFacilities();
  }, []);

  const sampleFacility = facilities[0];
  console.log("Home -> sampleFacility", sampleFacility)

  return (
    <Container>
      <Header>Facilities</Header>
      <Text bold={true}>{`(${facilities?.length})`}</Text>

      <Div>
        <Flexbox alignItems="center">
          <Div>
            <Text>{ sampleFacility?.name }</Text>
            <Text>{ sampleFacility?.address }</Text>
          </Div>

        </Flexbox>
      </Div>

      { JSON.stringify(facilities) }
    </Container>
  );
}

export default Home;