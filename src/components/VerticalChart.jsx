import { Bar } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react'
import { Flex, Box, Button } from '@chakra-ui/react'
import kpiService from '../services/kpi-service';
import StatusAlertDisplay from '../components/StatusAlertDisplay';
import Loading from '../components/Loading';
import { hover } from '../utils/buttonDesign'

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const columnDelimiter = ',';
const lineDelimiter = '\n';

const VerticalBar = ({ dataTemplate }) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true);
    const [dataToDisplay, setDataToDisplay] = useState({});
    const dataMonths = [];
    const dataAmounts = [];
    const ref = useRef();

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
    }, [dataTemplate, setDataToDisplay]);


    const handleDownload = () => {
        downloadCSV({ filename: "vertical-chart.csv", chart: ref.current})
    }

    function downloadCSV(args) {
        let data = args.chart.data;
        let filename, link;
        let csv = "";

        csv += convertChartDataToCSV({
            data: data.datasets[0].data,
            labels: data.labels
        });

        if (csv == null) return;

        filename = args.filename ;

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }

        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
    }

    function convertChartDataToCSV(args) {
        let result, keys, data, labels;

        data = args.data || null;
        if (data == null) return '';
        keys = Object.keys(args.labels);
        labels = args.labels;

        result = '';
        keys.forEach((key) =>{
            result+= labels[key]+columnDelimiter;
            result+= data[key]+lineDelimiter;
        });
        return result;
    }

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
                    <Box>
                        <Bar ref={ref} width={600} height={600} data={dataToDisplay} options={options} />
                        <Button
                            marginLeft={15}
                            bg="theme.100"
                            color="white"

                            onClick={() => handleDownload()}
                            size="lg"
                            _hover={hover}>
                            Descarga a CSV
                        </Button>
                    </Box>
            }

        </Flex>


    )
};

export default VerticalBar;