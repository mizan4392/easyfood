import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { city } = useParams<{ city: string }>();
  return <div>Search for City {city}</div>;
}
