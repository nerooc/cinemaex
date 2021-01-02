import React from 'react';
import { parseDate } from '../../utils/parseDate';
import axios from '../../utils/axios';
import { ReservationPreview } from './Reservations';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/toastConfig';

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

  return (
    <div>
      <ul>
        <li>{data.movie_title}</li>
        <li>{data.screening_date}</li>
        <li>{data.screening_hour}</li>
        <li>{data.id_reservation}</li>
        <li>{data.reservation_date}</li>
        <li>{data.reservation_hour}</li>
      </ul>

      <button
        onClick={() => {
          deleteReservation(data.id_reservation);
        }}
      >
        DELETE
      </button>
      <br />
    </div>
  );
};

export default Reservation;
