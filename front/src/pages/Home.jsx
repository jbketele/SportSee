import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import RadarChart from "../components/RadarChart";
import RadialBarChart from "../components/RadialBarChart";
import KeyData from "../components/KeyData";
import "../assets/styles/Home.css";
import UserDataFormatter from "../utils/UserDataFormatter";
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../mocks/mockData";

function Home({ useMock }) {
  const { id } = useParams();
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        let mainData, activity, averageSessions, performance;

        if (useMock) {
          mainData = USER_MAIN_DATA.find(user => user.id === Number(id));
          activity = USER_ACTIVITY.find(user => user.userId === Number(id));
          averageSessions = USER_AVERAGE_SESSIONS.find(user => user.userId === Number(id));
          performance = USER_PERFORMANCE.find(user => user.userId === Number(id));
        } else {
          const [mainRes, actRes, avgRes, perfRes] = await Promise.all([
            axios.get(`http://localhost:3000/user/${id}`),
            axios.get(`http://localhost:3000/user/${id}/activity`),
            axios.get(`http://localhost:3000/user/${id}/average-sessions`),
            axios.get(`http://localhost:3000/user/${id}/performance`)
          ]);
          mainData = mainRes.data.data;
          activity = actRes.data.data;
          averageSessions = avgRes.data.data;
          performance = perfRes.data.data;
        }

        setFormattedData(new UserDataFormatter({ mainData, activity, averageSessions, performance }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    loadUserData();
  }, [id, useMock]);

  if (!formattedData) return <div>Chargement...</div>;

  return (
    <div>
      <Header />
      <SideBar />
      <main>
        <h1>
          Bonjour <span>{formattedData.firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <div className="main-content">
          <div className="charts-container">
            <BarChart data={formattedData.activity} />
            <div className="charts-container-2">
              <LineChart data={formattedData.averageSessions} />
              <RadarChart data={formattedData.performance} />
              <RadialBarChart score={formattedData.score} />
            </div>
          </div>
          {formattedData.keyData && (
            <div className="key-data-container">
              <KeyData keyData={formattedData.keyData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;