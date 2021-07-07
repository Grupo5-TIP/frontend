import { Bar } from 'react-chartjs-2';
import { useRef } from 'react'
import { Flex, Box, Button } from '@chakra-ui/react'
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

const VerticalBar = ({ data }) => {
    const ref = useRef();

    const handleDownload = () => {
        downloadCSV({ filename: "vertical-chart.csv", chart: ref.current })
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

        filename = args.filename;

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
        keys.forEach((key) => {
            result += labels[key] + columnDelimiter;
            result += data[key] + lineDelimiter;
        });
        return result;
    }
    return (
        <Flex>
            <Box>
                <Bar ref={ref} width={600} height={600} data={data} options={options} />
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


        </Flex>


    )
};

export default VerticalBar;