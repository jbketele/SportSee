import React from "react";
import "../assets/styles/SideBar.css"; // Import du fichier CSS
import icon1 from "../assets/icon1.png"; // Import de l'icône 1
import icon2 from "../assets/icon2.png"; // Import de l'icône 2
import icon3 from "../assets/icon3.png"; // Import de l'icône 3
import icon4 from "../assets/icon4.png"; // Import de l'icône 4

function SideBar() {
  return (
    <aside className="sidebar">
      <ul>
       <li><img src={icon1} alt="" /></li>
       <li><img src={icon2} alt="" /></li>
       <li><img src={icon3} alt="" /></li>
       <li><img src={icon4} alt="" /></li>
      </ul>
    </aside>
  );
}

export default SideBar;