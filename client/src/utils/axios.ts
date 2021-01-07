import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  //http://localhost:5000/api
  //https://cinemaex.herokuapp.com/api
});

export default instance;
