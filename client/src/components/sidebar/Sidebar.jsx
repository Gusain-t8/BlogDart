import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://artificialnightsky.neocities.org/images/cute_yukino.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor,
          tenetur delectus beatae excepturi distinctio dolores a provident
          laboriosam vero!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats?.map((c) => (
            <Link to={`/?cat = ${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook" />
          <i className="sidebarIcon fa-brands fa-square-pinterest" />
          <i className="sidebarIcon fa-brands fa-square-instagram" />
          <i className="sidebarIcon fa-brands fa-square-twitter" />
        </div>
      </div>
    </div>
  );
}
