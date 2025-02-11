"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Campfront = () => {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState([
        {
            _id: '1',
            title: 'Save the Local Animal Shelter',
            previewImage: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467',
            organizer: 'John Smith'
        },
        {
            _id: '2',
            title: 'Community Garden Project',
            image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735',
            organizer: 'Sarah Johnson'
        },
        {
            _id: '3',
            title: 'Local School Music Program Fundraiser',
            previewImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
            organizer: 'Michael Brown'
        }
    ]);
    
    return (
        <div className="p-4">
            {campaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaigns.map((campaign, index) => (
                        <div 
                            key={campaign._id || index} 
                            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => router.push(`/campaign/${campaign._id}`)}
                        >
                            <img 
                                src={campaign.previewImage || campaign.image} 
                                alt={campaign.title}
                                className="w-full h-48 object-cover rounded-md mb-3"
                            />
                            <h2 className="text-xl font-semibold mb-2 truncate">
                                {campaign.title}
                            </h2>
                            <p className="text-gray-600 truncate">
                                Organized by: {campaign.organizer}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h1 className="text-2xl font-semibold text-gray-700">
                        No campaigns to show
                    </h1>
                </div>
            )}
        </div>
    );
}

export default Campfront