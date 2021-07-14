import { Pie } from 'react-chartjs-2';
import { Flex, Box } from '@chakra-ui/react'

const PieChart = ({ data }) => {

    return (
        <Flex>
            <Box>
                <Pie width={600} height={600} data={data} />
            </Box>
        </Flex>


    )
};

export default PieChart;