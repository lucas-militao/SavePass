import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 ${RFValue(24)}px;
`;

export const Form = styled.View`
  margin-top: ${RFValue(24)}px;
`;