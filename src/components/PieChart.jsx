import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import kpiService from '../services/kpi-service';
import StatusAlertDisplay from '../components/StatusAlertDisplay';
import Loading from '../components/Loading';

const PieChart = ({dataTemplate}) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true);
    const [dataToDisplay, setDataToDisplay] = useState({});
    const dataMonths = [];
    const dataAmounts = [];



    useEffect(() => {
        const fetchData = async () => {
            kpiService.getDataLastMonths()
                .then(resp => {
                    handleData(resp)
                }).catch(err => {
                    console.log(err);
                    setError(err)
                });
        }

        const handleData = (resp) => {
            resp.map(month => {
                dataMonths.push(month.name);
                dataAmounts.push(month.amount);
            })
            dataTemplate.labels = dataMonths;
            dataTemplate.datasets[0].data = dataAmounts;
            setDataToDisplay(dataTemplate);
            setLoading(false);
        }

        setLoading(true);
        fetchData();
    }, [dataTemplate]);



    if (error !== '') {
        return (
            <StatusAlertDisplay top={2}
                padding={5}
                margin="0 auto"
                h="150px"
                w="500px"
                boxShadow="lg"
                status="error"
                message="Error al traer del server..."
            />
        )
    }
    return (
        <Flex>
            {
                loading ? <Box width="100%"><Loading /></Box> :
                    <Pie width={600} height={600} data={dataToDisplay} />
            }

        </Flex>


    )
};

export default PieChart;