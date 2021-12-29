import React, { useState } from 'react';
import { Box, Center, Image, FormControl, FormLabel, Input, VStack, Button, Flex, InputRightElement } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import officail_logo from '../images/officail_logo.png';

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const onLogin = () => {
        // console.log(password, email)
    }

    return (
        <Center>
            <Box
                boxSize='400px'
                bg="#FFFFFF"
                mt='70px'
                borderRadius={'15px'}
                h="600px"
            >
                <Center>
                    <Image
                        mt="35px"
                        boxSize='170px'
                        src={officail_logo}
                        alt='Dan Abramov'
                    />

                </Center>
                <Box
                    textTransform={'uppercase'}
                    color={'brand.text'}
                    textAlign={'center'}
                    mt="30px"
                    fontWeight={"medium"}
                >
                    Login to student pick-up system
                </Box>

                <VStack mt="30px">
                    <FormControl w={'300px'} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            value={email}
                            placeholder='Your Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl w={'300px'} isRequired>
                        <FormLabel mt="10px">Password</FormLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem' mt="47px">
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </FormControl>

                </VStack>


                <Center>

                    <Box
                        bg="brand.button"
                        mt="55px"
                        w={'300px'}
                        h="45px"
                        borderRadius={'50px'}
                        color={'white'}
                        cursor={"pointer"}
                        p="5px"

                    >
                        <Flex
                            ml="15px"
                            mt={"4px"}
                            onClick={() => onLogin()}
                        >
                            <Box>Log In</Box>
                            <ArrowForwardIcon
                                w={4}
                                h={4}
                                ml="205px"
                                mt={"6px"}
                            />
                        </Flex>
                    </Box>
                </Center>

            </Box>


        </Center>
    )
}
