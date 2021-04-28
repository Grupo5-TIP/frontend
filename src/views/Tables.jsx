import { Flex } from "@chakra-ui/layout";
import Table from '../components/Table';

const Tables = ({tables}) => {
    return (
        <Flex flexDirection={"column"}> 
            {tables.map( table =>
                <Table
                    key = {table.id}
                    table={table}
                />
                )
           }
        </Flex>
    )
}

export default Tables;