import React, { useState, useCallback } from 'react';

import { ActivityIndicator } from 'react-native';

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
import { useRegister } from '../../hooks/register';
import { useFocusEffect } from '@react-navigation/core';

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
  const [loading, setLoading] = useState(false);

  const { signOut, user } = useAuth();
  const { getRegisters, deleteRegister } = useRegister();

  async function loadData() {
    try {
      setLoading(true);
      const response = await getRegisters(user.id) as LoginListDataProps;
  
      setData(response);
      setSearchListData(response);
    } catch (error) {
      Alert.alert('Ops','Ocorreu um erro ao tentar carregar os dados');
      console.log(error);
    } finally {
      setLoading(false);
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
    try {
      setLoading(true)
      const data = await deleteRegister(user.id, id) as LoginDataProps[];
      setData(data);
      setSearchListData(data);

    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }

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
          name: user.name,
          avatar_url: user.picture
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

        
        {
          loading ? <ActivityIndicator /> 
          : <LoginList
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
        }
      </Container>
    </>
  )
}