import React, { useState } from 'react';

import {
  Container,
  ShowPasswordButton,
  Icon,
  PassData,
  Title,
  Password,
  LoginData,
  BoldTitle,
  Email,
  LoginDataInfoContainer,
  DeleteIconButton,
  DeleteIcon,
} from './styles';

interface LoginDataItemProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

interface Props {
  data: LoginDataItemProps;
  deleteItem: (id: string) => void;
  editing: boolean;
}

export function LoginDataItem({
  data,
  deleteItem,
  editing
}: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container
      colors={[
        passIsVisible
          ? '#EBF2FF'
          : '#ffffff',
        '#ffffff'
      ]}
    >
      <LoginDataInfoContainer>
        <ShowPasswordButton
          onPress={handleTogglePassIsVisible}
        >
          <Icon
            name={passIsVisible ? "eye" : "eye-off"}
            color={passIsVisible ? '#1967FB' : '#888D97'}
          />
        </ShowPasswordButton>

        {passIsVisible
          ? (
            <PassData>
              <Title>{data.service_name}</Title>
              <Password>{data.password}</Password>
            </PassData>
          )
          : (
            <LoginData>
              <BoldTitle>{data.service_name}</BoldTitle>
              <Email>{data.email}</Email>
            </LoginData>
          )
        }
      </LoginDataInfoContainer>
      
      {
        editing && (
          <DeleteIconButton onPress={() => {deleteItem(data.id)}}>
            <DeleteIcon
              name="x"
            />
          </DeleteIconButton>
        )
      }
    </Container>
  );
}