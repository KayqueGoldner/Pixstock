import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {

  return (
    <div className="error-container">
      <h1 className="error-title display-large">Oops!</h1>
      <h3 className="error-subtitle title-large">ALGO DEU ERRADO.</h3>
      <Link to="/" className="btn btn-primary body-large">Voltar para página inicial</Link>
    </div>
  )
}

export default NotFound;