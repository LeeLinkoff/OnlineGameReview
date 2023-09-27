import React from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function CustomHeader() {
  return (
    <MDBRow>
      <MDBCol sm='8' className='mb-3 mb-md-0'>
        <MDBCard>
          <MDBCardBody text='dark'>
            <MDBCardTitle>Online Game Reviewer</MDBCardTitle>
                  </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}