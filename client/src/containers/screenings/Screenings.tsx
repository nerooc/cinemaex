import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import { ItemList } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';
import Screening from './Screening';
import ScreeningModal from './ScreeningModal';

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

export interface Details {
  open: boolean;
  info: any;
}

interface ScreeningPreviews extends Array<ScreeningPreview> {}

const Screenings: React.FC<Props> = () => {
  const [modalDetails, setModalDetails] = useState<Details>({
    open: false,
    info: {},
  });

  const getScreenings = (): Promise<ScreeningPreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/screenings', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  // useEffect(() => {
  //   console.log(modalDetails);
  // }, [modalDetails]);

  const { status, value, error } = useAsync<ScreeningPreviews>(getScreenings);

  const openModal = (data) => {
    setModalDetails({ open: true, info: data });
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
            <ScreeningModal
              details={modalDetails}
              setDetails={setModalDetails}
            />
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
