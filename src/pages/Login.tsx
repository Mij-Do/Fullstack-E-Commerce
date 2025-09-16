import { useColorModeValue } from '@chakra-ui/color-mode'
import {
Flex,
Box,
Input,
Stack,
Button,
Heading,
Text,
Field,
} from '@chakra-ui/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import ErrorMsg from '../components/ui/ErrorMsg';
import { formInputValidation } from '../validation';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../app/features/loginSlice';
import type { AppDispatch, RootState } from '../app/store';
import type { IUser } from '../interfaces';


const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {loading} = useSelector((state: RootState) => state.login);
    const [user, setUser] = useState<IUser>({
        identifier: '',
        password: '',
        documentId: '',
    });
    const [errors, setErrors] = useState({
        identifier: '',
        password: '',
    });
    const [isValid, setIsValid] = useState(false);

    
    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {identifier, password} = user;
        const errors = formInputValidation ({
            identifier,
            password
        });
        const hasMsgError = Object.values(errors).some(value => value === '') 
        && Object.values(errors).every(value => value === '');

        if (!hasMsgError) {
            setErrors(errors);
            setIsValid(true);
            return;
        } 
        dispatch(userLogin(user));
        setUser({
            identifier: '',
            password: '',
            documentId: '',
        });
        setTimeout(() => {
            location.replace("/");
        }, 2000);
    }
    
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event?.target;
        setUser((prev) => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: '',}));
        setIsValid(false);
    }

    return (
        <Flex
            minH={'80vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spaceY={5} mx={'auto'} maxW={'lg'} py={5} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <form onSubmit={onSubmitHandler}>
                        <Field.Root invalid={isValid}>
                            <Field.Label>
                                Email 
                            </Field.Label>
                            <Input type='identifier' name='identifier' value={user.identifier} onChange={onChangeHandler} />
                            <Field.ErrorText> 
                                <ErrorMsg msg={errors.identifier}/>
                            </ Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={isValid}>
                            <Field.Label>
                                Password
                            </Field.Label>
                            <Input type='password' name='password' value={user.password} onChange={onChangeHandler} />
                            <Field.ErrorText> 
                                <ErrorMsg msg={errors.password}/>
                            </ Field.ErrorText>
                        </Field.Root>
                        <Stack spaceY={3}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Text color={'blue.400'} cursor={"pointer"}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                type='submit'
                                loading={loading}
                                >
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login;