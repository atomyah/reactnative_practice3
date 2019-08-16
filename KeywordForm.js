import React, {Component} from 'react';
import { AsyncStorage, View } from 'react-native';
import {
    Button,
    Input,
    Icon
} from 'react-native-elements';

class KeywordForm extends Component {

    static navigationOpstions = ({ navigation }) => {
        return {
            headerLeft: (
                <Icon
                    color='#f50'
                    name="keyboard-arrow-left"
                    iconStyle={{marginRight: 16}}
                    onPress={()=> {navigation.navigate('KeywordList')}}
                />
            )
        }
    }
    
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };

    //    this.onChangeInputText = this.onChangeInputText.bind(this);
        this.registerKeyword = this.registerKeyword.bind(this);
    }

    async registerKeyword() {
        try {
            const keyword = this.state.input;
            console.log('keywordは、' + keyword)
            const Keywords = await AsyncStorage.getItem('Keywords');
            let keywords = JSON.parse(Keywords)
            if(keywords === null) {
                keywords = []
            }

            if(typeof keywords != 'object' && keywords.lengh < 0) {
                return false;
            }
            if(!keyword) {
                return false;
            }
            for(let i in keywords) {
                if(keywords[i] === keyword) {
                    return false
                }
            }

            console.log('フォームInputのkeywordは、' + keyword) // 強化学習
            keywords = keywords.concat(keyword);
            console.log('concatされたkeywordsは、' + keywords) // 強化学習
            await AsyncStorage.setItem('Keywords', JSON.stringify(keywords));
            this.refs["form-input"].clear();
        } catch(error) {
            console.error(error);
        }
    }
    /*
    onChangeInputText(input){
        this.setState({input, errorMessage: ""});
    }
    */
   // <Input>↓の中の onChangeText={this.onChangeInputText}　を変更
    render(){
        return (
            <View>
                <Input ref="form-input" label="新しく登録するキーワード" onChangeText={(text)=>{this.setState({input: text})}} />
                <Button onPress={this.registerKeyword} title="登録する"/>
            </View>
        )
    }
}
export default KeywordForm;