import React from 'react';
import { useNavigation } from '@react-navigation/native';


import {
  Container,
  AboutUser,
  Avatar,
  TextContainer,
  HelloMessage,
  BoldText,
  SecondaryMessage,
  AddButton,
  Icon,
  BackButton,
  Title,
} from './styles';

interface HeaderProps {
  user?: {
    name: string;
    avatar_url: string;
  },
  handleSignOut?: () => Promise<void>
}

export function Header({ 
  user,
  handleSignOut 
}: HeaderProps) {
  const { goBack } = useNavigation();


  return (
    <Container
      hasUserData={!!user}
      style={{
        ...(user
          ? {
            backgroundColor: '#1967FB'
          }
          : {
            backgroundColor: '#FFFFFF'
          })
      }}
    >
      {user ? (
        <>
          <AboutUser>
            <Avatar source={{ uri: user.avatar_url }} />

            <TextContainer>
              <HelloMessage>
                Olá, <BoldText>{user.name}</BoldText>
              </HelloMessage>

              <SecondaryMessage>
                Sinta-se seguro aqui
              </SecondaryMessage>
            </TextContainer>
          </AboutUser>

          <AddButton onPress={handleSignOut}>
            <Icon
              name="power"
              color="#FFFFFF"
              size={24}
            />
          </AddButton>
        </>
      ) : (
        <Title>Cadastro de senha</Title>
      )}
    </Container>
  );
}