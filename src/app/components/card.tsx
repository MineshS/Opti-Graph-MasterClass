import Image from 'next/image';
import React from 'react';
interface CardProps {
    slug: string;
    title: string;
    content: string;
    image?: string;
}

const Card: React.FC<CardProps> = ({ slug, title, content, image }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold">
                <a href={slug} className="text-blue-500 hover:underline">{title}</a>
            </h2>
            {image && (
                <div className="mb-4">
                    <Image src={image} alt={title} width={400} height={280} className="w-full h-auto rounded-lg" />
                </div>
            )}
            <p className="text-gray-600 line-clamp-3" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 3 }}>
                {content}
            </p>
        </div>
    );
};

export default Card;