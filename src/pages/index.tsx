import { Button, Checkbox } from '@mui/material'

export default function Home() {
  return (
    <>
      <div>
        <div className="test mt-[12px]">
          <Checkbox defaultChecked />
          <Button variant="contained" color="success">
            Contained
          </Button>
          <Button variant="text">Bright223</Button>
          <Button variant="outlined">Outlined</Button>
        </div>
      </div>
    </>
  )
}
