import { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    Box,
    Avatar,
    FormControl,
    InputRightElement,
    useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { hover } from '../utils/buttonDesign';
import authService from "../services/auth-service";

const CFaUserAlt = () => {
    return (
        <Box >
            <FaUserAlt
                color="gray.300"
                size={25}>
            </FaUserAlt>
        </Box>
    )
}

const UserFaLock = () => {
    return (
        <Box >
            <FaLock
                color="gray.300"
                size={25}>
            </FaLock>
        </Box>
    )
}

const FiEyeComponent = () => {
    return (
        <Box >
            <FiEye
                color="gray.300"
                size={25}>
            </FiEye>
        </Box>
    )
}

const FiEyeOffComponent = () => {
    return (
        <Box >
            <FiEyeOff
                color="gray.300"
                size={25}>
            </FiEyeOff>
        </Box>
    )
}

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const handleShowClick = () => setShowPassword(!showPassword);

    const handleChangeUser = (e) => {
        e.preventDefault();
        setUser(e.target.value)
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const isEmpty = (value) => {
        return (typeof value === 'undefined' || value === null || value === '');
      }

    const handleLogin = (e) => {
        e.preventDefault();

        setIsLogin(true);

        if (isEmpty(user) || isEmpty(password)) {
            toast({
                title: "Datos inválidos.",
                description: "Debe completar todos los campos.",
                status: "error",
                duration: 1500,
                isClosable: true,
            })
            
            return;

        }

        authService.login(user, password)
            .then(resp => {
                const isAdmin = resp.data.isAdmin;
                localStorage.setItem('isAdmin', isAdmin);
                localStorage.setItem('username', resp.data.username);
                isAdmin ? history.push("/dashboard/") : history.push("/tables/")
            })
            .catch(err => {
                toast({
                    title: "Login inválido.",
                    description: "El usuario y/o contraseña no es válida.",
                    status: "error",
                    duration: 1500,
                    isClosable: true,
                })
            });
        setIsLogin(false)
    }

    return (
        <Flex
            flexDirection="column"
            width="100%"
            backgroundColor="gray.100"
            justifyContent="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                alignItems="center"
            >
                <Avatar bg="theme.100" />
                <Heading color="theme.100">Bienvenido!</Heading>
                <Box>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="white"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt />}
                                    />
                                    <Input type="text" placeholder="Usuario" onChange={(e) => handleChangeUser(e)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<UserFaLock />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        onChange={(e) => handleChangePassword(e)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? <FiEyeOffComponent/> : <FiEyeComponent/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                _hover={hover}
                                onClick={(e) => handleLogin(e)}
                            >
                                Ingresar
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )

}

export default Login;