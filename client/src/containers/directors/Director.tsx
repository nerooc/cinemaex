import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import { FullItem } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';

interface Props {}

interface Params {
  id: string;
}

interface IDirector {
  id_director: number;
  director_name: string;
  director_surname: string;
  director_description: string;
  director_img: string;
}

const Director: React.FC<Props> = () => {
  let history = useHistory();
  const params: Params = useParams();

  const getDirector = (): Promise<IDirector> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/directors/' + params.id, {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<IDirector>(getDirector);

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return value !== null ? (
          <FullItem>
            <FullItem.Wrapper>
              <FullItem.Return
                onClick={() => {
                  history.goBack();
                }}
              >
                <FaArrowLeft />
              </FullItem.Return>
              <FullItem.Text>
                <FullItem.Header>
                  {value?.director_name} {value?.director_surname}
                </FullItem.Header>
                <FullItem.AdditionalInfo>
                  <FullItem.Info>Additional Information</FullItem.Info>
                </FullItem.AdditionalInfo>
                <FullItem.Description>
                  {value?.director_description}
                </FullItem.Description>
              </FullItem.Text>
              <FullItem.Image
                src={value?.director_img}
                alt="director-preview"
              />
            </FullItem.Wrapper>
          </FullItem>
        ) : (
          <p>Something went wrong!</p>
        );
    }
  };

  return <>{renderSwitch(status)}</>;
};

export default Director;
