'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { AuthButton } from './AuthButton';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ArkLab AI Agents
              </h1>
              <p className="text-sm text-gray-600">Explore our AI agent catalog</p>
            </div>
          </div>
          <AuthButton />
        </div>
      </div>
    </motion.header>
  );
}