import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { LOGIN } from "@src/navigation/routes";
import { useAuth } from "@src/context/AuthContext";
import { styles } from "./RegisterScreen.styles";
import FFTextInput from "@src/components/FFTextInput/FFTextInput";
import { WithTranslation, withTranslation } from "react-i18next";
import { AUTH_NS } from "@src/translations/i18n.constants";

const RegisterScreen = ({ t }: WithTranslation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      setError("");
      if (password !== confirmPassword) {
        setError(t("passwordsDoNotMatch"));
        return;
      }
      await signUp(email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("register")}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FFTextInput
        label={t("email")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FFTextInput
        label={t("password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FFTextInput
        label={t("confirmPassword")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{t("register")}</Text>
      </TouchableOpacity>

      <Link href={LOGIN} asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>{t("hasAccount")}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default withTranslation(AUTH_NS)(RegisterScreen);
