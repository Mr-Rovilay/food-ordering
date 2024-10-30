
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useRestaurantStore } from '@/store/useRestaurantStore';

export type FilterOptionsState = {
  id: string;
  label: string;
  count?: number;
};

const filterOptions: FilterOptionsState[] = [
  { id: "eba", label: "eba"},
  { id: "rice", label: "rice"},
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <Card className="p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <h1 className="text-lg font-semibold text-gray-900">Filter by Cuisines</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={resetAppliedFilter}
            className="text-gray-500 hover:text-gray-700"
            disabled={appliedFilter.length === 0}
          >
            Reset
          </Button>
        </div>

        <div className="space-y-4">
          {filterOptions.map((option) => (
            <div 
              key={option.id} 
              className="flex items-center justify-between p-2 transition-colors rounded-md group hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={option.id}
                  checked={appliedFilter.includes(option.label)}
                  onClick={() => appliedFilterHandler(option.label)}
      
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label 
                  htmlFor={option.id}
                  className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                >
                  {option.label}
                </Label>
              </div>
              {option.count !== undefined && (
                <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                  {option.count}
                </span>
              )}
            </div>
          ))}
        </div>

        {appliedFilter.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              {appliedFilter.length} filter{appliedFilter.length > 1 ? 's' : ''} applied
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FilterPage;