"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import MeetingHeader from "../components/MeetingHeader";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions());

  return (
    <div>
      <MeetingHeader />
    </div>
  );
};
export default MeetingsView;
