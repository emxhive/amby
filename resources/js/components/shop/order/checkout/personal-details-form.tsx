import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { mockAddresses } from '@/mocks/mockAddresses';
import { initialPersonalDetails } from './constants';
import type { PersonalDetails } from './types';

// Mock delivery options
const deliveryOptions = [
    { value: 'standard', label: 'Standard (3-5 days)' },
    { value: 'express', label: 'Express (1-2 days)' },
];

const savedAddresses = mockAddresses.map((address) => ({
    id: address.id,
    label: address.label,
    summary: [address.address, address.city, address.state].filter(Boolean).join(', '),
}));

interface Props {
    onNext: () => void;
}

export function PersonalDetailsForm({ onNext }: Props) {
    const [data, setData] = useState<PersonalDetails>(initialPersonalDetails);
    const [delivery, setDelivery] = useState(deliveryOptions[0].value);
    const [addressMode, setAddressMode] = useState<'saved' | 'new'>('new');
    const [selectedSaved, setSelectedSaved] = useState(savedAddresses[0]?.id ?? 0);
    const [showLabelDialog, setShowLabelDialog] = useState(false);
    const [newAddressLabel, setNewAddressLabel] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // You'd validate/save here; just moving to next step for now
        onNext();
    }

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Delivery Options */}
                <div>
                    <Label className="mb-1 block">Delivery Method</Label>
                    <Select value={delivery} onValueChange={setDelivery}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose delivery option" />
                        </SelectTrigger>
                        <SelectContent>
                            {deliveryOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* Address Selector */}
                <div>
                    <Label className="mb-2 block">Delivery Address</Label>
                    <div className="mb-2 flex gap-2">
                        <Button
                            type="button"
                            variant={addressMode === 'saved' ? 'default' : 'outline'}
                            onClick={() => setAddressMode('saved')}
                            size="sm"
                        >
                            Select Saved
                        </Button>
                        <Button type="button" variant={addressMode === 'new' ? 'default' : 'outline'} onClick={() => setAddressMode('new')} size="sm">
                            New Address
                        </Button>
                    </div>
                    {addressMode === 'saved' ? (
                        <Select value={String(selectedSaved)} onValueChange={(v) => setSelectedSaved(Number(v))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose address" />
                            </SelectTrigger>
                            <SelectContent>
                                {savedAddresses.map((addr) => (
                                    <SelectItem key={addr.id} value={String(addr.id)}>
                                        <div>
                                            <div className="font-semibold">{addr.label}</div>
                                            <div className="text-xs text-gray-500">{addr.summary}</div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={data.firstName} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={data.phone} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={data.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" value={data.address} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" value={data.city} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input id="state" name="state" value={data.state} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" name="country" value={data.country} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input id="postalCode" name="postalCode" value={data.postalCode} onChange={handleChange} />
                            </div>
                            <div className="mt-2 flex items-center md:col-span-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => setShowLabelDialog(true)}>
                                    Save this address
                                </Button>
                                {newAddressLabel && (
                                    <span className="bg-ambyRed-50 ml-3 rounded-full px-2 py-1 text-xs font-semibold text-ambyRed-500">
                                        Label: {newAddressLabel}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-end pt-4">
                    <Button type="submit">Continue to Payment</Button>
                </div>
            </form>
            {/* ShadCN Dialog for label input */}
            <Dialog open={showLabelDialog} onOpenChange={setShowLabelDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save Address</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Label htmlFor="address-label">Address Label (e.g. Home, Office)</Label>
                        <Input
                            id="address-label"
                            value={newAddressLabel}
                            onChange={(e) => setNewAddressLabel(e.target.value)}
                            placeholder="Enter label"
                            className="mt-2"
                            autoFocus
                        />
                        <div className="mt-6 flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setShowLabelDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="button" disabled={!newAddressLabel.trim()} onClick={() => setShowLabelDialog(false)}>
                                Save
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
