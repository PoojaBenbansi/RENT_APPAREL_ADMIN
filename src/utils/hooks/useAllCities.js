import { useState, useEffect } from 'react';
import * as CommonRequest from '../../api/commonRequest';
const UseAllCities = (state_id) => {
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    if (state_id) {
      CommonRequest.getCities(state_id)
        .then((response) => setAllCities(response?.data))
        .catch((error) => console.log(error));
    } else {
      setAllCities([]);
    }
  }, [state_id]);

  return allCities;
};

export default UseAllCities;
