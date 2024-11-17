import { GraphQLClient } from 'graphql-request';
import React from 'react';
import Card from "./components/card";

const getLocations = async () => {
  const ograph = new GraphQLClient(
    'https://cg.optimizely.com//content/v2?auth=2xllHlrkvZuNjhSDmxP4flhTozkgR2ZOmhxsnOWR1FsFHLaV'
  );

  const { City } = await ograph.request<{ City: { items: { _metadata: { displayName: string; key: string; }; IntroText: string; ImageUrl: { default: string; }; }[] } }>(
    `query CityList($locale: [Locales] = en) {
      City(locale: $locale, limit: 100) {
        items {
          _metadata {
            displayName
            key
          }
          IntroText
          ImageUrl {
            default
          }
        }
      }
    }`
  );

  const locations = City.items.map(item => ({
    id: item._metadata.key,
    name: item._metadata.displayName,
    description: item.IntroText,
    photo: item.ImageUrl.default
  }));

  return locations;
};


export default async function Page() {
  const locations = await getLocations();
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
