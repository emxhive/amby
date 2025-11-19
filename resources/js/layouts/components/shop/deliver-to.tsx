import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MapPin } from 'lucide-react';

// --- 2) Location: icon trigger + popover form
type LocationValues = {
    country: string; // e.g. "NG"
    currency: string; // e.g. "NGN"
};

export function DeliverTo({ value, onChange }: { value: LocationValues; onChange: (v: LocationValues) => void }) {
    const { country, currency } = value;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Choose location info"
                    className="relative h-9 w-9 rounded-full text-foreground hover:bg-transparent"
                >
                    <div className="flex flex-col items-center justify-center gap-1">
                        <MapPin strokeWidth={1}  className="size-4 " />
                        <Badge variant="secondary" className="rounded-full px-1.5 py-0 text-[10px] leading-4">
                            {country} • {currency}
                        </Badge>
                    </div>
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-80 p-4">
                <div className="space-y-3">
                    <div className="text-sm font-medium">Choose your location info</div>
                    <Separator />

                    <div className="grid gap-2">
                        <Label className="text-xs">Country</Label>
                        <Select value={country} onValueChange={(c) => onChange({ country: c, currency })}>
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Populate from your real list */}
                                <SelectItem value="NG">Nigeria (NG)</SelectItem>
                                <SelectItem value="GH">Ghana (GH)</SelectItem>
                                <SelectItem value="KE">Kenya (KE)</SelectItem>
                                <SelectItem value="US">United States (US)</SelectItem>
                                <SelectItem value="GB">United Kingdom (GB)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-xs">Currency</Label>
                        <Select value={currency} onValueChange={(cur) => onChange({ country, currency: cur })}>
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Map this from your supported currencies */}
                                <SelectItem value="NGN">NGN</SelectItem>
                                <SelectItem value="GHS">GHS</SelectItem>
                                <SelectItem value="KES">KES</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pt-1">
                        <Button variant="link" className="h-auto p-0 text-sm" onClick={() => {}}>
                            Manage addresses
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
