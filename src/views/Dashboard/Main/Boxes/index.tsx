import React from 'react'
import Box from './Box'
import Container from '@/components/container'

const data = [
    {
        title:"Users",
        value:"1,234",
        format:"person",
        description:"Sed diam nonumy eirmod tempor"
    },
    {
        title:"Features",
        value:"23",
        format:"feature",
        description:"Lorem ipsum dolor sit amet"
    },
    {
        title:"Sales",
        value:"$23,4",
        format:"dollar",
        description:"Consectetur adip iscing elit"
    },
]


const Index = () => {
  return (
    <Container className='flex gap-4 my-2 max-sm:flex-col'>
        {data.map((item,) => (
            <Box key={item.title}  data={item} />
        ))}
    </Container>
  )
}

export default Index