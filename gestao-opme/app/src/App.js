import React, { useState, useEffect, useInput } from 'react';

const getUsers = (token, since, setUsers, setNextSince) => {
  if (!token.length && (since >= 0)) {
    alert('Please provide a token in the config section');
    return;
  }
  else if (!token.length || !since || !(since >= 0) || !setUsers)
    return;

  async function fetchData() {
    const options = {
      headers: { Authorization: `basic ${token}` }
    }
    const res = await fetch(`https://jeff-gitlist-api.herokuapp.com/api/users?since=${since}&per_page=10`, options);

    res
      .json()
      .then(res => { setUsers(res.list); setNextSince(res.next_since) })
      .catch(err => console.log(err));
  }

  return fetchData();
};

const Users = ({ token }) => {
  const [since, setSince] = useState({});
  const [nextSince, setNextSince] = useState({});
  const [users, setUsers] = useState({});
  return (

    <div id="users">
      <div style={{ "width": "40%" }}>
        <h1>List Users</h1>
        <form onSubmit={event => event.preventDefault()}>
          <label>Since ID</label><br />
          <input type="number" min="0" onChange={event => setSince(event.target.value)} required /><br />
          <button type="submit" onClick={() => { getUsers(token, (Object.keys(nextSince).length > 0) ? nextSince : since, setUsers, setNextSince) }}>List Users</button>
          {(() => {
            if (nextSince > 0)
              return <button onClick={() => { getUsers(token, nextSince, setUsers, setNextSince) }}>Next Page</button>
          })()
          }
        </form>
        <div>

        </div>
      </div>
      <div style={{ width: "60%" }}>
        {(() => {
          if (users.length)
            return (
              <table>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Login</th>
                  </tr>
                  {users.map ? users.map((obj, index) => {
                    return <tr key={index}><td align="center">{obj.id}</td ><td align="center">{obj.login}</td></tr>
                  }) : null}
                </tbody>
              </table>
            )
          else
            return <div>Provide a Since ID, click on Lisr Users button and wait.</div>
        })()}
      </div>
    </div>
  );
}

const getUserDetails = (token, user, setDetails) => {

  if (!token.length && user.length) {
    alert('Please provide a token in the config section');
    return;
  }
  else if (!token || !user.length)
    return;

  async function fetchData() {
    const options = {
      headers: { Authorization: `basic ${token}` }
    }
    const res = await fetch(`https://jeff-gitlist-api.herokuapp.com/api/users/${user}/details`, options);

    res
      .json()
      .then(res => { setDetails(res) })
      .catch(err => console.log(err));
  }

  return fetchData();
};

const UserDetails = ({ token }) => {
  const [user, setUser] = useState({});
  const [details, setDetails] = useState({});

  return (

    <div id="details">
      <div style={{ "width": "40%" }}>
        <h1>User Details</h1>
        <form onSubmit={event => event.preventDefault()}>
          <label>User name</label><br />
          <input type="text" onChange={event => setUser(event.target.value)} required /><br />
          <button type="submit" onClick={() => { getUserDetails(token, user, setDetails) }}>Get user details</button>
        </form>
      </div>
      <div>
        {(() => {
          if (Object.keys(details).length > 0)
            return <div>
              <h3>ID</h3>{details.id}
              <h3>Login</h3>{details.login}
              <h3>Url</h3><a href={details.html_url}>{details.html_url}</a>
              <h3>Created at</h3>{details.created_at}
            </div>
          else
            return <div>Provide a Github username, click on Get user details button and wait.</div>
        })()}
      </div>
    </div>
  );
}

const getUserReposDetails = (token, user, setReposDetails) => {

  if (!token.length && user.length) {
    alert('Please provide a token in the config section');
    return;
  }
  else if (!token || !user.length)
    return;

  async function fetchData() {
    const options = {
      headers: { Authorization: `basic ${token}` }
    }
    const res = await fetch(`https://jeff-gitlist-api.herokuapp.com/api/users/${user}/repos`, options);

    res
      .json()
      .then(res => { setReposDetails(res) })
      .catch(err => console.log(err));
  }

  return fetchData();
};

const UserReposDetails = ({ token }) => {
  const [user, setUser] = useState({});
  const [reposDetails, setReposDetails] = useState({});

  return (

    <div id="repos">
      <div style={{ "width": "40%" }}>
        <h1>Repositories Details</h1>
        <form onSubmit={event => event.preventDefault()}>
          <label>User name</label><br />
          <input type="text" onChange={event => setUser(event.target.value)} required /><br />
          <button type="submit" onClick={() => { getUserReposDetails(token, user, setReposDetails) }}>Get repos</button>
        </form>
      </div>
      <div>
        {(() => {
          if (reposDetails.length)
            return (
              <table>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Url</th>
                  </tr>
                  {reposDetails.map ? reposDetails.map((obj, index) => {
                    return <tr key={index}><td align="center">{obj.id}</td ><td align="center">{obj.name}</td><td align="center"><a href={obj.html_url}>{obj.html_url}</a></td></tr>
                  }) : null}
                </tbody>
              </table>
            )
          else
            return <div>Provide a Github username, click on Get repos button and wait.</div>
        })()}
      </div>
    </div>
  );
}

function App() {

  const [gitToken, setGitToken] = useState({});

  return (
    <div className="App">

      <div id="about">
        <div style={{ width: "60%", marginRight: "40px" }}>
          <h3>
            JitList is an application to list Github users, specific user's details and user's repos.
          </h3>
        </div>
        <div>
          <img src="branch_2.png" width="500" alt="ilustration"></img>
        </div>
      </div>
      <div id="config">
        <h1>Config</h1>
        <div>
          <label>Github Personal Access Token</label><br />
          <input type="text" pattern="[a-fA-F\d]+" onChange={event => setGitToken(event.target.value)} required /><br />
          <p>
            If you do not have a Github access key, access the <a href="https://github.com/settings/tokens">Github settings</a> and crea one.
          </p>
        </div>
      </div>
      <Users token={gitToken}></Users>
      <UserDetails token={gitToken}></UserDetails>
      <UserReposDetails token={gitToken}></UserReposDetails>
    </div>
  );
}

export default App;
