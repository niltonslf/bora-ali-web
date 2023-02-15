import React, { useEffect, useState } from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { Flex, Grid, Heading, Input, useRadioGroup } from '@chakra-ui/react'
import { FormContainer, OptionItem } from '@pages/CreateEvent/components'
import { useCreateEventContext } from '@pages/CreateEvent/context/create-event-context'

enum PriceTypes {
  FREE = '1',
  PAID = '2',
}

const defaultMaskOptions = {
  prefix: 'R$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

export const EventPrice: React.FC = () => {
  const options = [
    { id: '1', label: 'Gratuito' },
    { id: '2', label: 'Pago' },
  ]

  const [priceType, setPriceType] = useState('1')

  const { setFormState, formState, ...context } = useCreateEventContext()

  const { getRadioProps } = useRadioGroup({ value: priceType, onChange: setPriceType })

  const currencyMask = createNumberMask({ ...defaultMaskOptions })

  const handleChangePrice = (event: React.BaseSyntheticEvent) => {
    const price = event.target.value

    console.log(price)

    setFormState((prev) => ({ ...prev, price }))
  }

  useEffect(() => {
    if (['', 'R$0'].includes(formState.price || '')) {
      return setPriceType(PriceTypes.FREE)
    }

    setPriceType(PriceTypes.PAID)
  }, [formState.price])

  useEffect(() => {
    if (priceType === PriceTypes.FREE) {
      setFormState((prev) => ({ ...prev, price: '' }))
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
            <Input
              as={MaskedInput}
              mask={currencyMask}
              data-testid='event-price-input'
              placeholder='R$0,00'
              type='text'
              onChange={handleChangePrice}
            />
          </Flex>
        </Flex>
      )}
    </FormContainer>
  )
}

EventPrice.displayName = 'EventPrice'
