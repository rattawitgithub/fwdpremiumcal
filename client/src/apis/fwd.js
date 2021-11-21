import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.fwd.co.th/dev-ecommerce'
});
