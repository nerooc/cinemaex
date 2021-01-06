import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { ModalContent } from '../../components';
import { ScreeningPreview, Details } from './Screenings';
import { toastConfig } from '../../constants/toastConfig';

Modal.setAppElement('#root');
//http://reactcommunity.org/react-modal/accessibility/

interface Props {
  details: Details;
  setDetails: React.Dispatch<
    React.SetStateAction<{ open: boolean; info: ScreeningPreview | {} }>
  >;
}

const ScreeningModal: React.FC<Props> = ({ details, setDetails }) => {
  const customStyles = {
    content: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      width: '60%',
      height: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },

    overlay: { zIndex: 1000 },
  };

  const [seatCount, setSeatCount] = useState(1);

  const insertReservation = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setDetails({ ...details, open: false });

    const body = {
      id_screening: details.info.id_screening,
      seatCount: seatCount,
    };
    try {
      const { data } = await axios.post('/reservations', body, {
        headers: {
          token: localStorage.token,
        },
      });

      if (data) {
        toast.success(data, toastConfig);
      }
    } catch (err) {
      toast.error(err.data, toastConfig);
    }
  };

  const handleAddrTypeChange = (e) => {
    setSeatCount(e.target.value);
  };

  return (
    <Modal isOpen={details.open} style={customStyles}>
      <ModalContent>
        <ModalContent.Header>Ticket reservation</ModalContent.Header>
        <p>
          Movie:{' '}
          <span style={{ fontWeight: 'bold' }}>{details.info.movie_title}</span>
        </p>
        <p>
          When:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {details.info.screening_date} {details.info.screening_hour}
          </span>
        </p>
        <p>
          Price:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {details.info.screening_price}$
          </span>
        </p>
        How many tickets?
        <ModalContent.Select onChange={(e) => handleAddrTypeChange(e)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </ModalContent.Select>
        <ModalContent.Exit
          onClick={() => setDetails({ ...details, open: false })}
        >
          x
        </ModalContent.Exit>
        <ModalContent.Button onClick={insertReservation}>
          SUBMIT
        </ModalContent.Button>
      </ModalContent>
    </Modal>
  );
};

export default ScreeningModal;
