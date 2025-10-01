import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import styles from './styles-home/styles_home';

export default function Home({ navigation, route }) {

    return (

        <View style={styles.container}>
            <Text style={styles.logo}>🧠</Text>
            <Text style={styles.principalTitle}>Welcome to the ultimate quiz game!</Text>
        
            <View style={styles.menuContainer}>
                <Text style={styles.label}>Select an option to continue:</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateQuiz')}>
                    <Text style={styles.buttonText}>Manage Quizzes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlayQuiz')}>
                    <Text style={styles.buttonText}>Play Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => BackHandler.exitApp()}>
                    <Text style={styles.buttonText}>Quit</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}