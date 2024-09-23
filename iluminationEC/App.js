import { StyleSheet, View } from 'react-native'
import { TokenProvider } from './ButtonContext';
import Router from './Router'

export default function App() {
  return (
    <TokenProvider>
      <View style={styles.container}>
        < Router />
      </View>
    </TokenProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
