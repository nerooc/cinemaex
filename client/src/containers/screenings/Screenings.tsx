import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import { ItemList } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';
import Screening from './Screening';
import Modal from 'react-modal';

Modal.setAppElement('#root');
//http://reactcommunity.org/react-modal/accessibility/

interface Props {}

export interface ScreeningPreview {
  id_movie: number;
  id_screening: number;
  movie_title: string;
  movie_duration: string;
  movie_img: string;
  screening_price: number;
  screening_date: string;
  screening_hour: string;
}

interface ScreeningPreviews extends Array<ScreeningPreview> {}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Screenings: React.FC<Props> = () => {
  const [modalIsOpen, setModalIsOpen] = useState({ open: false, info: {} });

  const getScreenings = (): Promise<ScreeningPreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/screenings', {
          headers: {
            token: localStorage.token,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };

  useEffect(() => {
    console.log(modalIsOpen);
  }, [modalIsOpen]);

  const { status, value, error } = useAsync<ScreeningPreviews>(getScreenings);

  const openModal = (data) => {
    setModalIsOpen({ open: true, info: data });
  };

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return value !== null ? (
          <>
            <Modal isOpen={modalIsOpen.open} style={customStyles}>
              <button
                onClick={() => setModalIsOpen({ ...modalIsOpen, open: false })}
              >
                Hehe
              </button>
            </Modal>
            <ItemList>
              <ItemList.Return to="/dashboard">
                <FaArrowLeft />
              </ItemList.Return>
              <ItemList.Header>Screenings</ItemList.Header>
              <ItemList.Wrapper>
                {value.map((screening) => (
                  <Screening
                    key={screening.id_screening}
                    data={screening}
                    handleClick={openModal}
                  />
                ))}
              </ItemList.Wrapper>
            </ItemList>
          </>
        ) : (
          <p>Something went wrong!</p>
        );
    }
  };
  return <>{renderSwitch(status)}</>;
};
export default Screenings;
