import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_ITEMS = gql`
  query GetItems {
    user{
      id
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {':('}</p>;

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {data.items.map((item:any, index:any) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;
