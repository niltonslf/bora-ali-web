import { useEffect, useState } from 'react'

import { MusicStyleModel } from '@/domain/models'
import { FetchMusicStyle } from '@/domain/usecases'
import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'
import { OptionItem } from '../../OptionItem'

type EventMusicalStyleProps = {
  fetchMusicStyle: FetchMusicStyle
}

export const EventMusicalStyle: React.FC<EventMusicalStyleProps> = ({ fetchMusicStyle }) => {
  const [options, setOptions] = useState<MusicStyleModel[]>([])

  const { setFormState, formState } = useCreateEventContext()
  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: formState.musicStyleId,
    onChange: (value: string) => {
      setFormState((prev) => ({ ...prev, musicStyleId: value }))
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const musicStyles = await fetchMusicStyle.fetchAll()
      setOptions(musicStyles)
    }
    fetchData()
  }, [])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-musical-style-title'>
        Qual o estilo musical do rolê?
      </Heading>
      <Grid
        gridTemplateColumns='1fr 1fr 1fr'
        width='100%'
        marginTop='2rem'
        gap='1rem'
        data-testid='event-musical-styles'
      >
        {options.map((category) => {
          return (
            <OptionItem
              key={category.id}
              title={category.name}
              {...getRadioProps({ value: `${category.id}` })}
            />
          )
        })}
      </Grid>
    </FormContainer>
  )
}

EventMusicalStyle.displayName = 'EventMusicalStyle'
