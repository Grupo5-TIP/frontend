import AlertDisplay from '../components/AlertDisplay';
import { Flex } from "@chakra-ui/react";

const StatusAlertDisplay = ({top, padding, margin, h, w, boxShadow, status, message}) => {
    return (
        <Flex top={top} padding={padding} margin={margin} h={h} w={w} boxShadow={boxShadow}>
            <AlertDisplay status={status} message={message} />
        </Flex>
    )
}

export default StatusAlertDisplay;