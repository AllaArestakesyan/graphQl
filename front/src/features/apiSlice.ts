import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Data {
    id: string;
    name: string;
    surname: string;
    email: string;
    age: number;
}

interface AddDataResponse {
    addData: Data;
}
interface DeleteDataResponse {
    deleteData:{id:number}
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/graphql',
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getData: builder.query<Data[], void>({
            query: () => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
                        query getData {
                            user{
                                id
                                name
                                surname
                                email
                                age
                            }
                        }
                    `,
                },
            }),
            transformResponse: (response: any) => response.data.user,
            providesTags: ['Users'],
        }),
        addData: builder.mutation<AddDataResponse, { name: string; surname: string, email: string, age: number }>({
            query: (newData) => ({
                url: '',
                method: 'POST',
                body: {
                    query: ` mutation addUser($name:String!, $surname:String!, $email:String!, $age:Float!){
                        createUser(createUserInput:{name: $name, surname: $surname, email:$email, age:$age}) {
                            name
                            surname
                            email
                            age
                        }
                    }`,
                    variables: newData,
                },
            }),
            invalidatesTags: ['Users'],
        }),
        deleteData: builder.mutation<DeleteDataResponse, { id: number }>({
            query: (newData) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `mutation deleteUser($id:Int!){
                        removeUser(id:$id){
                          id
                        }
                      }`,
                    variables: newData,
                },
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useGetDataQuery, useAddDataMutation, useDeleteDataMutation } = apiSlice;
