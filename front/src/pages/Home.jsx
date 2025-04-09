import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Import du composant Header
import SideBar from "../components/SideBar"; // Import du composant SideBar
import BarChart from "../components/BarChart"; // Import du composant BarChart
import "../assets/styles/Home.css"; // Import du fichier CSS
function Home() {
  const [userFirstName, setUserFirstName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 12;
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        const userData = await response.json();

        const { firstName } = userData.data.userInfos;
        setUserFirstName(firstName);
      } catch (error) {
        console.error("Erreur lors de la récupération du prénom :", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      <SideBar />
      <main>
        <h1>Bonjour <span>{userFirstName}</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <BarChart />
      </main>
      
    </div>
  );
}

export default Home;