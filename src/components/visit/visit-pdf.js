import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

const ProductPdf = ({ values, task, uploadedFiles }) => {
  const arr = [];

  const arr2 = [];

  console.log("VALUES =====>", values, task);

  arr.push(
    {
      key1: "Client Id",
      key2: task?.CLIENTS_NO,
    },
    {
      key1: "Name of Applicant",
      key2: task?.CLIENTS_NAME,
    },
    {
      key1: "Address",
      key2: values?.LANDMARK,
    },
    {
      key1: "Name of Executive",
      key2: values?.executive,
    },
    {
      key1: "Date of Visit",
      key2: values?.visitDate,
    }
  );

  arr2.push(
    {
      key1: "Details",
      key2: "1",
      key3: "2",
      key4: "3",
    },
    {
      key1: "Village Name",
      key2: values?.VILLAGE_DESC,
      key3: "",
      key4: "",
    },
    {
      key1: "Name of Owner",
      key2: task?.CLIENTS_NAME,
      key3: "",
      key4: "",
    },
    {
      key1: "Name and relation of Person accompanied on visit",
      key2: `Person Met: \n ${values?.personName}`,
      key3: "",
      key4: "",
    },
    {
      key1: "Tehsil",
      key2: values?.tehsil,
      key3: "",
      key4: "",
    },
    {
      key1: "District",
      key2: values?.district,
      key3: "",
      key4: "",
    },
    {
      key1: "Total Area",
      key2: values?.totalArea,
      key3: "",
      key4: "",
    },
    {
      key1: "Longitude/Latitude",
      key2: `${values?.lng},\n ${values?.lat}`,
      key3: "",
      key4: "",
    },
    {
      key1: "Crops cultivated/Standing crops",
      key2: values?.cropsGrown,
      key3: "",
      key4: "",
    },
    {
      key1: "Likely date of Harvest or Harvest date",
      key2: values?.harvestDate,
      key3: "",
      key4: "",
    },
    {
      key1: "Irrigation details",
      key2: values?.irrigationDetails,
      key3: "",
      key4: "",
    }
  );

    console.log("UPOADE", uploadedFiles)

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
          <View style={{ borderWidth: 1, borderColor: "#aaaaaa", padding: 8, marginTop: 48 }}>
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
              {`Details: - long- ${values?.lng}, ${values?.lat}, Person Met: ${values?.personName}, Relation: ${values?.relationTo} ,
              Distance: ${values?.distanceFromBranch} , Land: As claimed by ${values?.personName}, he
              along withhis family owns ${values?.landOwned} acres agri land and as per neighbors ${values?.neighboursName}, client along with his family owned ${values?.landOwned} Acres agri land. Land Location:
              same village, Crops: ${values?.cropsGrown}; other: ${values?.otherInformation}.`}
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
              {`Status of CPV ${values?.cpv}`}
            </Text>
          </View>
          <View style={{ marginTop: 48 }}>
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
            {uploadedFiles?.length > 0 &&
              uploadedFiles?.map((item, idx) => (
                <View key={idx} style={{ paddingTop: 16 }}>
                  <Image
                    style={{ width: '100%', height: 350 }}
                    source={{ uri: item }}
                  />
                </View>
              ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

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
    fontSize: 14,
  },
});

export default ProductPdf;
