import 'react-native-gesture-handler';


import { NavigationContainer } from '@react-navigation/native'
import { Navigation } from './presentation/navigation/Navigation';

export const App = () => {
  return (
    <NavigationContainer>
        {/* Nuestro navigation  nos lleva al homeScreen */}
        <Navigation/>
    </NavigationContainer>
  )
}
