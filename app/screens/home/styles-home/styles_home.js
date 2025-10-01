import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  principalTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#9be7c4",
    marginBottom: 50,
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowColor: 'rgba(45, 206, 137, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  menuContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 20,
    color: "#b5c0d0",
    textAlign: 'center',
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2dce89",
    marginBottom: 15,
    shadowColor: "#2dce89",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonSecondary: {
    backgroundColor: "#f5365c",
    shadowColor: "#f5365c",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: 'center'
  },
});

export default styles;