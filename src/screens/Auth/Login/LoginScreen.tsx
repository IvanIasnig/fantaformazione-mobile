import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { REGISTER } from "@src/navigation/routes";
import { useAuth } from "@src/context/AuthContext";
import { styles } from "./LoginScreen.styles";
import FFTextInput from "@src/components/FFTextInput/FFTextInput";
import { WithTranslation, withTranslation } from "react-i18next";
import { AUTH_NS } from "@src/translations/i18n.constants";

const LoginScreen = ({ t }: WithTranslation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      setError("");
      await signIn(email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("login")}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FFTextInput
        label={t("email")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <FFTextInput
        label={t("password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>

      <Link href={REGISTER} asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>{t("noAccount")}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default withTranslation(AUTH_NS)(LoginScreen);
