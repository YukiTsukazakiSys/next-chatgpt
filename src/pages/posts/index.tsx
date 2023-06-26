import useSWR from 'swr';

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();
  console.log(posts);
  return { props: { posts } };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = ({ posts }: any) => {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h1>POST一覧</h1>
      <ul>
        {data.map((post: any) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Index;
