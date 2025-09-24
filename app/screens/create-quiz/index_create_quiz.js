import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles-create-quiz/styles_create_quiz';

export default function CreateQuiz({ navigation, route }) {

    return (

        <View style={styles.container}>
            <Text style={styles.principalTitle}>Screen to create a quiz Works!</Text>
            <Text></Text><Text></Text>

            <StatusBar style="auto" />
        </View>
    );
}