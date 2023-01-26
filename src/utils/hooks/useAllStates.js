import { useState, useEffect } from 'react';
import * as CommonRequest from '../../api/commonRequest';
const UseAllState = () => {
  const [allStates, setAllStates] = useState([]);

  useEffect(() => {
    CommonRequest.getStates()
      .then((response) => setAllStates(response?.data))
      .catch((error) => console.log(error));
  }, []);

  return allStates;
};

export default UseAllState;
