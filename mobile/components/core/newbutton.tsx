import { Pressable } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text } from "../Themed";
type Props={
    onPress?: (event: any) => void,
    title?: string,

}

const NewButton: React.FC<Props> = ({ onPress, title }) => {
    
    return (
        <Pressable  onPress={onPress}>
          <FontAwesome name="plus-circle" size={25} color="white" />
          {title && <Text>{title}</Text>}
        </Pressable>
      );

}

export default NewButton;
