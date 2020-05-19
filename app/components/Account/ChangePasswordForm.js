import React, {useState} from "react";
import {StyleSheet,View,Text} from "react-native";
import {Input,Button} from "react-native-elements";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/Api"

export default function ChangePasswordForm (props){
    const {setIsVisibleModal, toastRef} = props;
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error,setError] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [hideNewPassword,setHideNewPassword] = useState(true);
    const [hideNewPasswordRepeat,setHideNewPasswordRepeat] = useState(true);

    const upadatePassword = () => {
        setError({});

        if(!password || !newPassword || !newPasswordRepeat){
            let objError ={}
            !password && (objError.password = "no puede estar vacio");
            !newPassword && (objError.newPassword = "no puede estar vacio");
            !newPasswordRepeat && (objError.newPasswordRepeat ="no puede estar vacio");
            setError(objError);
        }
        else{
            if (newPassword !== newPasswordRepeat){
                setError({
                    newPassword: "La contraseña no coincide ",
                    newPasswordRepeat: "La contraseña no coincide"
                });
            }
            else {
            setIsLoading(true);
            reauthenticate(password).then(() => {
                firebase.auth().currentUser.updatePassword(newPassword).then(()=> {
                    setIsLoading(false);
                    toastRef.current.show("contraseña actualizada correctamente");
                    setIsVisibleModal(false);
                })
                .catch(() => {
                    setError({general: "Error al actualizar la contraseña"})
                    setIsLoading(false);
                });
            })
            .catch(() => {
                setError({password: "La contraseña no es correcta"})
                setIsLoading(false);
            });
        }
    }
        
};

    return (
        <View style ={styles.view}>
            <Input
            placeholder = "Contraseña actual"
            containerStyle = {styles.input}
            secureTextEntry = {hidePassword}
            onChange = {e => setPassword(e.nativeEvent.text)}
            rightIcon ={{
                type: "material-community",
                name: hidePassword ? "eye-outline" : "eye-off-outline",
                color: "#c2c2c2",
                onPress: () => setHidePassword(!hidePassword)
            }}
            errorMessage={error.password}
            />
            <Input
            placeholder = "Nueva Contraseña"
            containerStyle = {styles.input}
            secureTextEntry = {hideNewPassword}
            onChange = {e => setNewPassword(e.nativeEvent.text)}
            rightIcon ={{
                type: "material-community",
                name: hideNewPassword ? "eye-outline" : "eye-off-outline",
                color: "#c2c2c2",
                onPress: () => setHideNewPassword(!hideNewPassword)
            }}
            errorMessage={error.newPassword}
            />
             <Input
            placeholder = "Repita la nueva Contraseña"
            containerStyle = {styles.input}
            secureTextEntry = {hideNewPasswordRepeat}
            onChange = {e => setNewPasswordRepeat(e.nativeEvent.text)}
            rightIcon ={{
                type: "material-community",
                name: hideNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
                color: "#c2c2c2",
                onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
            }}
            errorMessage={error.newPasswordRepeat}
            />
            <Button
            title = "Actualizar"
            containerStyle = {styles.btnContainer}
            buttonStyle={styles.btn}
            onPress= {upadatePassword}
            loading = {isLoading}
            />
            <Text>{error.general}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
        view: {
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10

        },
        input:{
            marginBottom:10
        },
        btnContainer: {
            marginTop:20,
            width: "95%"
        },
        btn: {
            backgroundColor: "#be1e2d"
        }

});