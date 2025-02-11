'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';

const CreateCampaign = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [customCategory, setCustomCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        "Animals",
        "Environment",
        "Medical",
        "Education",
        "Disaster Relief",
        "Community",
        "Technology",
        "Arts & Culture",
        "Other"
    ];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        goalAmount: '',
        walletAddress: '',
        category: '',
    });

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        if (value !== 'Other') {
            setFormData({ ...formData, category: value });
            setCustomCategory('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // If category is "Other", use the custom category
            const finalFormData = {
                ...formData,
                category: selectedCategory === 'Other' ? customCategory : formData.category
            };
            console.log('Campaign data:', finalFormData);
            router.push('/campaigns');
        } catch (error) {
            console.error('Error creating campaign:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto p-6">
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                <Card className="p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Start Your Campaign</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <Label htmlFor="title" className="text-lg">Campaign Title</Label>
                            <Input
                                id="title"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="What's your campaign about?"
                                className="h-12 text-lg"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="category" className="text-lg">Campaign Category</Label>
                            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                                <SelectTrigger className="h-12 text-lg">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {selectedCategory === 'Other' && (
                                <Input
                                    placeholder="Enter custom category"
                                    value={customCategory}
                                    onChange={(e) => {
                                        setCustomCategory(e.target.value);
                                        setFormData({ ...formData, category: e.target.value });
                                    }}
                                    className="mt-2 h-12 text-lg"
                                    required
                                />
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="description" className="text-lg">Campaign Story</Label>
                            <Textarea
                                id="description"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Tell potential donors about your cause..."
                                className="min-h-[200px] text-lg resize-none"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="image" className="text-lg">Campaign Image</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                    <div className="text-gray-600">
                                        Drag and drop an image, or{' '}
                                        <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                                            browse
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        // Handle the file upload logic
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Recommended: 1200x630 pixels
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="walletAddress" className="text-lg">Wallet Address</Label>
                            <Input
                                id="walletAddress"
                                required
                                value={formData.walletAddress}
                                onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
                                placeholder="Enter your wallet address"
                                className="h-12 text-lg font-mono"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="goalAmount" className="text-lg">Fundraising Goal</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <Input
                                    id="goalAmount"
                                    type="number"
                                    required
                                    min="1"
                                    value={formData.goalAmount}
                                    onChange={(e) => setFormData({...formData, goalAmount: e.target.value})}
                                    placeholder="0.00"
                                    className="h-12 text-lg pl-8"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button 
                                type="submit" 
                                className="w-full h-12 text-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Campaign...' : 'Create Campaign'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default CreateCampaign;