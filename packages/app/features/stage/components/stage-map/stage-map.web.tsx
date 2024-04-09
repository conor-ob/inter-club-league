import { Card } from 'app/components/card/card'
import { HeroIcon } from 'app/components/icon/heroicon'
import { Column } from 'app/components/layout/column'
import { Row } from 'app/components/layout/row'
import { colors } from 'app/design/colors'
import { Stage } from 'app/generated/graphql'
import useAppleDevice from 'app/hooks/use-apple-device'
import useScreenSize from 'app/hooks/use-screen-size'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Link } from 'solito/link'

export function StageMap({ stage }: { stage: Stage }) {
  const screenSize = useScreenSize()

  // hack for padding of px-4 on each side - 16 + 16 =  32px
  // 768px = max-w-3xl
  const maxMapWidth = 768
  const mapWidth = Math.min(screenSize.width, maxMapWidth) - 32
  const marginLeft = `-${Math.floor(mapWidth / 2)}px`

  const apiKey = 'AIzaSyAcdXzRjKbuTL6DCbjR9r74lAmZhppaW_M'
  const zoom = 14

  return (
    <Column>
      <Text className='text-primary font-inter-medium ml-4 text-xl'>
        Location
      </Text>
      <View className='h-2' />
      <Card>
        <Column>
          <div
            className='rounded-t-xl'
            style={{ width: '100%', overflow: 'hidden', height: '250px' }}
          >
            <iframe
              style={{
                border: '0',
                marginTop: '-125px',
                marginLeft: marginLeft,
                pointerEvents: 'none'
              }}
              width='200%'
              height='500'
              loading='lazy'
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${stage.coordinates}&center=${stage.coordinates}&zoom=${zoom}`}
            />
          </div>
          <Directions stage={stage} />
        </Column>
      </Card>
    </Column>
  )
}

function Directions({ stage }: { stage: Stage }) {
  const colorScheme = useColorScheme()
  // const isAppleDevice = useAppleDevice()

  return (
    <Row className='items-center justify-between px-4 py-4'>
      <Text className='text-secondary font-inter-regular text-base'>
        {stage.location}
      </Text>
      <TouchableOpacity>
        <Link
          href={
            useAppleDevice()
              ? `maps://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
              : `https://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
          }
        >
          <Row>
            <Text className='text-brand-blue font-inter-regular text-base'>
              Directions
            </Text>
            <HeroIcon
              name={'chevron-right'}
              color={colors[colorScheme ?? 'light'].brandBlue}
              size={24}
            />
          </Row>
        </Link>
      </TouchableOpacity>
    </Row>
  )

  // if (isAppleDevice) {
  //   return (
  //     <Row className='items-center justify-between px-4'>
  //       <Text className='text-secondary font-inter-regular pr-4 text-base'>
  //         {`Directions to ${stage.location}`}
  //       </Text>
  //       <View className='h-4' />
  //       <Column>
  //         <TouchableOpacity className='flex-1 items-end py-4'>
  //           <Link
  //             href={`maps://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`}
  //           >
  //             <Row>
  //               <Text className='text-brand-blue font-inter-regular text-base'>
  //                 Apple Maps
  //               </Text>
  //               <View className='w-2' />
  //               <HeroIcon
  //                 name={'chevron-right'}
  //                 color={colors[colorScheme ?? 'light'].brandBlue}
  //                 size={24}
  //               />
  //             </Row>
  //           </Link>
  //         </TouchableOpacity>
  //         <TouchableOpacity className='flex-1 items-end py-4'>
  //           <Link
  //             href={`https://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`}
  //           >
  //             <Row>
  //               <Text className='font-inter-regular text-brand-blue text-base'>
  //                 Google Maps
  //               </Text>
  //               <View className='w-2' />
  //               <HeroIcon
  //                 name={'chevron-right'}
  //                 color={colors[colorScheme ?? 'light'].brandBlue}
  //                 size={24}
  //               />
  //             </Row>
  //           </Link>
  //         </TouchableOpacity>
  //       </Column>
  //     </Row>
  //   )
  // } else {
  //   return (
  //     <Row className='items-center justify-between px-4 py-4'>
  //       <Text className='text-secondary font-inter-regular text-base'>
  //         {stage.location}
  //       </Text>
  //       <TouchableOpacity>
  //         <Link
  //           href={
  //             useAppleDevice()
  //               ? `maps://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
  //               : `https://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
  //           }
  //         >
  //           <Row>
  //             <Text className='text-brand-blue font-inter-regular text-base'>
  //               Directions
  //             </Text>
  //             <HeroIcon
  //               name={'chevron-right'}
  //               color={colors[colorScheme ?? 'light'].brandBlue}
  //               size={24}
  //             />
  //           </Row>
  //         </Link>
  //       </TouchableOpacity>
  //     </Row>
  //   )
  // }
}

// function Directions({ stage }: { stage: Stage }) {
//   const colorScheme = useColorScheme()
//   const isAppleDevice = useAppleDevice()

//   if (isAppleDevice) {
//     return (
//       <Column>
//         {/* <Text className='text-secondary font-inter-regular p-4 pb-0 text-base'>
//           Directions
//         </Text> */}
//         <Column>
//           <FlatList
//             data={[
//               {
//                 label: 'Apple Maps',
//                 href: `maps://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
//               },
//               {
//                 label: 'Google Maps',
//                 href: `https://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
//               }
//             ]}
//             renderItem={({ item }) => (
//               <TouchableOpacity className='items-end p-4'>
//                 <Link href={item.href}>
//                   <Row>
//                     <Text className='text-brand-blue font-inter-regular text-base'>
//                       {item.label}
//                     </Text>
//                     <View className='w-2' />
//                     <HeroIcon
//                       name={'chevron-right'}
//                       color={colors[colorScheme ?? 'light'].brandBlue}
//                       size={24}
//                     />
//                   </Row>
//                 </Link>
//               </TouchableOpacity>
//             )}
//             ItemSeparatorComponent={() => <CardDivider />}
//           />
//         </Column>
//       </Column>
//     )
//   } else {
//     return (
//       <Row className='items-center justify-between px-4 py-4'>
//         <Text className='text-secondary font-inter-regular text-base'>
//           {stage.location}
//         </Text>
//         <TouchableOpacity>
//           <Link
//             href={
//               useAppleDevice()
//                 ? `maps://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
//                 : `https://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
//             }
//           >
//             <Row>
//               <Text className='text-brand-blue font-inter-regular text-base'>
//                 Directions
//               </Text>
//               <View className='w-2' />
//               <HeroIcon
//                 name={'chevron-right'}
//                 color={colors[colorScheme ?? 'light'].brandBlue}
//                 size={24}
//               />
//             </Row>
//           </Link>
//         </TouchableOpacity>
//       </Row>
//     )
//   }
// }
