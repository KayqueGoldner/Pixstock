import { Link } from "react-router-dom";

const Logo = ({ size }) => {
  return (
    <Link
      to="/"
      className={`${size} logo color-primary`}
    >
      Pixstock
    </Link>
  )
}

export default Logo