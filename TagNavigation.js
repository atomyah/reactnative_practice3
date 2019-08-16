import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TagList from './TagList';
import TagPageList from './TagPageList';
import TagSubscriber from './TagSubscriber';
import WebViewPage from './WebViewPage';

export default createStackNavigator({
    TagList: {
        screen: TagList,
        navigationOptions: {
            title: "登録済みのタグ",
            headerBackTitle: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: "#55c401",
                color: "#fff",
            }
        }
    },
    TagPageList: {
        screen: TagPageList,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: "#55c401",
                color: "#fff",
            }
        }        
    },
    TagSubscriber: {
        screen: TagSubscriber,
        navigationOptions: {
            title: "新しいタグを登録",
            headerBackTitle: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: "#55c401",
                color: "#fff",
            }
        }
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: "#55c401",
                color: "#fff",
            }
        }   
    }
});
