import React, { useState } from 'react';
import axios from '../../utils/axios';
import { parseDate } from '../../utils/parseDate';
import { useAsync } from '../../hooks/useAsync';
import Reservation from './Reservation';
import { FaArrowLeft } from 'react-icons/fa';
import Loading from '../common/Loading';

interface Props {}

export interface ReservationPreview {
  movie_title: string;
  screening_date: string;
  screening_hour: string;
  id_reservation: number;
  reservation_date: string;
  reservation_hour: string;
  reservation_seatcount: number;
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
      {status === 'pending' && (
        <Loading type="spinningBubbles" color="#5A38FD" />
      )}

      {status === 'success' && value?.length !== 0 && (
        <>
          <h1 style={{ textAlign: 'center', margin: '50px 0' }}>
            Your reservations
          </h1>
          {
            /* @ts-ignore */
            value.map((reservation) => (
              <Reservation
                data={reservation}
                key={reservation.id_reservation}
                refresh={execute}
              />
            ))
          }
        </>
      )}

      {status === 'success' && value?.length === 0 && (
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
          No reservations assigned to this account!
        </h1>
      )}
      {status === 'error' && <div>{error}</div>}
    </div>
  );
};
export default Reservations;
