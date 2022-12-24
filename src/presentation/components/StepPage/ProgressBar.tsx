import { Progress } from '@chakra-ui/react'

type ProgressBarProps = {
  value: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <Progress value={value} height='0.625rem' width='100%' sx={{ div: { background: 'black' } }} />
  )
}

ProgressBar.displayName = 'ProgressBar'
