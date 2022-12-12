import {assertBoolean} from "@babel/core/lib/config/validation/option-assertions";
import {Text, View} from "react-native";

export default function Message(props) {
    props.fromMe = assertBoolean;
    if (!props.fromMe) {
        return (
            <View style={{marginRight: '25%'}}>
                <Text>{props.username}</Text>
                <Text>{props.content}</Text>
            </View>
        )
    } else {
        return (
            <View style={{marginLeft: '25%'}}>
                <Text>{props.username}</Text>
                <Text>{props.content}</Text>
            </View>
        )
    }
}