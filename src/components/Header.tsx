import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: FC = () => {
  return (
    <div className="header">
      <Link to="/">simple board</Link>
    </div>
  );
};

export default Header;
