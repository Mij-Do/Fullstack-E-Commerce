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


const Login = () => {
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [isValid, setIsValid] = useState(false);

    
    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {email, password} = user;
        const errors = formInputValidation ({
            email,
            password
        });
        const hasMsgError = Object.values(errors).some(value => value === '') 
        && Object.values(errors).every(value => value === '');

        if (!hasMsgError) {
            setErrors(errors);
            setIsValid(true);
            return;
        } 
        setIsValid(true);
        console.log(user)
    }
    
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event?.target;
        setUser((prev) => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: '',}));
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
                                Email <Field.RequiredIndicator />
                            </Field.Label>
                            <Input type='email' name='email' value={user.email} onChange={onChangeHandler} />
                            <Field.ErrorText> 
                                <ErrorMsg msg={errors.email}/>
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
                                <Text color={'blue.400'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                type='submit'
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