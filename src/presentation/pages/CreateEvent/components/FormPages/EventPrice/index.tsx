import { useEffect, useState } from 'react'

import {
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useRadioGroup,
} from '@chakra-ui/react'
import { FormContainer, OptionItem } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

export const EventPrice: React.FC = () => {
  const options = [
    { id: '1', label: 'Gratuito' },
    { id: '2', label: 'Pago' },
  ]

  const [priceType, setPriceType] = useState('')
  const [price, setPrice] = useState<number | null>(null)

  const { setFormState, formState, ...context } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({
    value: priceType,
    onChange: (value) => {
      setPriceType(value)
      context.setIsNextButtonDisabled(false)
    },
  })

  useEffect(() => {
    if (formState.price === null) return

    if (formState.price === 0) {
      setPriceType('1')
    } else if (formState.price > 0) {
      setPriceType('2')
    }
  }, [formState.price])

  useEffect(() => {
    if (priceType === '1') {
      setFormState((prev) => ({ ...prev, price: 0 }))
      setPrice(null)
    }
  }, [priceType])

  useEffect(() => {
    setFormState((prev) => ({ ...prev, price: price || 0 }))
  }, [price])

  return (
    <FormContainer>
      <Heading size='md' data-testid='event-price-title'>
        Sobre o preço, a entrada é paga ou gratuita?
      </Heading>
      <Grid
        gridTemplateColumns='1fr 1fr 1fr'
        width='100%'
        marginTop='2rem'
        gap='1rem'
        data-testid='event-prices'
      >
        {options.map((price) => {
          return (
            <OptionItem
              key={`price-${price.id}`}
              title={price.label}
              {...getRadioProps({ value: `${price.id}` })}
            />
          )
        })}
      </Grid>

      {priceType === '2' && (
        <Flex marginTop='2rem' flexFlow='row wrap'>
          <Heading size='md' data-testid='event-price-value-title'>
            Qual o valor da entrada?
          </Heading>

          <Flex width='100%' marginTop='1rem'>
            <InputGroup>
              <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                $
              </InputLeftElement>
              <Input
                data-testid='event-price-input'
                placeholder='Enter the price'
                onChange={(event) => setPrice(Number.parseFloat(event.target.value))}
              />
            </InputGroup>
          </Flex>
        </Flex>
      )}
    </FormContainer>
  )
}

EventPrice.displayName = 'EventPrice'
