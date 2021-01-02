import React from 'react';
import { useHistory } from 'react-router';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import { ItemList, Item } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';

interface Props {}

interface DirectorPreview {
  id_director: number;
  director_name: string;
  director_surname: string;
  director_img: string;
}

interface DirectorPreviews extends Array<DirectorPreview> {}

const Directors: React.FC<Props> = () => {
  const history = useHistory();

  const directorSelectedHandler = (id: number) => {
    history.push('/directors/' + id);
  };

  const getDirectors = (): Promise<DirectorPreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/directors', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<DirectorPreviews>(getDirectors);

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
            <ItemList.Header>Directors</ItemList.Header>
            <ItemList.Wrapper>
              {value.map((director) => (
                <Item
                  director
                  key={director.id_director}
                  onClick={() => directorSelectedHandler(director.id_director)}
                >
                  <Item.Image
                    src={director.director_img}
                    alt="director-poster"
                  />
                  <Item.Title>
                    {director.director_name} {director.director_surname}
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
export default Directors;
