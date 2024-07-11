import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_ITEMS = gql`
  query GetItems {
    user{
      id
      name
      surname
      email
      age
      posts{
        id
        title
        body
        comments{
          id
          text
          user{
            id
            name
            surname
            email
          }
        }
      }
    }
    post{
      id
      title
      body
      user{
        id
        name
        surname
      }
      comments{
        id
        text
        user{
          id
          name
          surname
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {':('}</p>;
  console.log(data);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.user?.map((item:any) => (
          <li key={item.id}>{item.name} {item.surname}</li>
        ))}
      </ul>
      <h1>Posts</h1>
      <ul>
        {data?.post?.map((item:any) => (
          <li key={item.id}><b>{item.title}</b>-  {item.body} - <small><em>{item.user.name} {item.user.surname}</em></small></li>
        ))}
      </ul>
    </div>
  )
}

export default App;
