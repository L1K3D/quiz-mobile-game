import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles-home/styles_home';

export default function Home({ navigation, route }) {

    return (

        <View style={styles.container}>
            <Text style={styles.principalTitle}>Welcome to the ultimate quiz game!</Text>
        
            <Text style={styles.label}>Select an option to continue:</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateQuiz')}>
                <Text style={styles.buttonText}>Verify theames</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tela2')}>
                <Text style={styles.buttonText}>Tela 2</Text>
            <Text></Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlayQuiz')}>
                <Text style={styles.buttonText}>Play Quiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tela3')}>
                <Text style={styles.buttonText}>Tela 3</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}