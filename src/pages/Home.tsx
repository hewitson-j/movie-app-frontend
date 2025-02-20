import Title from "../components/Title";
import HomeProvider, { useHomeProviderContext } from "../context/HomeProvider";

export default function Home() {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
}

function HomePage() {
  const { data, loading, error } = useHomeProviderContext();

  return (
    <div className="home-page page">
      <Title>Welcome!</Title>
      {loading ? <>Loading...</> : <>{data}</>}
      {error ? <>Error!</> : <></>}
    </div>
  );
}
