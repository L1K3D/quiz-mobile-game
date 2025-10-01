import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  principalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#9be7c4",
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  card: {
    width: Math.min(width * 0.92, 760),
    backgroundColor: '#0f1620',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#2dce89',
    shadowColor: '#2dce89',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#b5c0d0",
    textAlign: 'left',
  },
  scoreLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  scorePercent: {
    color: '#2dce89',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2dce89",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: '#5e60ce',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  answerText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  correctText: {
    color: '#2dce89',
  },
  incorrectText: {
    color: '#f5365c',
  },
});

export default styles;