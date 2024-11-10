
import { GraphQLClient } from 'graphql-request';
import React from 'react';

const LocationPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const location = await getLocation(slug);
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="max-w-md mx-auto">
                    <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
                    <img className="w-full h-auto rounded-lg mb-4" src={location.photo} alt={location.name} />
                    <p className="text-gray-700 mb-4">{location.description}</p>
                </div>  
            </div>
        </div>
    );
};

const getLocation = async (id: string) => {
    const ograph = new GraphQLClient(
      'https://flyby-router-demo.herokuapp.com/'
    );
  
    const { location } = await ograph.request<{ location: { id: string; name: string; description: string; photo: string; } }>(
      `{
          location(id: "${id}") {
            id
            name
            description
            photo
          }
      }`
    );
  
    return location;
};

export default LocationPage;