import 'react-native-gesture-handler';

import React from 'react';
import {View} from 'react-native';
import {ThemeProvider} from 'react-native-elements';

//Redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/redux/reducer';

//Dependance
import {NavigationContainer} from '@react-navigation/native';

//Navigation
import Navigator from './src/navigation';

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <ThemeProvider>
            <Navigator />
          </ThemeProvider>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
