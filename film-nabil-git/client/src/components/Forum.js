import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

function Forum() {
  const [status, setStatus] = useState('');
  const [statusList, setStatusList] = useState({});

  async function fetchData() {
    const response = await axios.post('/api/status/getstatus');
    setStatusList(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  let user = useSelector((state) => state.user);

  const onSubmit = (e) => {
    e.preventDefault();

    if (status.length === 0) {
      return;
    }

    const variables = {
      content: status,
      writer: user.userData._id,
      date: Date().slice(0, 15),
    };

    axios
      .post('/api/status/savestatus', variables)
      .then(() => fetchData())
      .then(() => setStatus(''));
  };

  return (
    <div className="forum">
      <div className="main-forum">
        <h1 className="title">Forum - Nabil Film</h1>
        {statusList.data &&
          statusList.data.map((data) => (
            <div className="status" key={data._id}>
              <img src={data.writer.image} alt="foto profil" />
              <div className="status-text">
                <h3 style={{textTransform: 'capitalize'}}>
                  {data.writer.name}
                </h3>
                <p style={{opacity: '0.5'}}>
                  {data.date === Date().slice(0, 15) ? 'Hari ini' : data.date}
                </p>
                <p>{data.content}</p>
              </div>
            </div>
          ))}
        <form onSubmit={onSubmit}>
          <img
            style={{opacity: '.4'}}
            src={user.userData && user.userData.image}
            alt=""
          />
          <div className="status-text">
            <h3 style={{opacity: '.4', textTransform: 'capitalize'}}>
              {user.userData && user.userData.name}
            </h3>
            <p style={{opacity: '.4'}}>{Date().slice(0, 15)}</p>
            <div className="input-text">
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="tulis sesuatu"
              />
              <button>kirim</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forum;
