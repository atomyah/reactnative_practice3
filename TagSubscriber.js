import React, {Component} from 'react';
import { AsyncStorage, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements';

const API_ENDPOINT = "https://qiita.com/api/v2/tags";

class TagSubscriber extends Component {

    constructor() {
        super();
        this.state={
            tags:[]
        }
    }

    componentDidMount() {
        this.fetchTags(1);
    }

    async fetchTags(page) {
        const response = await fetch(`${API_ENDPOINT}?page=${page}&per_page=100&sort=count`)
        const responseJson = await response.json()

        if(typeof responseJson == "object" && responseJson.length>0) {
            this.setState({tags:responseJson});
        }
    }

    async updateTags(tag) {
        try {
            const Tags = await AsyncStorage.getItem('Tags');
            let tags = JSON.parse(Tags)

            if(tags === null) {
                tags = [];
            }

            if(typeof tag == 'object' && tags.length>=0) {
                tags = tags.concat(tag);
                await AsyncStorage.setItem('Tags', JSON.stringify(tags));
            }
        } catch(error) {
            console.error(error)
        }
    }

    render() {
        const {tags} = this.state;
        return (
            <FlatList
                data={tags}
                renderItem={({item}) => {
                    return (
                        <ListItem
                            onPress={()=>{this.updateTags(item)}}
                            key={item.id}
                            title={item.id}
                            leftAvatar={{
                                title: item.id,
                                source: {uri: item.icon_url},
                                rounded: true
                            }}
                        />
                    )
                }}
                keyExtractor={item => item.id}
//                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
}

export default TagSubscriber;
