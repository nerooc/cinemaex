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
      zIndex: 9999,
      width: '80%',
      height: '30%',
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

    const body = {
      id_screening: details.info.id_screening,
      seatCount: seatCount,
    };
    try {
      const response = await axios.post('/reservations', body, {
        headers: {
          token: localStorage.token,
        },
      });

      if (response.data) {
        toast.success(response.data, toastConfig);
      }
    } catch (err) {
      toast.error(err.response.data, toastConfig);
    }
  };

  const handleAddrTypeChange = (e) => {
    setSeatCount(e.target.value);
  };

  return (
    <Modal isOpen={details.open} style={customStyles}>
      <ModalContent>
        <ModalContent.Select onChange={(e) => handleAddrTypeChange(e)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </ModalContent.Select>
        <button onClick={() => setDetails({ ...details, open: false })}>
          Hehe
        </button>

        <button onClick={insertReservation}> submit </button>

        {details.info.movie_title}
      </ModalContent>
    </Modal>
  );
};

export default ScreeningModal;
