import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Icon} from 'react-native-elements';
import TagNavigation from './TagNavigation';
import KeywordNavigation from './KeywordNavigation';



const RootNavigator = createBottomTabNavigator({
  TagNavigation: {
      screen:TagNavigation,
      navigationOptions:{
        title: 'Tag',
        tabBarLabel: 'タグ',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={"label"}/>
      ),
    }
  },
  KeywordNavigation: {
    screen:KeywordNavigation,
    navigationOptions:{
      title: 'Keyword',
      tabBarLabel: 'キーワード',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={"room"}/>
    ),
  }
}
});

const App = createAppContainer(RootNavigator);
export default App;
