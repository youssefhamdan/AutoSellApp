import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from "../client";
import { useForm, Controller } from "react-hook-form";
import {useTranslation} from "react-i18next";

export default function CreateAccount({ navigation }) {
    const { t} = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = data => { signup(data) };

    async function signup(data) {
        const { user, session, error } = await supabase.auth.signUp(data);
    }
    return (

        <View style={styles.container}>
                <Text style={styles.text}>Email</Text>
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
                {errors.email && <Text style={styles.textError}>{t('errorsign')}</Text>}

                <Text style={styles.text}>{t('motdepasse')}</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            secureTextEntry={true}
                            placeholder={t('motdepassem')}
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={styles.textError}>{t('errorsign')}</Text>}

                <View style={styles.check}>
                    <Button title={t('inscrire')} onPress={handleSubmit(onSubmit)}></Button>
                </View>
                <View style={styles.button}></View>
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