import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Repost from "./Component/Repos_page/Repost";
import Repo from "./Component/Singile_Repo/Repo";
import { useState, useRef, useEffect } from "react";
import logo from "./logo.png";

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const repoInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(4);

  const baseUrl = "https://api.github.com/users/profumarsbaba/repos";
  const repoUrl = "https://api.github.com/repos/profumarsbaba/";

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(baseUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = await res.json();
      setRepos(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
    setLoading(false);
  };

  const fetchRepoByName = async () => {
    setLoading(true);
    const repoName = repoInputRef.current.value.trim();
    if (repoName) {
      try {
        const res = await fetch(repoUrl + repoName);
        if (!res.ok) {
          throw new Error("Repo does not exist");
        }
        const data = await res.json();
        setRepos([data]);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    } else {
      fetchRepos();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  // Calculate currentRepos based on the currentPage and reposPerPage
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div style={{ textAlign: "center", height: "100%" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ margin: "0 auto", display: "block" }}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Repost
              fetchRepoByName={fetchRepoByName}
              loading={loading}
              repos={repos}
              fetchRepos={fetchRepos}
              repoInputRef={repoInputRef}
              currentRepos={currentRepos}
              setCurrentPage={setCurrentPage}
              reposPerPage={reposPerPage}
              paginate={paginate}
            />
          }
        />
        <Route path="/:id" element={<Repo repoUrl={repoUrl} />} />
      </Routes>
    </Router>
  );
}

export default App;
