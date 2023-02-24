import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { RemoteFetchMusicStyle } from '@/data/usecases'
import { MusicStyleModel } from '@/domain/models'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { stepPage } from '@/presentation/components/StepPage/store/step-page'
import { createEvent } from '@/presentation/pages/CreateEvent/store/create-event'
import { Grid, Heading, useRadioGroup } from '@chakra-ui/react'
import { FormContainer, OptionItem } from '@pages/CreateEvent/components'

type EventMusicalStyleProps = {
  any?: any
}

const axios = makeAuthorizeHttpClientDecorator()
const fetchMusicStyle = new RemoteFetchMusicStyle(axios)

export const EventMusicalStyle: React.FC<EventMusicalStyleProps> = observer(() => {
  const [options, setOptions] = useState<MusicStyleModel[]>([])

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: createEvent.formState.musicStyleId,
    onChange: (value: string) => {
      createEvent.setFormState({ ...createEvent.formState, musicStyleId: value })
    },
  })

  useEffect(() => {
    fetchMusicStyle.fetchAll().then(setOptions)
  }, [])

  useEffect(() => {
    if (createEvent.formState.musicStyleId) stepPage.disableNextButton(false)
    else stepPage.disableNextButton(true)
  }, [createEvent.formState.musicStyleId])

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
})

EventMusicalStyle.displayName = 'EventMusicalStyle'
