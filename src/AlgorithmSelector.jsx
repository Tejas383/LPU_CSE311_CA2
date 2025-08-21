import React from 'react'
import { Button } from './components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"


const AlgorithmSelector = () => {
    const handleSubmit = () => {

    }

    const [position, setPosition] = React.useState("bottom")

  return (
    <div className='flex flex-col items-center justify-center m-8'>
      <h2 className='font-bold text-2xl underline p-2'>Algorithm</h2>
      <p>Select the algorithm: </p>
      <DropdownMenu className=''>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Algorithm</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="FCFS">First Come First Serve</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AlgorithmSelector
