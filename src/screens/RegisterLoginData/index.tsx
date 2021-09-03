import React from 'react';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  Form
} from './styles';
import { useRegister } from '../../hooks/register';
import { useAuth } from '../../hooks/auth';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface FormData {
  service_name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  service_name: Yup.string().required('Nome do serviço é obrigatório!'),
  email: Yup.string().email('Não é um email válido').required('Email é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
})

export function RegisterLoginData() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { addRegister } = useRegister();

  async function handleRegister(formData: FormData) {
    try {
      await addRegister(formData, user.id);

      reset();
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Erro: ', error);
    } 
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <Header />
        <Container>
          <Form>
            <Input
              testID="service-name-input"
              title="Nome do serviço"
              name="service_name"
              error={
                errors.service_name && errors.service_name.message
              }
              control={control}
              autoCapitalize="sentences"
              autoCorrect
            />
            <Input
              testID="email-input"
              title="E-mail"
              name="email"
              error={
                errors.email && errors.email.message 
              }
              control={control}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              testID="password-input"
              title="Senha"
              name="password"
              error={
                errors.password && errors.password.message 
              }
              control={control}
              secureTextEntry
            />

            <Button
              style={{
                marginTop: RFValue(8)
              }}
              title="Salvar"
              onPress={handleSubmit(handleRegister)}
            />
          </Form>
        </Container>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  )
}