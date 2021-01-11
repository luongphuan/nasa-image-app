import React, { useEffect, useState, Suspense } from 'react';
import { API_URL } from '@constants/ConfigConstants';
import axios from 'axios';

const Table = React.lazy(() => import('@components/Table'));
const Search = React.lazy(() => import('@components/Search'));
const Spinner = React.lazy(() => import('@components/Spinner'));
const Tabs = React.lazy(() => import('@components/Tabs'));

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removedData, setRemovedData] = useState([]);
  const [likedData, setLikedData] = useState([]);
  const allDataStorage = 'data';
  const likedDataStorage = 'likedData';
  const removedDataStorage = 'removedData';

  useEffect(() => {
    if (localStorage.getItem(allDataStorage) &&
      localStorage.getItem(allDataStorage).length > 0) {
      const data = JSON.parse(localStorage.getItem(allDataStorage))
        .filter(record => !record.removed);
      setData(data);
    }
    if (localStorage.getItem(removedDataStorage) &&
      localStorage.getItem(removedDataStorage).length > 0) {
      const data = JSON.parse(localStorage.getItem(removedDataStorage));
      setRemovedData(data);
    }
    if (localStorage.getItem(likedDataStorage) &&
      localStorage.getItem(likedDataStorage).length > 0) {
      const data = JSON.parse(localStorage.getItem(likedDataStorage));
      setLikedData(data);
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
    const localStore = JSON.parse(localStorage.getItem(allDataStorage));
    const editRowData = {
      id: editRow[1],
      location: editRow[2],
      photographer: editRow[3],
      center: editRow[4],
      title: editRow[5],
    }
    const newData = localStore.map(record => {
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
    setLikedData(filterLikedData(newData));
    setData(filterAllData(newData));
  }

  const onSearch = async () => {
    const url = `${API_URL}/search?q=${searchValue}&media_type=image&page=1`;
    setIsLoading(true);
    const response = await axios.get(url).then(res => {
      const { data } = res;
      if (data.collection) {
        const cookedData = data.collection.items.map((record, index) => {
          localStorage.setItem(likedDataStorage, JSON.stringify([]));
          localStorage.setItem(removedDataStorage, JSON.stringify([]));
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
        setLikedData([]);
        setRemovedData([]);
        localStorage.setItem(allDataStorage, JSON.stringify(cookedData));
        setIsLoading(false);
      }
    })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const onHandleLike = (id) => {
    const localStore = JSON.parse(localStorage.getItem(allDataStorage));
    const result = localStore.map(record => {
      if (record.id === id) {
        return { ...record, liked: !record.liked };
      } else {
        return record;
      }
    });
    setLikedData(filterLikedData(result));
    setData(filterAllData(result));
  }

  const onHandleRemove = (id) => {
    const localStore = JSON.parse(localStorage.getItem(allDataStorage));
    const result = localStore.map(record => {
      if (record.id === id) {
        return { ...record, removed: !record.removed }
      } else {
        return record;
      }
    });
    setRemovedData(filterRemovedData(result));
    setData(filterAllData(result));
    setLikedData(filterLikedData(result));
  }

  const filterAllData = (result) => {
    localStorage.setItem(allDataStorage, JSON.stringify(result));
    return JSON.parse(localStorage.getItem(allDataStorage))
      .filter(record => !record.removed);
  }
  const filterLikedData = (result) => {
    const likedData = result.filter(record => record.liked && !record.removed);
    localStorage.setItem(likedDataStorage, JSON.stringify(likedData));
    return likedData;
  }
  const filterRemovedData = (result) => {
    const removedData = result.filter(item => item.removed);
    localStorage.setItem(removedDataStorage, JSON.stringify(removedData));
    return removedData;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                    limit={10}
                    onHandleEdit={onHandleEdit}
                    onHandleLike={onHandleLike}
                    onHandleRemove={onHandleRemove}
                  />
                </div>
                <div label="Liked data">
                  <Table
                    data={likedData}
                    columns={columns}
                    limit={10}
                    onHandleEdit={onHandleEdit}
                    onHandleLike={onHandleLike}
                    onHandleRemove={onHandleRemove}
                  />
                </div>
                <div label="Removed data">
                  <Table
                    data={removedData}
                    columns={columns}
                    limit={10}
                    onHandleEdit={onHandleEdit}
                    onHandleLike={onHandleLike}
                    onHandleRemove={onHandleRemove}
                  />
                </div>
              </Tabs>
            </Spinner>
          </div>
        </div>
      </Spinner>
    </Suspense>
  );
}

export default App;
