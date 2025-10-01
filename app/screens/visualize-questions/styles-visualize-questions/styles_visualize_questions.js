import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 30,
  },
  principalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#9be7c4",
    marginBottom: 18,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  card: {
    width: Math.min(width * 0.92, 760),
    backgroundColor: '#0f1620',
    borderRadius: 18,
    padding: 24,
    marginBottom: 20,
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#2dce89',
    shadowColor: '#2dce89',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 16,
    color: "#b5c0d0",
    textAlign: 'center',
  },
  cardButtonContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
    gap: 12,
  },
  cardButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2dce89",
  },
  button: {
    width: "92%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2dce89",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#5e60ce",
  },
  buttonBack: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5e60ce',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default styles;