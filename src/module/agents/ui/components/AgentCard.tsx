"use client";

import DiceBearAvatar from "@/components/DiceBearAvatar";

interface Agent {
  id: string;
  name: string;
  userId: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  console.log(agent);

  return (
    <div className=" w-5/6 border-2 ">
      <div className="bg-emerald-200">
        <DiceBearAvatar
          seed={agent.name}
          size={32}
          className="size-8 rounded-full"
        />
        <span className="font-semibold">{agent.name}</span>
        <h1>{agent.name}</h1>
      </div>
    </div>
  );
};

export default AgentCard;
