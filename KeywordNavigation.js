import React from 'react';
import { createStackNavigator } from 'react-navigation';
import KeywordForm from './KeywordForm';
import KeywordList from './KeywordList';
import KeywordPageList from './KeywordPageList';
import WebViewPage from './WebViewPage';

export default createStackNavigator({
    KeywordList: {
        screen: KeywordList,
        navigationOptions: {
            title: "登録済みのキーワード",
            headerBackTitle: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: "#55c401",
                color: "#fff",
            }
        }       
    },
    KeywordForm: {
        screen: KeywordForm,
        navigationOptions: {
            title: "新しいキーワードを登録",
            headerBackTitle: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: "#55c401",
                color: "#fff",
            }
        }
    },
    KeywordPageList: {
        screen: KeywordPageList,
        navigationOptions: {
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
