import { GraphQLClient } from 'graphql-request';
import React from 'react';
import Card from "./components/card";

const getLocations = async () => {
  const ograph = new GraphQLClient(
    'https://flyby-router-demo.herokuapp.com/'
  );

  const { locations } = await ograph.request<{ locations: { id: string; name: string; description: string; photo: string; }[] }>(
    `{
        locations {
          id
          name
          description
          photo
        }
    }`
  );

  return locations;
};


export default async function Page() {
  const locations = await getLocations();
  console.log(locations);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {locations.map(({ id, name, description, photo }) => (
        <Card key={id} slug={`/locations/${id}`} title={name} content={description} image={photo} />
      ))}
      </div>
    </div>
  );
}
