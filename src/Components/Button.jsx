import { Link } from "react-router";


export default function Button({ text, url }) {
  return (
    <div>
      <Link to={url} className="mx-auto! py-3! block custom-button">
        {text}
      </Link>
    </div>
  ); 
}
