import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  Metadata,
  TotalPassAndEditButtonContainer,
  EditButton,
  EditButtonText,
  Title,
  TotalPassCount,
  LoginList,
} from './styles';
import { Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

export function Dashboard() {
  const [searchText, setSearchText] = useState('');
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);
  const [editing, setEditing] = useState(false);

  const { signOut } = useAuth();

  const dataKey = '@savepass:logins';

  async function loadData() {
    
    const response = await AsyncStorage.getItem(dataKey);

    if (response) {
      const currentData = JSON.parse(response);
      setData(currentData);
      setSearchListData(currentData);
    }
  }

  function handleFilterLoginData() {
    if (searchText !== '') {
      const result = data.filter(item => {
        if (item.service_name
          .toLowerCase()
          .includes(searchText.toLowerCase())) {
          return item;
        }
      })
      setSearchListData(result);
    }
  }

  function handleChangeInputText(text: string) {
    setSearchText(text);

    if (text === '') {
      setSearchListData(data);
    }
  }

  function handleEditingList() {
    setEditing(!editing);
  }

  function handleDeleteItem(id: string) {
    Alert.alert("Deletando Item", 
      "Tem certeza que deseja deletar este item",
      [
        {
          text:"Confirmar",
          onPress: () => deleteItem(id),
          style: 'destructive'
        },
        {
          text:"Cancel",
          style: 'cancel'
        }
      ])
  }

  async function deleteItem(id: string) {
    const dataFormatted = data.filter(item => {
      if (item.id !== id) {
        return item;
      }
    })

    setData(dataFormatted);
    setSearchListData(dataFormatted);
    await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
  }

  async function handleSignOut() {
    Alert.alert(
      "Sign Out",
      "Deseja encerrar a sessão?",
      [
        {
          text:"Sim",
          onPress: signOut,
          style: "default"
        },
        {
          text:"Não",
          style: "cancel"
        },
        
      ]
    );
    
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  return (
    <>
      <Header
        user={{
          name: 'Rocketseat',
          avatar_url: 'https://i.ibb.co/ZmFHZDM/rocketseat.jpg'
        }}
        handleSignOut={handleSignOut}
      />
      <Container>
        <SearchBar
          placeholder="Qual senha você procura?"
          onChangeText={handleChangeInputText}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}

          onSearchButtonPress={handleFilterLoginData}
        />

        <Metadata>
          <Title>Suas senhas</Title>

          <TotalPassAndEditButtonContainer>
            <TotalPassCount>
              {searchListData.length
                ? `${`${searchListData.length}`.padStart(2, '0')} ao total`
                : 'Nada a ser exibido'
              }
            </TotalPassCount>

            {
              searchListData.length > 0 &&
              <EditButton onPress={handleEditingList}> 
                <EditButtonText>Editar</EditButtonText>
              </EditButton>
            }

          </TotalPassAndEditButtonContainer>
        </Metadata>

        

        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          renderItem={({ item: loginData }) => {
            return <LoginDataItem
              data={{
                id: loginData.id,
                service_name: loginData.service_name,
                email: loginData.email,
                password: loginData.password,
              }}
              deleteItem={handleDeleteItem}
              editing={editing}
            />
          }}
        />
      </Container>
    </>
  )
}