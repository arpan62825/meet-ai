"use client";

import DiceBearAvatar from "@/components/DiceBearAvatar";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface AgentListComboboxProps {
  value?: string | null;
  onChange: (agentId: string | null) => void;
}

const AgentListCombobox = ({ value, onChange }: AgentListComboboxProps) => {
  const trpc = useTRPC();

  const { data: agents } = useQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <Combobox
        items={agents}
        value={agents?.find((a) => a.id === value) ?? null}
        onValueChange={(selectedAgent) => onChange(selectedAgent?.id ?? null)}
        itemToStringLabel={(agent) => agent?.name ?? ""}
        itemToStringValue={(agent) => agent?.id ?? ""}
      >
        <ComboboxInput placeholder="Select an agent..." />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                <div className="flex items-center gap-3.5">
                  <DiceBearAvatar
                    seed={item.name}
                    size={44}
                    className="size-7 rounded-full border border-border/40"
                  />
                  <p className="tracking-tight text-foreground">{item.name}</p>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default AgentListCombobox;
