import { withRouter, Redirect } from 'react-router-dom';
import { Flex, Stack, Heading } from '@chakra-ui/react'
import { validateLogin } from '../utils/validate-login';
import VerticalBar from '../components/VerticalChart';
import PieChart from '../components/PieChart';

const dataTemplate = {
    labels: [],
    datasets: [
        {
            label: 'Venta en $ARS',
            data: [],
            backgroundColor: [
                'rgba(251, 139, 36)',
                'rgba(217, 3, 104)',
                'rgba(130, 2, 99)',
                'rgba(41, 23, 32)',
                'rgba(4, 167, 119)',
                'rgba(3, 3, 1)',
                'rgba(255, 67, 101)',
                'rgba(0, 217, 192)',
                'rgba(136, 209, 138)',
                'rgba(200, 62, 77)',
                'rgba(50, 55, 59)',
            ],
            borderColor: [
                'rgba(251, 139, 36)',
                'rgba(217, 3, 104)',
                'rgba(130, 2, 99)',
                'rgba(41, 23, 32)',
                'rgba(4, 167, 119)',
                'rgba(3, 3, 1)',
                'rgba(255, 67, 101)',
                'rgba(0, 217, 192)',
                'rgba(136, 209, 138)',
                'rgba(200, 62, 77)',
                'rgba(50, 55, 59)',
            ],
            borderWidth: 1,
        },
    ],
};


const Checkout = (...props) => {


    return (
        <Flex margin={10} flexGrow={1}>
            {
                !validateLogin() ? <Redirect to="/" />
                    :
                    <Stack>
                        <Heading as="h2" size="3xl" paddingTop={0} fontSize="md" data-testid="" fontWeight={600}> Acumulado del año </Heading>
                        <Stack direction="row" padding={5}>
                            <VerticalBar dataTemplate={dataTemplate} />
                            <PieChart dataTemplate={dataTemplate}/>
                        </Stack>
                    </Stack>
            }
        </Flex>
    )
}

export default withRouter(Checkout);