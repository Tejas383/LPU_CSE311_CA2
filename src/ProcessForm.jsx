import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  pid: z.string().min(2, {
    message: "pid must be at least 2 characters.",
  }),
});

const ProcessForm = ({ process, setProcess }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pid: "",
      pr: "",
      at: "",
      bt: "",
      ct: "",
      tat: "",
      wt: "",
      rt: "",
    },
  });

  const handleAddProcess = () => {
    const values = form.getValues();

    if (process.some((p) => p.pid === values.pid)) {
      alert(`process with pid ${values.pid} already exists`);
      return;
    }

    const newProcess = {
      pid: values.pid,
      pr: values.pr,
      at: Number(values.at),
      bt: Number(values.bt),
      ct: null,
      tat: null,
      wt: null,
      rt: null,
    };

    setProcess([...process, newProcess]);
    form.reset();
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-red-500/50 p-5 ">
      <h2 className="font-bold text-2xl underline p-2">Processes</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddProcess)}
          className="w-2/3 space-y-2"
        >
          <FormField
            control={form.control}
            name="pid"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel>Process ID</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="at"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel>Arrival Time</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bt"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel>Burst Time</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pr"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProcessForm;
