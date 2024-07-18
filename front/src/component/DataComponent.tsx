import React from 'react';
import { useAddDataMutation, useDeleteDataMutation, useGetDataQuery } from '../features/apiSlice';

export const DataComponent: React.FC = () => {
  const { data, error, isLoading } = useGetDataQuery();
  const [deleteData] = useDeleteDataMutation()
  console.log('=>',data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: )</p>;

  return (
    <div>
      {data?.map((item:any) => (
        <div key={item.id}>
          <p>{item.name} {item.surname} ---- {item.email} - {item.age}</p>
          <button onClick={()=>deleteData({id:item.id})}>&times;</button>
        </div>
      ))}
    </div>
  );
};

export const AddDataComponent: React.FC = () => {
  const [addData] = useAddDataMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const email = formData.get('email') as string;
    const age = formData.get('age') as any;
    addData({ name, surname, email, age });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="surname" placeholder="surname" />
      <input type="text" name="email" placeholder="email" />
      <input type="number" name="age" placeholder="age" />
      <button type="submit">Add Data</button>
    </form>
  );
};



