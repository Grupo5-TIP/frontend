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
import Menu from '../components/Menu'

const dataTemplate = {
    labels: [],
    datasets: [
        {
            label: 'Venta en $ARS',
            data: [],
            backgroundColor: [
                'rgba(141,211,199)',
                'rgba(255,255,179)',
                'rgba(190,186,218)',
                'rgba(251,128,114)',
                'rgba(128,177,211)',
                'rgba(253,180,98)',
                'rgba(179,222,105)',
                'rgba(252,205,229)',
                'rgba(217,217,217)',
                'rgba(188,128,189)',
                'rgba(204,235,197)',
                'rgba(255,237,111)',
            ],
            borderColor: [
                'rgba(141,211,199)',
                'rgba(255,255,179)',
                'rgba(190,186,218)',
                'rgba(251,128,114)',
                'rgba(128,177,211)',
                'rgba(253,180,98)',
                'rgba(179,222,105)',
                'rgba(252,205,229)',
                'rgba(217,217,217)',
                'rgba(188,128,189)',
                'rgba(204,235,197)',
                'rgba(255,237,111)',
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
                        <Menu></Menu>
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