import React, { useEffect, useState,} from "react";
import {useParams} from "react-router-dom";
import Header from "../components/Header"; // Import du composant Header
import SideBar from "../components/SideBar"; // Import du composant SideBar
import BarChart from "../components/BarChart"; // Import du composant BarChart
import LineChart from "../components/LineChart"; // Import du composant LineChart
import RadarChart from "../components/RadarChart"; // Import du composant RadarChart
import RadialBarChart from "../components/RadialBarChart"; // Import du composant RadialBarChart
import KeyData from "../components/KeyData";
import "../assets/styles/Home.css"; // Import du fichier CSS

function Home() {
  const {id} = useParams();
  const [userFirstName, setUserFirstName] = useState("");
  const [userKeyData, setUserKeyData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        const userData = await response.json();

        const { firstName } = userData.data.userInfos;
        const { keyData } = userData.data;

        setUserFirstName(firstName);
        setUserKeyData(keyData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    fetchUserData();
  }, );

  return (
    <div>
      <Header />
      <SideBar />
      <main>
        <h1>
          Bonjour <span>{userFirstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <div className="main-content">
          <div className="charts-container">
            <BarChart />
            <div className="charts-container-2">
              <LineChart />
              <RadarChart />
              <RadialBarChart />
            </div>
 
          </div>
          {userKeyData && (
            <div className="key-data-container">
              <KeyData keyData={userKeyData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;