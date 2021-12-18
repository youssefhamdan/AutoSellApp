import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../client";

export default function AuthScreen({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = data => { console.log(data), signIn(data) };

    async function signIn(data) {
        const { user, session, error } = await supabase.auth.signIn(data);
        //GESTION ERROR
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email Adress</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder='email'
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text style={styles.textError}>This is required.</Text>}

            <Text style={styles.text}>Password</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        secureTextEntry={true}
                        placeholder='password'
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
            />
            {errors.password && <Text style={styles.textError}>This is required.</Text>}

            <View style={styles.check}>
                <Button title="LOGIN" onPress={handleSubmit(onSubmit)}></Button>
                <View style={styles.button}></View>
                <Button title="CREATE ACCOUNT" onPress={() => navigation.navigate("CreateAccount")}></Button>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    text: {
        fontSize: 18,
        color: 'black',
        margin: 12,
        marginBottom: 0,
    },
    textError: {
        color: 'red',
        margin: 12,
        marginTop: 0
    },
    input: {
        margin: 12,
        backgroundColor: '#C9CCD5',
    },
    button: {
        margin: 5
    },
    check: {
        padding: 10
    }
});