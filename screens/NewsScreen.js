import React from "react";
import { ScrollView, StyleSheet } from "react-native";
// import { NewsLinksView } from '@expo/samples';
import NewsLinks from "./NewsLinks";

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <NewsLinks />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "News"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
