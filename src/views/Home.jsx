import { Flex } from "@chakra-ui/layout";
import Login from '../components/Login'

const Home = () => {
    return (
        <Flex justifyContent={"center"} flexGrow={1}>
            <Login />
        </Flex>
        
    )
}

export default Home;