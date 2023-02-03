import React, { useEffect, useState } from 'react'

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

enum PriceTypes {
  FREE = '1',
  PAID = '2',
}

export const EventPrice: React.FC = () => {
  const options = [
    { id: '1', label: 'Gratuito' },
    { id: '2', label: 'Pago' },
  ]

  const [priceType, setPriceType] = useState('1')

  const { setFormState, formState, ...context } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({ value: priceType, onChange: setPriceType })

  const handleChangePrice = (event: React.BaseSyntheticEvent) => {
    const price = Number.parseFloat(event.target.value)
    setFormState((prev) => ({ ...prev, price }))
  }

  useEffect(() => {
    if (formState.price === 0) {
      setPriceType(PriceTypes.FREE)
    } else if (formState.price > 0) {
      setPriceType(PriceTypes.PAID)
    }
  }, [formState.price])

  useEffect(() => {
    if (priceType === PriceTypes.FREE) {
      setFormState((prev) => ({ ...prev, price: 0 }))
    }
  }, [priceType])

  useEffect(() => {
    if (formState.price !== undefined) context.setIsNextButtonDisabled(false)
    else context.setIsNextButtonDisabled(true)
  }, [])

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

      {priceType === PriceTypes.PAID && (
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
                value={formState.price}
                data-testid='event-price-input'
                placeholder='Enter the price'
                onChange={handleChangePrice}
              />
            </InputGroup>
          </Flex>
        </Flex>
      )}
    </FormContainer>
  )
}

EventPrice.displayName = 'EventPrice'
