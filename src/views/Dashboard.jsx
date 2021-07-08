import { withRouter, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Flex, Box, Stack, Heading } from '@chakra-ui/react'
import { validateLogin } from '../utils/validate-login';
import invoiceService from '../services/invoice-service';
import VerticalBar from '../components/VerticalChart';
import PieChart from '../components/PieChart';
import Loading from '../components/Loading';
import StatusAlertDisplay from '../components/StatusAlertDisplay';
import { translate } from "../utils/month-translator";

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
                'rgba(150, 135, 59)',
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
                'rgba(150, 135, 59)',
            ],
            borderWidth: 1,
        },
    ],
};


const Checkout = (...props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dataToDisplay, setDataToDisplay] = useState({});
    const dataMonths = [];
    const dataAmounts = [];

    useEffect(() => {
        const fetchData = async () => {
            invoiceService.getInvoicesByMonth()
                .then(resp => {
                    handleData(resp.data)
                }).catch(err => {
                    setError(err)
                });
        }

        const handleData = (resp) => {
            resp.forEach(monthData => {
                dataMonths.push(translate(monthData.month));
                dataAmounts.push(monthData.totalAmmount);
            })
            dataTemplate.labels = dataMonths;
            dataTemplate.datasets[0].data = dataAmounts;
            setDataToDisplay(dataTemplate);
            setLoading(false);
        }

        setLoading(true);
        fetchData();
    }, [dataTemplate, setDataToDisplay]);


    if (error !== '') {
        return (
            <Flex margin="0 auto" flexGrow={1} width="100%">
                <StatusAlertDisplay top={2}
                    padding={5}
                    margin="0 auto"
                    h="150px"
                    w="80%"
                    boxShadow="lg"
                    status="error"
                    message="Error al traer del server..."
                />
            </Flex>
        )
    }

    if (!validateLogin()) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Flex padding={3}>
            {

                loading ? <Box margin="0 auto" width="70%"><Loading /></Box> :
                    <Stack margin="0 auto">
                        <Heading
                            as="h2"
                            size="3xl"
                            paddingTop={2}
                            data-testid="dashboard-title"
                            fontWeight={600}
                        > Acumulado mensual del año en curso
                        </Heading>
                        <Stack direction="row" >
                            <VerticalBar data={dataToDisplay} />
                            <PieChart data={dataToDisplay} />
                        </Stack>
                    </Stack>
            }
        </Flex>
    )
}

export default withRouter(Checkout);