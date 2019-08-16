import React, {Component} from 'react';
import { AsyncStorage, FlatList } from 'react-native';
import {Icon, ListItem} from 'react-native-elements';

class KeywordList extends Component {
    constructor() {
        super();
        this.state = {
            keywords:[]
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerRight:(
                <Icon
                    color='#f50'
                    name="add"
                    iconStyle={{marginRight: 16}}
                    onPress={()=> {navigation.navigate('KeywordForm')}}
                />
            )
        }
    }

    // リスナー：props.navigation.addListener('didFocus', () => 関数)
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => this.loadKeywords()) // 変更。
        this.loadKeywords();
    }

    /*
    componentDidFocus()を削除
    */

    async loadKeywords() {
        try {
            const Keywords = await AsyncStorage.getItem('Keywords');
            console.log('loadKeywordsの中のKeywordsは、' + Keywords); // ["機械学習","React"]
            let keywords = JSON.parse(Keywords);
            console.log('parse後のkeywordsは、' + keywords);　// 機械学習,React
            if(keywords != null) {  // && typeof keywords == 'object' && keywords.length > 0 を省略した
                this.setState({keywords});
                console.log('this.state.keywordsは、' + this.state.keywords) // 強化学習,React
            }
        } catch (err) {
            console.error(err);
        }
    }

    async removeKeyword(keyword) {
        try {
            const Keywords = await AsyncStorage.getItem('Keywords');
            console.log('removeKeyword()の中')
            console.log('Keywordsは、' + Keywords) // ["強化学習","React","量子コンピュータ","Angular"]
            console.log('keywordは、' + keyword) // React
            let keywords = JSON.parse(Keywords);           
            if(keywords == null) {
                return false;
            }
            if(typeof keywords != 'object' && keywords.length <0 ) {
                return false;
            }
            for(let i = 0; i < keywords.length; i++) {
                if(keywords[i] === keyword){
                keywords = [].concat(keywords.slice(0,i), keywords.slice(i+1,keywords.length)) // 0からi番目の直前までとi+1番目から最後までを切り出して最後にconcatでつなげる
                console.log('sliceされconcatでつながれたkeywordsは、' + keywords); // sliceされconcatでつながれたkeywordsは、強化学習,量子コンピュータ,Angular
                this.setState({keywords});
                await AsyncStorage.setItem('Keywords', JSON.stringify(keywords));
                }
            }
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        const { keywords } = this.state;
        console.log('render中のkeywordsは、' + this.state.keywords) // render中のkeywordsは、強化学習,量子コンピュータ,Angular
        return (
            <FlatList
                data={keywords}
                renderItem={({item}) => {
                    return(
                        <ListItem
                            onPress={() => this.props.navigation.navigate('KeywordPageList',{keyword: item})}
                            rightIcon={<Icon name="clear" onPress={()=>this.removeKeyword(item)}/>}
                            key={item}
                            title={item}
                        />

                    )
                }}
                keyExtractor={item => item}
            />
        );
    }
}
export default KeywordList;