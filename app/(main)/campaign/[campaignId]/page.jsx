'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const CampaignDetails = ({ params }) => {
    const router = useRouter();
    const [isDonateOpen, setIsDonateOpen] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        name: '',
        isAnonymous: false
    });
    
    // Sample campaign data - replace with your actual data fetching
    const campaign = {
        id: params.id,
        title: "Save the Local Animal Shelter",
        description: "We're raising funds to support our local animal shelter. Your donations will help provide food, medical care, and shelter for abandoned animals. Every contribution makes a difference in the lives of these animals.\n\nOur shelter has been serving the community for over 10 years, and we've helped thousands of animals find their forever homes.",
        image: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467",
        currentAmount: 15000,
        goalAmount: 50000,
        organizer: "John Smith",
        category: "Animals",
        createdAt: "2024-02-20",
        recentDonations: [
            { name: "Sarah Parker", amount: 100, timestamp: "2024-03-10T10:30:00Z" },
            { name: "Anonymous", amount: 50, timestamp: "2024-03-09T15:45:00Z" },
            { name: "Michael Chen", amount: 200, timestamp: "2024-03-09T09:20:00Z" },
            { name: "Emma Wilson", amount: 75, timestamp: "2024-03-08T22:15:00Z" },
            { name: "Anonymous", amount: 150, timestamp: "2024-03-08T14:30:00Z" },
        ]
    };

    const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        try {
            // Handle donation submission here
            console.log('Donation data:', {
                ...formData,
                campaignId: campaign.id
            });
            setIsDonateOpen(false);
        } catch (error) {
            console.error('Error submitting donation:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button 
                onClick={() => router.back()} 
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </button>

            <Card className="overflow-hidden mb-8">
                <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-[400px] object-cover"
                />
                
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
                            <span className="text-sm text-gray-500">
                                Category: {campaign.category}
                            </span>
                        </div>
                        <span className="text-sm text-gray-500">
                            Created on {new Date(campaign.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-2xl font-semibold text-green-600">
                                ${campaign.currentAmount.toLocaleString()}
                            </span>
                            <span className="text-gray-600">
                                goal: ${campaign.goalAmount.toLocaleString()}
                            </span>
                        </div>
                        <Progress value={progress} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{progress.toFixed(1)}% towards goal</span>
                            <span>Organized by {campaign.organizer}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">About this campaign</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {campaign.description}
                        </p>
                    </div>

                    <Button 
                        className="w-full py-6 text-lg"
                        onClick={() => setIsDonateOpen(true)}
                    >
                        Donate Now
                    </Button>
                </div>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
                <div className="space-y-4">
                    {campaign.recentDonations.map((donation, index) => (
                        <div 
                            key={index}
                            className="flex justify-between items-center py-3 border-b last:border-0"
                        >
                            <div className="font-medium">
                                {donation.name}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-green-600 font-semibold">
                                    ${donation.amount}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {new Date(donation.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Dialog open={isDonateOpen} onOpenChange={setIsDonateOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Donate to {campaign.title}</DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleDonationSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Donation Amount ($)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    required
                                    min="1"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                    placeholder="0.00"
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                disabled={formData.isAnonymous}
                                required={!formData.isAnonymous}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="anonymous"
                                checked={formData.isAnonymous}
                                onCheckedChange={(checked) => {
                                    setFormData({
                                        ...formData, 
                                        isAnonymous: checked,
                                        name: checked ? '' : formData.name
                                    });
                                }}
                            />
                            <Label htmlFor="anonymous">Donate anonymously</Label>
                        </div>

                        <Button type="submit" className="w-full">
                            Complete Donation
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CampaignDetails;
