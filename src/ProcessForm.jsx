import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import runFCFS from "./algorithms/fcfs";
import runSJF from "./algorithms/sjf";
import runPriorityNP from "./algorithms/priorityNP";
import runRR from "./algorithms/rr";
import { Play } from "lucide-react";

const FormSchema = z.object({
  pid: z.string().min(2, {
    message: "pid must be at least 2 characters.",
  }),
});

const ProcessForm = ({
  process,
  setProcess,
  algorithm,
  quantum,
  setQuantum,
  setCalculatedProcess,
  setGanttData,
  setReadyQueue,
  setIsRunning,
  setReset,
  isRunning,
}) => {
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

  const handleCalculate = () => {
    let gantt = [],
      result = [],
      readyQueue = [];

    if (algorithm == "fcfs") {
      ({ gantt, result, readyQueue } = runFCFS(process));
    }
    if (algorithm == "sjf") {
      ({ gantt, result, readyQueue } = runSJF(process));
    }
    if (algorithm == "priority-non-pre") {
      ({ gantt, result, readyQueue } = runPriorityNP(process));
    }
    if (algorithm == "rr") {
      ({ gantt, result, readyQueue } = runRR(process));
    }

    setGanttData(gantt.map((p) => ({ ...p, visible: false })));
    setCalculatedProcess(result);
    setReadyQueue(readyQueue);

    // Reset timer first
    setReset(true);
    setIsRunning(false);

    setTimeout(() => {
      setReset(false);
      setIsRunning(true);

      // Animate gantt bars based on their actual start time (1000ms per time unit)
      gantt.forEach((bar, index) => {
        setTimeout(() => {
          setGanttData((prev) =>
            prev.map((b, i) =>
              i === index ? { ...b, visible: true } : b
            )
          );
        }, bar.start * 1000);
      });
    }, 300);
  };

  return (
    <div className="py-6">
      <h3 className="mb-4 text-purple-900">Add Process</h3>
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
                  <Input type="number" placeholder="" {...field} />
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
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {algorithm == "priority-non-pre" && (
            <FormField
              control={form.control}
              name="pr"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {algorithm == "rr" && (
            <FormItem className="flex items-center gap-4">
              <FormLabel>Quantum</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={(e) => setQuantum(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              className="text-white flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
            <Button
              onClick={handleCalculate}
              disabled={!algorithm || isRunning}
              className="text-white flex-1 bg-gradient-to-r bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Calculate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProcessForm;
