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

const ProcessForm = ({process, setProcess}) => {
  const form = useForm({
    defaultValues: {
      pid: "",
      at: "",
      bt: "",
    },
  })

  const handleAddProcess = () => {
    const values = form.getValues();
    setProcess([...process, values]);
    form.reset();
  }


  return (
    <div className=' flex flex-col items-center justify-center bg-red-500/50 '>
      <h2 className='font-bold text-2xl underline p-2'>Processes</h2>
      <Form {...form}>
      <form className="w-2/3 space-y-2">
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
        <Button type="button" onClick={handleAddProcess}>Add</Button>
      </form>
    </Form>
    </div>
  )
}

export default ProcessForm