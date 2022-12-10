/* eslint-disable max-len */
import { theme } from '@/presentation/theme'
import { Box, keyframes } from '@chakra-ui/react'

const animationKeyFrames = keyframes`
  100% {
    transform: translateX(100%);
  }
`

const animation = `${animationKeyFrames}  1.2s infinite`

export const EventCardSkeleton: React.FC = () => {
  const disabledBackground = theme.colors.disabledBackground as string

  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Box
          data-testid='event-skeleton'
          key={item}
          sx={{
            position: 'relative',
            width: '100%',
            height: '300px',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `
          linear-gradient(to right, ${disabledBackground}, ${disabledBackground}),
          linear-gradient(to right, ${disabledBackground}, ${disabledBackground}),
          linear-gradient(to right, ${disabledBackground}, ${disabledBackground}),
          linear-gradient(to right, ${disabledBackground}, ${disabledBackground})
            `,
            backgroundPosition: `
          0px 0px,
          0px 190px,
          0px 210px,
          0px 230px
        `,
            backgroundSize: `
          100% 180px,
          60% 12px,
          100% 10px,
          200px 10px
        `,
          }}
          _after={{
            animation,
            content: '" "',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'translateX(-100%)',
            backgroundImage:
              'linear-gradient(to right, transparent,rgba(255,255,255,0.8),transparent)',
          }}
        ></Box>
      ))}
    </>
  )
}

EventCardSkeleton.displayName = 'EventCardSkeleton'
