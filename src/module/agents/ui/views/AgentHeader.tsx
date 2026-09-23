"use client";

import Form from "next/form";
import { Button } from "@/components/ui/button";
import ResponsiveDialogue from "@/components/ResponsiveDialogue";
import { useState } from "react";

const AgentHeader = () => {
  const handleSubmit = () => {};
  const [open, setOpen] = useState(true);
  return (
    <div className="flex justify-between pt-4 px-8 ">
      <h1>My Agents</h1>
      <ResponsiveDialogue
        title="Create Agent"
        description="Create a new agent"
        open={open}
        onOpenChange={setOpen}
      >
        <Form action={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="name" className="font-semibold">Name</label>
          <input type="text" name="name" id="name" className="border-b" />
          <label htmlFor="instructions" className="font-semibold">Instructions</label>
          <input type="text" name="instructions" id="instructions" className="border-b" />
          <Button type="submit">Create</Button>
        </Form>
      </ResponsiveDialogue>
    </div>
  );
};

export default AgentHeader;
