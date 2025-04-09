import React from "react";
import logo from "../assets/logo.png"; // Import de l'image
import "../assets/styles/Header.css"; // Import du fichier CSS

function Header() {
  return (
    <header>
    
      <nav>
        <ul>
          <li><img src={logo} alt="SportSee Logo" /></li>
          <li><a href="/">Accueil</a></li>
          <li><a href="/user/12">Profil</a></li>
          <li><a href="/settings">Réglages</a></li>
          <li><a href="/community">Communauté</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;