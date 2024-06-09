import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

function ProductPdf() {
  const arr = [
    {
      key1: "Client Id",
      key2: "2422LV",
    },
    {
      key1: "Name of Applicant",
      key2: "sgsgsgs",
    },
  ];

  const arr2 = [
    {
      key1: "Details",
      key2: "1",
      key3: "2",
      key4: "3",
    },
    {
      key1: "Village Name",
      key2: "HAMIDI",
      key3: "",
      key4: "",
    },
  ];

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={{ paddingRight: 24, paddingLeft: 24 }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                textDecoration: "underline",
                textAlign: "center",
                fontWeight: "700",
                paddingTop: 24,
                paddingBottom: 32,
              }}
            >
              LAND VISIT REPORT
            </Text>
            {arr?.map((item, idx) => (
              <View key={idx} style={{ flexDirection: "row" }}>
                <View style={styles.section}>
                  <Text style={styles.text}>{item?.key1}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{item?.key2}</Text>
                </View>
              </View>
            ))}
          </View>
          <View>
            <Text
              style={{
                fontSize: 13,
                textDecoration: "underline",
                textAlign: "left",
                fontWeight: "700",
                paddingTop: 48,
                paddingBottom: 4,
              }}
            >
              Land Visit Remarks:
            </Text>
            {arr2?.map((item, idx) => (
              <View key={idx} style={{ flexDirection: "row" }}>
                <View style={styles.section}>
                  <Text style={styles.text}>{item?.key1}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{item?.key2}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{item?.key3}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{item?.key4}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={{borderWidth: 1, borderColor: '#aaaaaa', padding: 8, marginTop: 48}}>
            <Text
              style={{
                fontSize: 13,
                textDecoration: "underline",
                textAlign: "left",
                fontWeight: "700",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              Visit Remarks
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                paddingTop: 24,
                paddingBottom: 32,
              }}
            >
              Details: - long- 30.47901, 75.61139, Person Met: jaswant singh, Relation: neighbor ,
              Distance: barnala 15 kms , Land: As claimed by customer neighbor jaswant singh, he
              along withhis family owns 27 acres agri land and as per neighbors rajinder kumar and
              balkaran singh, client along with his family owned 27 Acres agri land. Land Location:
              same village, Crops: cotton; other: clientgurpreet singh s name agri land 05 Acres,
              jagdeep singh 05, gurmeet kaur 4 sadhu singh 5 acres, gurmel kaur 2 acres References
              found to be OK. Neighbors:
            </Text>
            <Text
              style={{
                fontSize: 13,
                textDecoration: "underline",
                textAlign: "left",
                fontWeight: "700",
                paddingTop: 32,
                paddingBottom: 24,
              }}
            >
              Status of CPV Positive
            </Text>
          </View>
          <View style={{marginTop: 48}}>
            <Text
              style={{
                fontSize: 12,
                textDecoration: "underline",
                textAlign: "left",
                fontWeight: "700",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              Land Visit Photographs:
            </Text>
            <View style={{paddingTop: 16}}>
                <Image style={{width: '100%', height: 350}} source={{uri: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202206/rice-fields-g83d1e5e51_1280-sixteen_nine.jpg?size=1200:675'}} />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  viewer: {
    width: "100%", //the pdf viewer will take up all of the width and height
    height: "70vh",
  },
  section: {
    padding: 1,
    paddingBottom: 16,
    width: 10,
    paddingLeft: 3,
    flexGrow: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#aaaaaa",
  },
  text: {
    fontSize: 14
  }
});

export default ProductPdf;
