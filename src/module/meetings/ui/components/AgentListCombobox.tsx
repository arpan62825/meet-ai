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

const AgentListCombobox = () => {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <Combobox items={data}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item.name}>
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
