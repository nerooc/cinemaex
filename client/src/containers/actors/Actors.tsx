import React from 'react';
import { useHistory } from 'react-router';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import { ItemList, Item } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';

interface Props {}

interface ActorPreview {
  id_actor: number;
  actor_name: string;
  actor_surname: string;
  actor_img: string;
}

interface ActorPreviews extends Array<ActorPreview> {}

const Actors: React.FC<Props> = () => {
  const history = useHistory();

  const actorSelectedHandler = (id: number) => {
    history.push('/actors/' + id);
  };

  const getActors = (): Promise<ActorPreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/actors', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<ActorPreviews>(getActors);

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return value !== null ? (
          <ItemList>
            <ItemList.Return to="/dashboard">
              <FaArrowLeft />
            </ItemList.Return>
            <ItemList.Header>Actors</ItemList.Header>
            <ItemList.Wrapper>
              {value.map((actor) => (
                <Item
                  actor
                  key={actor.id_actor}
                  onClick={() => actorSelectedHandler(actor.id_actor)}
                >
                  <Item.Image src={actor.actor_img} alt="actor-poster" />
                  <Item.Title>
                    {actor.actor_name} {actor.actor_surname}
                  </Item.Title>
                </Item>
              ))}
            </ItemList.Wrapper>
          </ItemList>
        ) : (
          <p>Something went wrong!</p>
        );
    }
  };
  return <>{renderSwitch(status)}</>;
};
export default Actors;
