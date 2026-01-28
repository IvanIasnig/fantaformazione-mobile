import { STACK_OPTIONS } from "@src/navigation/config";
import { HOME, LOGIN } from "@src/navigation/routes";
import {
  Stack,
  usePathname,
  useSegments,
  useRouter,
  useRootNavigationState,
} from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import initializeTranslation, { i18nInstance } from "@src/translations/i18n";
import { I18nextProvider } from "react-i18next";
import { AuthProvider, useAuth } from "@src/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const [loaded, error] = useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    initializeTranslation().then(() => setIsI18nInitialized(true));
  }, []);

  useEffect(() => {
    if ((loaded || error) && isI18nInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isI18nInitialized]);

  if ((!loaded && !error) || !isI18nInitialized) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18nInstance}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </I18nextProvider>
  );
}

const MainNavigator = () => {
  const pathname = usePathname();
  const segments = useSegments();
  const previousPathnameRef = useRef<string>("");
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (isLoading || !rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Redirect to the login page if the user is not authenticated
      router.replace(LOGIN);
    } else if (user && inAuthGroup) {
      // Redirect to the home page if the user is authenticated
      // and tries to access authentication screens
      router.replace(HOME);
    }
  }, [user, isLoading, segments, rootNavigationState]);

  useEffect(() => {
    const currentPathname = pathname;
    const previousPathname = previousPathnameRef.current;

    if (previousPathname !== currentPathname) {
      const routeName = segments[segments.length - 1] || "index";
    }

    previousPathnameRef.current = currentPathname;
  }, [pathname, segments]);

  if (isLoading) {
    // Return null or a loading spinner while authentication is being checked
    return null;
  }

  return (
    <Stack screenOptions={STACK_OPTIONS}>
      <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};
