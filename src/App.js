import React, { useEffect, useState } from 'react';
import Spinner from '@components/Spinner';
import Tabs from '@components/Tabs';
import Search from '@components/Search';
import { API_URL } from '@constants/ConfigConstants';
import axios from 'axios';

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(data)) {
      setData(localStorage.getItem(data));
    }
  }, [])

  const onHandleInputChange = (value) => {
    setSearchValue(value);
  }

  const onSearch = async () => {
    const url = `${API_URL}/search?q=${searchValue}&media_type=image`;
    setIsLoading(true);
    const response = await axios.get(url).then(res => {
      const { data } = res;
      if (data.collection) {
        setData(data.collection.items);
        localStorage.setItem('data', data.collection.items);
        setIsLoading(false);
      }
    })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }

  return (
    <div className="App">
      <div>
        <Spinner isLoading={isLoading}>
          <h1>Nasa Image Application</h1>
          <Search onChange={onHandleInputChange} onClick={onSearch} />
          <Spinner isLoading={false}>
            <Tabs>
              <div label="All data">
                This is content of tab.
              </div>
              <div label="Liked data">
                This is content of tab.
              </div>
              <div label="Removed data">
                This is content of tab.
              </div>
            </Tabs>
          </Spinner>
        </Spinner>
      </div>
    </div>
  );
}

export default App;
