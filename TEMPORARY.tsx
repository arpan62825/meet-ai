import { useQueryState } from "nuqs";
import { useMemo } from "react";

export function AgentList({ session }) {
  // 1. Read and write the 'search' query parameter from the URL
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });

  // 2. Fetch all agents for the user from Neon
  const { data: agents, isLoading } = useQuery(
    trpc.agents.getByUserId.queryOptions({ id: session?.user.id as string }),
  );

  // 3. Filter instantly in real-time as the user types
  const filteredAgents = useMemo(() => {
    if (!agents) return [];
    if (!searchQuery.trim()) return agents;

    const lowercasedQuery = searchQuery.toLowerCase();

    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(lowercasedQuery) ||
        agent.description?.toLowerCase().includes(lowercasedQuery), // Add any fields you want searchable
    );
  }, [agents, searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search agents..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Map over filteredAgents instead of the raw data */}
      {filteredAgents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
