import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import * as Yup from "yup";
import GoogleIconSvg from '../../assets/google-icon.svg'

import {
  Container,
  Form,
  RegisterButtonContainer,
  Title,
  SocialLoginButtonContainer
} from './styles';
import { Button } from "../../components/Form/Button";
import { ButtonSocialLogin } from "../../components/Form/ButtonSocialLogin";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email obrigatório!"),
  password: Yup.string().required("Senha obrigatória")
});

interface FormData {
  email: string;
  password: string;
}

export function Home() {
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
      signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível realizar o login pelo Google");
    }
  }

  return(
    <Container>
      <Form>
        <Input 
          title="E-mail"
          name="email"
          control={control}
          error={errors.email && errors.email.message}
        />

        <Input 
          title="Password"
          name="password"
          control={control}
          error={errors.password && errors.password.message}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={handleSubmit(handleLogin)}
        />
      </Form>

      {/* <RegisterButtonContainer>
        <Title>Não possui conta?</Title>
      </RegisterButtonContainer> */}

      <SocialLoginButtonContainer>
        <ButtonSocialLogin
          title="Entrar com Google"
          svg={GoogleIconSvg}
          onPress={signInWithGoogle}
        />
      </SocialLoginButtonContainer>
    </Container>
  )
}