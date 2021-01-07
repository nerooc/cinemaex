import React from 'react';
import axios from '../../utils/axios';
import { ReservationPreview } from './Reservations';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/toastConfig';
import styled from 'styled-components';

interface Props {
  data: ReservationPreview;
  key: number;
  refresh: () => Promise<void>;
}

const Reservation: React.FC<Props> = ({ data, refresh }) => {
  const deleteReservation = async (id) => {
    try {
      const { data } = await axios.delete(`/reservations/${id}`, {
        headers: {
          token: localStorage.token,
        },
      });

      if (data) {
        toast.success(data, toastConfig);
        refresh();
      }
    } catch (err) {
      toast.error(err.data, toastConfig);
    }
  };

  const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    width: 100px;
    background-color: #5a38fd;
    border: none;
    border-radius: 25px;
    font-family: Quicksand;
    font-size: 16px;
    color: white;
    font-weight: bold;
    margin-top: 20px;
    transition: 0.2s;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        margin: 'auto',
        padding: '20px',
        backgroundColor: 'transparent',
        border: '3px solid #5A38FD',
        borderRadius: '25px',
        marginBottom: '30px',
      }}
    >
      <ul
        style={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          listStyle: 'none',
          fontWeight: 'bold',
          fontSize: '20px',
          textAlign: 'center',
        }}
      >
        <h2>{data.movie_title}</h2>
        <br />
        <li>Date: {data.screening_date}</li>
        <li>Hour: {data.screening_hour}</li>
        <li>Reservation ID: {data.id_reservation}</li>
        <br />
        <li>Reservation date: {data.reservation_date}</li>
        <li>Reservation hour: {data.reservation_hour}</li>
        <li>Reservation count: {data.reservation_seatcount}</li>
        <Button
          onClick={() => {
            deleteReservation(data.id_reservation);
          }}
        >
          CANCEL
        </Button>
      </ul>

      <br />
    </div>
  );
};

export default Reservation;
