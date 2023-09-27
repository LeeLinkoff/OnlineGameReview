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
import GameDataTable from './GameDataTable';

export default function GameListings() {
  return (
    <MDBRow>
      <MDBCol sm='8' className='mb-3 mb-md-0'>
        <MDBCard>
          <MDBCardBody text='dark'>
            <GameDataTable/>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}