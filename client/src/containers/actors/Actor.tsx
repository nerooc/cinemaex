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

interface IActor {
  id_actor: number;
  actor_name: string;
  actor_surname: string;
  actor_description: string;
  actor_img: string;
}

const Actor: React.FC<Props> = () => {
  let history = useHistory();
  const params: Params = useParams();

  const getActor = (): Promise<IActor> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/actors/' + params.id, {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<IActor>(getActor);

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
                  {value?.actor_name} {value?.actor_surname}
                </FullItem.Header>
                <FullItem.AdditionalInfo>
                  <FullItem.Info>Additional Information</FullItem.Info>
                </FullItem.AdditionalInfo>
                <FullItem.Description>
                  {value?.actor_description}
                </FullItem.Description>
              </FullItem.Text>
              <FullItem.Image src={value?.actor_img} alt="actor-preview" />
            </FullItem.Wrapper>
          </FullItem>
        ) : (
          <p>Something went wrong!</p>
        );
    }
  };

  return <>{renderSwitch(status)}</>;
};

export default Actor;
