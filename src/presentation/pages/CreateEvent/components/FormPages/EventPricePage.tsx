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

import { useCreateEventContext } from '../../context/create-event-context'
import { FormContainer } from '../FormContainer'
import { OptionItem } from '../OptionItem'

export const EventPricePage: React.FC = () => {
  const options = [
    { id: '1', label: 'Gratuito' },
    { id: '2', label: 'Pago' },
  ]

  const [priceType, setPriceType] = useState('')
  const [price, setPrice] = useState('0')

  const { setFormState, formState } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({
    defaultValue: '',
    value: priceType,
    onChange: (value) => setPriceType(value),
  })

  useEffect(() => {
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
      <Heading size='md'>Sobre o preço, a entrada é paga ou gratuita?</Heading>
      <Grid gridTemplateColumns='1fr 1fr 1fr' width='100%' marginTop='2rem' gap='1rem'>
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
          <Heading size='md'>Qual o valor da entrada?</Heading>

          <Flex width='100%' marginTop='1rem'>
            <InputGroup>
              <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                $
              </InputLeftElement>
              <Input
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

EventPricePage.displayName = 'EventPricePage'
