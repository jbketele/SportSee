import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Home() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/user/${id}`);
        const data = await res.json();
        setUser(data.data); // on accède directement à l'objet "data"
      } catch (err) {
        console.error('Erreur de récupération des données :', err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Chargement...</p>;

  const { firstName, lastName, age } = user.userInfos;
  const { todayScore, keyData } = user;

  return (
    <div>
      <h1>Bienvenue, <strong>{firstName}</strong> 👋</h1>
      <p>Nom complet : {firstName} {lastName}</p>
      <p>Âge : {age} ans</p>
      <p>Score du jour : {todayScore * 100}%</p>

      <h3>Données clés :</h3>
      <ul>
        <li>Calories : {keyData.calorieCount} kcal</li>
        <li>Protéines : {keyData.proteinCount} g</li>
        <li>Glucides : {keyData.carbohydrateCount} g</li>
        <li>Lipides : {keyData.lipidCount} g</li>
      </ul>
    </div>
  );
}

export default Home;