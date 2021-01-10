import React, { useEffect, useState } from 'react';
import Spinner from '@components/Spinner';
import Tabs from '@components/Tabs';
import Search from '@components/Search';
import { API_URL } from '@constants/ConfigConstants';
import axios from 'axios';
import Table from '@components/Table';

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const localStorageKey = 'data';

  useEffect(() => {
    if (localStorage.getItem(localStorageKey).length > 0) {
      setData(JSON.parse(localStorage.getItem(localStorageKey)));
    }
  }, [])

  const columns = [
    {
      label: "No",
      width: "5%",
      key: "no",
    },
    {
      label: "Id",
      width: "15%",
      key: "id",
    },
    {
      label: "Location",
      width: "10%",
      key: "location",
    },
    {
      label: "Photographer",
      width: "10%",
      key: "photographer",
    },
    {
      label: "Center",
      width: "5%",
      key: "center",
    },
    {
      label: "Title",
      width: "40%",
      key: "title",
    },
    {
      label: "Action",
      width: "15%",
      key: "action",
    }
  ];

  const onHandleInputChange = (value) => {
    setSearchValue(value);
  }

  const onHandleEdit = (editRow) => {
    const editRowData = {
      id: editRow[1],
      location: editRow[2],
      photographer: editRow[3],
      center: editRow[4],
      title: editRow[5],
    }
    const newData = data.map(record => {
      if (record.id === editRowData.id) {
        return {
          ...record,
          location: editRowData.location,
          photographer: editRowData.photographer,
          center: editRowData.center,
          title: editRowData.title,
        }
      } else {
        return record;
      }
    })
    localStorage.setItem(localStorageKey, JSON.stringify(newData));
    setData(newData);
  }

  const onSearch = async () => {
    const url = `${API_URL}/search?q=${searchValue}&media_type=image&page=1`;
    setIsLoading(true);
    const response = await axios.get(url).then(res => {
      const { data } = res;
      if (data.collection) {
        const cookedData = data.collection.items.map((record, index) => {
          return {
            id: record.data[0].nasa_id,
            location: record.data[0].location,
            photographer: record.data[0].photographer,
            center: record.data[0].center,
            title: record.data[0].title,
            date: record.data[0].date_created,
            liked: false,
            removed: false,
            recordIndex: index
          };
        })
        setData(cookedData);
        localStorage.setItem(localStorageKey, JSON.stringify(cookedData));
        setIsLoading(false);
      }
    })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }

  return (
    <Spinner isLoading={isLoading}>
      <div className="App">
        <div>
          <h1>Nasa Image Application</h1>
          <Search onChange={onHandleInputChange} onClick={onSearch} />
          <Spinner isLoading={false}>
            <Tabs>
              <div label="All data">
                <Table
                  data={data}
                  columns={columns}
                  totalRecord={10}
                  onHandleEdit={onHandleEdit}
                />
              </div>
              <div label="Liked data">
                This is content of tab.
              </div>
              <div label="Removed data">
                This is content of tab.
              </div>
            </Tabs>
          </Spinner>
        </div>
      </div>
    </Spinner>
  );
}

export default App;
