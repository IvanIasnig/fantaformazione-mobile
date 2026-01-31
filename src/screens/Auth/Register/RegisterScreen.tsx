import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { LOGIN } from "@src/navigation/routes";
import { useAuth } from "@src/context/AuthContext";
import { styles } from "./RegisterScreen.styles";
import FFTextInput from "@src/components/FFTextInput/FFTextInput";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      setError("");
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await signUp(email, password, { name });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FFTextInput label="Name" value={name} onChangeText={setName} />

      <FFTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <FFTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FFTextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link href={LOGIN} asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default RegisterScreen;
