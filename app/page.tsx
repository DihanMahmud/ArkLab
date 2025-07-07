import Head from 'next/head';
import { Agent } from '@/types/agent';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterControls } from '@/components/FilterControls';
import { AgentList } from '@/components/AgentList';
import mockAgents from '@/data/mock-agents.json';

async function getAgents(): Promise<Agent[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const agents: Agent[] = mockAgents;
  return agents;
}

export default async function Home() {
  const agents = await getAgents();

  return (
    <>
      <Head>
        <title>ArkLab AI Agents Catalog</title>
        <meta name="description" content="Explore a categorized list of AI agents by ArkLab." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Search and Filter Section */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <SearchBar />
              <FilterControls agents={agents} />
            </div>

            {/* Agent List */}
            <AgentList agents={agents} />
          </div>
        </main>
      </div>
    </>
  );
}