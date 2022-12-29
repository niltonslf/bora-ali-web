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

import { useCreateEventContext } from '../../../context/create-event-context'
import { FormContainer } from '../../FormContainer'
import { OptionItem } from '../../OptionItem'

export const EventPrice: React.FC = () => {
  const options = [
    { id: '1', label: 'Gratuito' },
    { id: '2', label: 'Pago' },
  ]

  const [priceType, setPriceType] = useState('')
  const [price, setPrice] = useState<string | null>(null)

  const { setFormState, formState, ...context } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: priceType,
    onChange: (value) => {
      setPriceType(value)
      context.setIsNextButtonDisabled(false)
    },
  })

  useEffect(() => {
    console.log(formState.price)

    if (formState.price === '0') {
      setPriceType('1')
    } else {
      setPriceType('2')
    }
  }, [formState.price])

  useEffect(() => {
    if (priceType === '1') {
      setFormState((prev) => ({ ...prev, price: '0' }))
      setPrice('0')
    }
  }, [priceType])

  useEffect(() => {
    setFormState((prev) => ({ ...prev, price }))
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
        {options.map((category) => {
          return (
            <OptionItem
              key={category.id}
              title={category.label}
              {...getRadioProps({ value: category.id })}
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
                onChange={(event) => setPrice(event.target.value)}
              />
            </InputGroup>
          </Flex>
        </Flex>
      )}
    </FormContainer>
  )
}

EventPrice.displayName = 'EventPrice'
