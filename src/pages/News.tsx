import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type HNHit = { objectID: string; title: string; url: string | null };
type HNResponse = { hits: HNHit[] };

const fetchPosts = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<HNHit[]> => {
  const { data } = await axios.get<HNResponse>(
    "https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=30&page=0",
    { signal }
  );
  return data.hits;
};

const News = () => {
  const { data, isLoading, error } = useQuery<HNHit[], Error>({
    queryKey: ["posts"],
    queryFn: ({ signal }) => fetchPosts({ signal }),
    staleTime: 5_000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((news) => (
        <li key={news.objectID}>{news.title}</li>
      ))}
    </ul>
  );
};

export default News;
