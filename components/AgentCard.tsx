'use client';

import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Zap, Archive, DollarSign, Users, Shield } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const statusColors = {
  Active: 'bg-green-500/20 text-green-700 border-green-500/30',
  Beta: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
  Archived: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
};

const pricingIcons = {
  Subscription: DollarSign,
  'Per-Use': Zap,
  'Free Tier': Users,
};

const categoryIcons = {
  'Customer Service': Users,
  Operations: Shield,
  Marketing: Zap,
  'Data Analysis': Bot,
  Development: Bot,
  'Human Resources': Users,
  Finance: DollarSign,
  Legal: Shield,
};

export function AgentCard({ agent, index }: AgentCardProps) {
  const PricingIcon = pricingIcons[agent.pricingModel] || DollarSign;
  const CategoryIcon = categoryIcons[agent.category as keyof typeof categoryIcons] || Bot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full border-0 bg-white/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/60">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600">
              <AvatarFallback className="bg-transparent text-white font-semibold">
                {agent.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                  {agent.name}
                </CardTitle>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${statusColors[agent.status]} border`}
                >
                  {agent.status}
                </Badge>
              </div>
              <CardDescription className="text-sm text-gray-600 line-clamp-2">
                {agent.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CategoryIcon className="h-4 w-4" />
              <span>{agent.category}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PricingIcon className="h-4 w-4" />
              <span>{agent.pricingModel}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}