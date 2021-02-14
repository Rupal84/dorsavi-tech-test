import axios from 'axios';

export const get =  (url) => {
      axios.get(url).then((data)=>{
        console.log(data);
      })
      return []
}