import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import Reservation from './Reservation';
import Loading from '../common/Loading';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import breakpoints from '../../constants/breakpoints';
import colors from '../../constants/colors';

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

const Return = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.secondaryBackground};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  top: 16%;
  left: 160px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
  background-color: ${colors.primaryColor};

  &:hover {
    cursor: pointer;
  }

  ${breakpoints.desktop} {
    left: 30px;
    height: 40px;
    width: 40px;
    font-size: 20px;
  }
`;

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
          <Return to="/dashboard">
            <FaArrowLeft />
          </Return>
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
