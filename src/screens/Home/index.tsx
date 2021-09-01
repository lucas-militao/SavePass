import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import GoogleIconSvg from '../../assets/google-icon.svg'
import Logo from '../../../assets/images/adaptive-icon.png';

import {
  Container,
  SocialLoginButtonContainer,
  LogoContainer,
  Form,
  RegisterButtonContainer,
  Title
} from './styles';

import { ButtonSocialLogin } from "../../components/Form/ButtonSocialLogin";
import { useAuth } from "../../hooks/auth";
import { Alert, Image, StatusBar } from "react-native";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { useTheme } from "styled-components";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email obrigatório!"),
  password: Yup.string().required("Senha obrigatória")
});

interface FormData {
  email: string;
  password: string;
}

export function Home() {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { signInWithGoogle } = useAuth();

  function handleLogin(formData: FormData) {
    console.log(formData);
  }

  async function handleSignInWithGoogle() {
    try {
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível realizar o login pelo Google");
    }
  }

  return(
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
      />
      
      <LogoContainer>
        <Image
          source={Logo}
          style={{
            tintColor: "white",
            height: 100,
            width: 100,
          }}
        />
      </LogoContainer>

      <Form>
        <Input 
          title="E-mail"
          name="email"
          control={control}
          error={errors.email && errors.email.message}
          color={theme.colors.primary_light}
        />

        <Input 
          title="Password"
          name="password"
          control={control}
          error={errors.password && errors.password.message}
          color={theme.colors.primary_light}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={handleSubmit(handleLogin)}
        />
      </Form>

      <RegisterButtonContainer>
        <Title>Não possui conta?</Title>
      </RegisterButtonContainer>


      <SocialLoginButtonContainer>
        <ButtonSocialLogin
          title="Entrar com Google"
          svg={GoogleIconSvg}
          onPress={handleSignInWithGoogle}
        />
      </SocialLoginButtonContainer>
    </Container>
  )
}