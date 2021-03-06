import React from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import QRCode from "react-native-qrcode";
import Button from "../../Shared/Button";
import ProcessingCard from "../../Shared/ProcessingCard";

import Shell from "../../Shared/Shell";

import styles from "../../../styles";

function RetrievalNav(props) {
  return (
    <View style={styles.retrievalNavContainer}>
      <View style={styles.retrievalNav}>
        <TouchableOpacity onPress={props.retake}>
          <Button
            borderColor="#FFF"
            borderWidth="2.5"
            backgroundColor="transparent"
            width="140"
            height="45"
            text="Take another"
            textSize="15"
            textWeight="700"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default class GlimpsRetrieval extends React.Component {
  state = { eventSlug: "" };
  componentDidMount = async () => {
    let eventSlug = await AsyncStorage.getItem("EVENT_SLUG");
    this.setState({ eventSlug });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { eventSlug } = this.state;
    const { glimpsUri, glimpsId } = this.props.navigation.state.params;

    return (
      <Shell>
        <RetrievalNav retake={() => navigate("EventHome")} />
        <ProcessingCard>
          <Text style={styles.scanItText}>Scan it</Text>
          <QRCode
            value={glimpsUri}
            size={200}
            bgColor={"rgb(74, 66, 238)"}
            fgColor="white"
          />
          <Text style={styles.orText}>or</Text>
          <TouchableOpacity
            onPress={() => navigate("PhonePad", { glimpsUri, glimpsId })}
          >
            <Button
              backgroundColor="rgb(74, 66, 238)"
              width="200"
              height="45"
              text="Text me"
              textSize="23"
              textWeight="700"
            />
          </TouchableOpacity>
          <View style={styles.processingInfoContainer}>
            <Text style={styles.findIt}>Also find it at</Text>
            <Text style={styles.link}>
              glimps.app/
              {eventSlug}
            </Text>
          </View>
        </ProcessingCard>
      </Shell>
    );
  }
}
