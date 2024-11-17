
import { GraphQLClient } from 'graphql-request';
import React from 'react';

const getLocation = async (slug: string) => {
    const ograph = new GraphQLClient(
        'https://cg.optimizely.com//content/v2?auth=2xllHlrkvZuNjhSDmxP4flhTozkgR2ZOmhxsnOWR1FsFHLaV'
    );

    const { City } = await ograph.request<{ City: { items: { _metadata: { displayName: string; key: string }; IntroText: string; MainBody: { html: string }; ImageUrl: { default: string } }[] } }>(
        `query City($locale: [Locales] = en, $guid: String) {
            City(
                locale: $locale
                where:{ _metadata: { key: { eq: $guid } } }
            ) {
                items {
                    _metadata {
                        displayName
                        key
                    }
                    IntroText
                    MainBody {
                        html
                    }
                    ImageUrl {
                        default
                    }
                }
            }
        }`,
        { guid: slug }
    );

    const location = City.items[0];
    return {
        id: location._metadata.key,
        name: location._metadata.displayName,
        description: location.IntroText,
        photo: location.ImageUrl.default,
        MainBody: location.MainBody
    };
};

const LocationPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const location = await getLocation(slug);
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="max-w-md mx-auto">
                    <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
                    <img className="w-full h-auto rounded-lg mb-4" src={location.photo} alt={location.name} />
                    <p className="text-2xl text-gray-700 mb-4">{location.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: location.MainBody.html }} />
                </div>  
            </div>
        </div>
    );
};

export default LocationPage;