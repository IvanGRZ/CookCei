import React,{useState} from "react";
import {StyleSheet,View,Text} from "react-native";
import {ListItem} from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";


export default function AccountOptions(props){
    const {userInfo,setReloadData,toastRef} = props;
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [renderComponet,setRenderComponet] = useState(null);

    const menuOptions = [{
        title: "Cambiar nombre",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponet("displayName")
    },
    {
        title: "Cambiar Email",
        iconType: "material-community",
        iconNameLeft: "at",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponet("email")
    },
    {
        title: "Cambiar Contraseña",
        iconType: "material-community",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponet("password")
    }
];

    const selectedComponet = key => {
        switch (key){
            case "displayName":
                setRenderComponet(<ChangeDisplayNameForm 
                displayName={userInfo.displayName}
                setIsVisibleModal={setIsVisibleModal} 
                setReloadData={setReloadData}
                toastRef={toastRef}
                />);

                setIsVisibleModal(true);
                break;
            case "email": 
                setRenderComponet(<ChangeEmailForm
                email={userInfo.email}
                setIsVisibleModal={setIsVisibleModal} 
                setReloadData={setReloadData}
                toastRef={toastRef}
                />);
                setIsVisibleModal(true);
                break;
            case "password":
                setRenderComponet(<ChangePasswordForm setIsVisibleModal={setIsVisibleModal} toastRef={toastRef}/>);
                setIsVisibleModal(true);
                break;
            default:
                break;
        }
    }
    return (
        <View>
            {menuOptions.map((menu,index) => (
                <ListItem 
                key={index}
                title ={menu.title}
                leftIcon={{
                    type: menu.iconType,
                    name: menu.iconNameLeft,
                    color: menu.iconColorLeft
                }}
                rightIcon= {{
                    type: menu.iconType,
                    name: menu.iconNameRight,
                    color: menu.iconColorRight
                }}
                onPress={menu.onPress}
                containerStyle={styles.menuItem}
                />
            ))}
            {renderComponet && (
              <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
              {renderComponet}
          </Modal>
          )}
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
})
