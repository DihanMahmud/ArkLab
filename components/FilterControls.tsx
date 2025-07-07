'use client';

import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStatuses, setCategories, setPricingModel, clearFilters } from '@/store/slices/filtersSlice';
import { FilterDropdown } from './FilterDropdown';
import { Agent } from '@/types/agent';

interface FilterControlsProps {
  agents: Agent[];
}

export function FilterControls({ agents }: FilterControlsProps) {
  const dispatch = useAppDispatch();
  const { statuses, categories, pricingModel } = useAppSelector(state => state.filters);

  const uniqueStatuses = [...new Set(agents.map(agent => agent.status))];
  const uniqueCategories = [...new Set(agents.map(agent => agent.category))];
  const uniquePricingModels = [...new Set(agents.map(agent => agent.pricingModel))];

  const hasActiveFilters = statuses.length > 0 || categories.length > 0 || pricingModel.length > 0;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <FilterDropdown
        title="Status"
        options={uniqueStatuses}
        selectedValues={statuses}
        onSelectionChange={(values) => dispatch(setStatuses(values))}
        multiSelect
      />
      <FilterDropdown
        title="Category"
        options={uniqueCategories}
        selectedValues={categories}
        onSelectionChange={(values) => dispatch(setCategories(values))}
        multiSelect
      />
      <FilterDropdown
        title="Pricing Model"
        options={uniquePricingModels}
        selectedValues={pricingModel ? [pricingModel] : []}
        onSelectionChange={(values) => dispatch(setPricingModel(values[0] || ''))}
      />
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(clearFilters())}
          className="text-gray-600 hover:text-gray-900"
        >
          <FilterX className="h-4 w-4 mr-2" />
          Clear filters
        </Button>
      )}
    </div>
  );
}