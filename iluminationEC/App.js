import { StyleSheet, View } from 'react-native'
import { ButtonProvider } from './ButtonContext';
import Router from './Router'
import Login from './src/screens/public/Login';

export default function App() {
  return (
    <ButtonProvider>
      <View style={styles.container}>
        < Login />
      </View>
    </ButtonProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
