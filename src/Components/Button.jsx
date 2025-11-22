import { Link } from "react-router";


export default function Button({ text, url }) {
  return (
    <div>
      <Link
        to={url}
        className={`bg-(--color-text-gold) px-3 py-1.5 rounded-2xl hover:bg-(--color-hover) hover:text-(--color-text-light) duration-500`}>
        {text}
      </Link>
    </div>
  ); 
}
