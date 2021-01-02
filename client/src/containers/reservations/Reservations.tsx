import React, { useState } from 'react';
import axios from '../../utils/axios';
import { parseDate } from '../../utils/parseDate';
import { useAsync } from '../../hooks/useAsync';
import Reservation from './Reservation';
import { FaArrowLeft } from 'react-icons/fa';

interface Props {}

export interface ReservationPreview {
  movie_title: string;
  screening_date: string;
  screening_hour: string;
  id_reservation: number;
  reservation_date: string;
  reservation_hour: string;
  id_user: number;
}

interface ReservationArray extends Array<ReservationPreview> {}

const Reservations: React.FC<Props> = () => {
  const getReservations = (): Promise<ReservationArray> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/reservations', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { execute, status, value, error } = useAsync<ReservationArray>(
    getReservations
  );

  return (
    <div>
      {status === 'pending' && <div>Loading...</div>}

      {status === 'success' &&
        value?.length !== 0 /* @ts-ignore */ &&
        value.map((reservation) => (
          <Reservation
            data={reservation}
            key={reservation.id_reservation}
            refresh={execute}
          />
        ))}

      {status === 'success' && value?.length === 0 && (
        <div>No reservations assigned to this account!</div>
      )}
      {status === 'error' && <div>{error}</div>}
    </div>
  );
};
export default Reservations;
