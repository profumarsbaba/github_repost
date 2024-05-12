import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import React from 'react'
import './Repo.css'
import Loading from "../Loding/Loading";

const Repo = () => {
  const location  = useLocation()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [repodata, setRepodata] = useState([]);

  const { pathname } = location;
  const repoUrl = "https://api.github.com/repos/profumarsbaba";
  
  const fetchRepoDatas= async () => {
    setLoading(true);

    
      try {
        const res = await fetch(repoUrl + pathname);
        if (!res.ok) {
          throw new Error("Repo does not exist");
        }
        const data = await res.json();
        
        setRepodata([data]);
        
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    
    setLoading(false);
  };
  
  useEffect(() => {
    fetchRepoDatas();
  }, [pathname]);

  return (
    <div className='repo'>
      <h1>{ pathname }</h1>
      <button onClick={()=>navigate('/repos')}>back</button>
      <div>
        {
          loading ? <Loading /> : (
            repodata.map((repoItem) => (
              <div key={repoItem.id}>
                <img src={repoItem.avatar_url} alt="" />
                Visit <a href={repoItem.html_url}>{repoItem.full_name}</a>
                <a href={repoItem.commits_url}>commit</a><br />
                {/* <a href={repoItem.branches_url}>{repoItem.branches_url}</a><br /> */}
                <a href={repoItem.commits_url}>commit</a><br />
                <a href={repoItem.commits_url}>commit</a><br />
                <a href={repoItem.commits_url}>commit</a>
                 
              </div>
          ))
        )
        }
      </div>
    </div>
  )
}

export default Repo