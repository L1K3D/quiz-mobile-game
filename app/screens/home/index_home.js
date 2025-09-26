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
                <Text style={styles.buttonText}>Verify Themes and Questions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlayQuiz')}>
                <Text style={styles.buttonText}>Play Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quit')}>
                <Text style={styles.buttonText}>Quit to phone screen</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}