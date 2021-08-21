import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

interface LoginListDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 24px;
`;

export const Metadata = styled.View`
  margin-top: 32px;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const TotalPassAndEditButtonContainer = styled.View``;

export const EditButton = styled.TouchableOpacity`
  align-items: flex-end;
`;

export const EditButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: 'Rubik_500Medium'
`;


export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};;
  color: #3D434D;
`;

export const TotalPassCount = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #888D97;
`;


export const LoginList = styled(
  FlatList as new () => FlatList<LoginListDataProps>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: ${RFValue(16)}px;
`;