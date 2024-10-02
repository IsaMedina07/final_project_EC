import { StyleSheet, View } from 'react-native'
import { ButtonProvider } from './ButtonContext';
import Router from './Router'

export default function App() {
  return (
    <ButtonProvider>
      <View style={styles.container}>
        < Router />
      </View>
    </ButtonProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
