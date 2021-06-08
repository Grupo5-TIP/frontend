import {Stack, Skeleton } from "@chakra-ui/react"

const Loading = () => {
    return (
        <Stack padding="6" boxShadow="lg" bg="white">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>
    )
}

export default Loading;