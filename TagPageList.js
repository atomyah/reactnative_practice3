import React, {Component} from 'react';
import { AsyncStorage, FlatList, Text, View } from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import moment from 'moment';

const API_ENDPOINT = "https://qiita.com/api/v2/items";

class TagPageList extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "タグ：" + navigation.state.params.tag + "の新着記事"
        }
    }
    
    constructor() {
        super();
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        this.fetchArticles(1,this.props.navigation.getParam('tag'));
    }

    async fetchArticles(page, tag){
        try {
            const response = await fetch(`${API_ENDPOINT}?page=${page}&per_page=20&query=tag:${tag}`)
            const responseJson = await response.json();
            if(typeof responseJson == 'object' && responseJson.length > 0) {
                this.setState({articles: responseJson});
            }
        } catch(err) {
            console.warn(err);
        }
    }

    render() {
        const {articles} = this.state;
        return(
            <FlatList
                data={articles}
                renderItem={({item})=> {
                    return (
                        <ListItem
                            onPress={()=>
                                {this.props.navigation.navigate('WebViewPage', {url:item.url,title:item.title})}
                            }
                            key={item.id + ":" + item.user.id}
                            title={item.title}
                            leftAvatar={{
                                title: item.title,                           
                                source: {uri: item.user.profile_image_url},
                                rounded: true
                            }}    
                            subtitle={
                                <View style={{
                                    flexDirection: 'row',
                                    paddingLeft: 10,
                                    paddingTop: 5,
                                }}>
                                    <Text style={{color:"#ababab",fontSize:12,paddingRight:6,paddingLeft:6}}>
                                        {`by ${item.user.id}`}
                                    </Text>
                                    <Icon name="favorite" color={"#ababab"} size={10}/>
                                    <Text style={{color:"#ababab",fontSize:12,paddingRight:6,paddingLeft:6}}>
                                        {item.likes_count}
                                    </Text>
                                    <Icon name="comment" color={"#ababab"} size={10}/>
                                    <Text style={{color:"#ababab",fontSize:12,paddingRight:6,paddingLeft:6}}>
                                        {item.comments_count}
                                    </Text>
                                    <Text style={{color:"#ababab",fontSize:12,paddingRight:6,paddingLeft:6}}>
                                        {moment(item.created_at).format('YYYY/MM/DD')}
                                    </Text>
                                </View>
                            }                        
                        />
                    )
                }}
               keyExtractor={item=>item.id}
            />
        );
    }
}

export default TagPageList;