import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

const FormSchema = z.object({
  pid: z.string().min(2, {
    message: "pid must be at least 2 characters.",
  }),
})

const ProcessForm = () => {
  const handleAddProcess = () => {

  }

  const form = useForm({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      pid: "",
    },
  })

  function onSubmit(data) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className='w-[35%] border border-black border-solid flex flex-col items-center justify-center'>
      <h2 className='font-bold text-2xl underline p-2'>Process Form</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">
        <FormField
          control={form.control}
          name="pid"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>Process ID</FormLabel>
              <FormControl>
                <Input placeholder="P1" {...field} />
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
                <Input placeholder="0" {...field} />
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
                <Input placeholder="5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type = "button" onClick={handleAddProcess}>Add</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default ProcessForm