import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles-create-new-theme/styles-create-new-theme';

export default function CreateNewTheme({ navigation, route }) {

    return (

        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.principalTitle}>Screen to create a new Theme!</Text>

            {/*Formulário para criar novo tema*/}

            <TextInput
                style={styles.input}
                placeholder="Enter the new theme name"
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={() => {/*Lógica para salvar o novo tema*/}}>
                <Text style={styles.buttonText}>Save Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}