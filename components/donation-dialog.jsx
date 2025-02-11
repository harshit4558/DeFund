"use client"
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const DonationDialog = ({ open, onOpenChange, campaignTitle }) => {
    const [formData, setFormData] = useState({
        amount: '',
        name: '',
        isAnonymous: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle donation submission here
        console.log(formData);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Donate to {campaignTitle}</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="amount">Donation Amount ($)</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            disabled={formData.isAnonymous}
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
    );
};

export default DonationDialog; 