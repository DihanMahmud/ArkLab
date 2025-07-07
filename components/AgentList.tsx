'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import { AgentCard } from './AgentCard';
import { useAppSelector } from '@/store/hooks';

interface AgentListProps {
  agents: Agent[];
}

export function AgentList({ agents }: AgentListProps) {
  const { search, statuses, categories, pricingModel } = useAppSelector(state => state.filters);

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = !search || 
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statuses.length === 0 || statuses.includes(agent.status);
      const matchesCategory = categories.length === 0 || categories.includes(agent.category);
      const matchesPricing = !pricingModel || agent.pricingModel === pricingModel;

      return matchesSearch && matchesStatus && matchesCategory && matchesPricing;
    });
  }, [agents, search, statuses, categories, pricingModel]);

  if (filteredAgents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-500 text-lg">No agents found matching your criteria.</div>
        <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAgents.map((agent, index) => (
        <AgentCard key={agent.id} agent={agent} index={index} />
      ))}
    </div>
  );
}