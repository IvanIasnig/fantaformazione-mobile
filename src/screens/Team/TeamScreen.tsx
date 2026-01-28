import { View, Text } from "react-native";
import { styles } from "./TeamScreen.styles";
import { withTranslation, WithTranslation } from "react-i18next";
import { TAB_BAR_NS } from "@src/translations/i18n.constants";

const TeamScreen = ({ t }: WithTranslation) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("index")}</Text>
    </View>
  );
};
export default withTranslation(TAB_BAR_NS)(TeamScreen);
