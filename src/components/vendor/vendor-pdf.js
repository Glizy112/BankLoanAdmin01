import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";

const VendorPDF = ({ values }) => {
  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: `https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf`,
      },
      {
        src: `https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-500.ttf`,
        fontWeight: "500",
      },
      {
        src: `https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf`,
        fontWeight: "600",
      },
      {
        src: `https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf`,
        fontWeight: "700",
      },
    ],
  });
  const arr = [];
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];
  const arr4 = [];
  const arr5 = [];
  const arr6 = [];

  console.log("VALUES =====>", values);

  arr.push(
    {
      key1: "Bank / NBFC",
      key2: values.bank,
    },
    {
      key1: "Name & Contact Details",
      key2: `${values.name} CONTACT NUMBER ${values.contact_details}`,
    },
    {
      key1: "Date Of Visit",
      key2: values.visitDate,
      key3: "Business Set-up",
      key4: values.visitDate_business_setup,
    },
    {
      key1: "Transaction Particulars",
      key2: values.transaction_particulars,
      key3: "Business Set-up Visited",
      key4: values.transaction_particulars_business_setup,
    },
    {
      key1: "Application ID",
      key2: `${values.application_id}`,
    },
    {
      key1: "Loan Amount Requested",
      key2: values.loan_amt_req,
    },
    {
      key1: "Business Entity",
      key2: values.business_entity,
    },
    {
      key1: "PD Done By",
      key2: values.pd_done_by,
    },
    {
      key1: "Final Recommendation",
      key2: values.final_recommedation,
    },
    {
      key1: "Margin Assessed",
      key2: values.margin_assessed,
    },
    {
      key1: "End usage of funds",
      key2: values.funds_usage,
    }
  );

  arr1.push(
    {
      key1: "Bank / FI",
      key2: "Loan Type",
      key3: "Loan Amount",
      key4: "EMI",
    },
    {
      key1: values.bank_fi,
      key2: values.loan_type,
      key3: values.loan_amt,
      key4: values.emi,
    }
  );

  arr2.push(
    {
      key1: "Prime Clients",
      key2: values.prime_client,
    },
    {
      key1: "Prime Creditors",
      key2: values.prime_creditor,
    }
  );

  arr3.push(
    {
      key1: "S.No.",
      key2: "Particulars",
      key3: "Verified",
    },
    {
      key1: "1",
      key2: "PAN",
      key3: values.pan,
    },
    {
      key1: "2",
      key2: "GST",
      key3: values.gst,
    },
    {
      key1: "3",
      key2: "Business Proof",
      key3: values.business_registration,
    },
    {
      key1: "4",
      key2: "Electric City Bill (for latest 2-3 months)",
      key3: values.electricity_bill,
    },
    {
      key1: "5",
      key2: "Employee Register",
      key3: values.emp_register,
    },
    {
      key1: "6",
      key2: "Others (Kaccha Records)",
      key3: values.others_records,
    },
    {
      key1: "7",
      key2: "Aadhar Card",
      key3: values.aadhar_card,
    }
  );

  arr4.push(
    {
      key1: "Type",
      key2: values.property_type,
    },
    {
      key1: "Usage",
      key2: values.property_usage,
    },
    {
      key1: "Tentative LTV",
      key2: values.ltv,
    },
    {
      key1: "Ownership",
      key2: values.property_ownership,
    },
    {
      key1: "Bayana / Token Money",
      key2: values.property_bayana,
    }
  );

  arr5.push(
    {
      key1: "Strengths",
      key2: "Weaknesses",
    },
    {
      key1: values.strength,
      key2: values.weaknesses,
    }
  );

  arr6.push(
    {
      key1: "Particulars",
      key2: "Actual for year",
      key3: "Particulars",
      key4: "Actual for year",
    },
    {
      key1: "",
      key2: "",
      key3: "",
      key4: "",
    },
    {
      key1: "Opening Stock",
      key2: values?.opening_stock,
      key3: "Sales / Receipt & Commission",
      key4: values?.sales_receipt,
    },
    {
      key1: "Purchase & Direct Expenses",
      key2: values?.purchases,
      key3: "Closing Stock",
      key4: values?.closing_stock,
    },
    {
      key1: "",
      key2: "",
      key3: "",
      key4: "",
    },
    {
      key1: "Gross Profit",
      key2: values.sales_receipt + values.closing_stock - (values.opening_stock + values.purchases),
      key3: "",
      key4: "",
    },
    {
      key1: "Total",
      key2:
        values.opening_stock +
        values.purchases +
        (values.sales_receipt + values.closing_stock) -
        (values.opening_stock + values.purchases),
      key3: "Total",
      key4: values.sales_receipt + values.closing_stock,
    },
    {
      key1: "Salaries / Wages Paid",
      key2: values?.salaries,
      key3: "Gross Profit",
      key4: values.sales_receipt + values.closing_stock - (values.opening_stock + values.purchases),
    },
    {
      key1: "Misc Exps",
      key2: values?.misc_exps,
      key3: "",
      key4: "",
    },
    {
      key1: "Telephone & Mobile",
      key2: values?.telephone_mobile,
      key3: "",
      key4: "",
    },
    {
      key1: "Electricity Expenses",
      key2: values?.electricity,
      key3: "",
      key4: "",
    },
    {
      key1: "Rent Expenses",
      key2: values?.rent_expenses,
      key3: "",
      key4: "",
    },
    {
      key1: "Net Profit",
      key2:
        values.sales_receipt +
        values.closing_stock -
        (values.opening_stock + values.purchases) -
        (values.salaries +
          values.misc_exps +
          values.telephone_mobile +
          values.electricity +
          values.rent_expenses),
      key3: "",
      key4: "",
    },
    {
      key1: "Total",
      key2:
        values.salaries +
        values.misc_exps +
        values.telephone_mobile +
        values.electricity +
        values.rent_expenses +
        (values.sales_receipt +
          values.closing_stock -
          (values.opening_stock + values.purchases) -
          (values.salaries +
            values.misc_exps +
            values.telephone_mobile +
            values.electricity +
            values.rent_expenses)),
      key3: "Total",
      key4: values.sales_receipt + values.closing_stock - (values.opening_stock + values.purchases),
    }
  );

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
          <View className="Header">
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 32,
                paddingBottom: 32,
              }}
            >
              <View
                style={{
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Open Sans",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  HITACHI SERVICES PRIVATE LIMITED
                </Text>
              </View>
            </View>
            {arr?.map((item, idx) => (
              <View key={idx} style={[idx === 0 && styles.bt, styles.br, { flexDirection: "row" }]}>
                <View style={styles.section}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight:
                          item?.key1 === "Bank / NBFC" ||
                          item?.key1 === "Final Recommendation" ||
                          item?.key1 === "Margin Assessed"
                            ? "600"
                            : "400",
                        textDecoration: item?.key1 === "Bank / NBFC" && "underline",
                      },
                    ]}
                  >
                    {item?.key1}
                  </Text>
                </View>
                <View style={[styles.section]}>
                  <Text style={styles.text}>{item?.key2}</Text>
                </View>
                <View style={[item?.key3 ? styles.section : styles.w, !item?.key3 && styles.bb]}>
                  <Text style={styles.text}>{item?.key3}</Text>
                </View>
                <View style={[item?.key4 ? styles.section : styles.w, !item?.key4 && styles.bb]}>
                  <Text style={styles.text}>{item?.key4}</Text>
                </View>
                {/* <View style={[item?.key5 ? styles.section : styles.w, !item?.key5 && styles.bb]}>
                  <Text style={styles.text}>{item?.key5}</Text>
                </View> */}
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.title}>
              Detailed Business Profile & Background of the applicants:
            </Text>
            <View style={styles.wrapper}>
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "Open Sans",
                    fontWeight: "400",
                    textAlign: "justify",
                  },
                ]}
              >
                {`We met ${values?.name} at residence address. Applicant ${
                  values?.name
                } is running ${values?.business_type} work from last ${
                  values?.business_time
                } years. Name of the business is ${
                  values?.business_entity
                } and sign board was not seen. Client is running ${
                  values?.business_type
                } in owned premises in the residential area. Area of ${values?.business_type} is ${
                  values?.business_area
                } and ${values?.employeeCount} ${
                  values?.employeeCount > 1 ? "employees are" : "employee is"
                } working with them. Total Salary paid is Rs.${(values?.salaries / 100000).toFixed(
                  1
                )} lakh pa. ${
                  values?.additionalInfo
                }. Approximate turnover from this business is Rs.${(
                  values?.sales_receipt / 100000
                ).toFixed(1)} lakh pa. Purchase & expenses count to be Rs.${(
                  values?.purchases / 100000
                ).toFixed(1)} lakh pa. and profit is Rs.${
                  ((values.sales_receipt +
                  values.closing_stock -
                  (values.opening_stock + values.purchases) -
                  (values.salaries +
                    values.misc_exps +
                    values.telephone_mobile +
                    values.electricity +
                    values.rent_expenses)) / 100000).toFixed(1)
                } lakh pa. GST number ${
                  values?.gst === "Y" ? "was" : "was not"
                } seen. Sales are made to ${values?.prime_client}. ${values?.name} is a ${
                  values?.client_occupation
                } & owns about ${
                  values?.extra_land_property && values?.extra_land_property
                } land. ${
                  values?.bank_fi &&
                  `There is a ${values?.loan_type} running with ${values?.bank_fi}.`
                }

${values?.name} and ${values?.applicantSpouse} W/o. ${values?.name} are residing at ${
                  values?.applicant_fullResidentialAddress
                }. Met with applicant ${
                  values?.meeting_person ? `${values?.meeting_person}` : "self"
                } at the time of our visit. Applicant is residing with his ${
                  values?.applicant_family_info
                } in their owned residential premises since ${
                  values?.applicant_residence_time
                } years and living in the city by birth. House area is ${
                  values?.residence_area
                } and residence is located in ${
                  values?.residence_locality === "Urban" ? "city" : "village"
                } locality.
                  
Applicant intends to avail this loan of Rs. ${(values?.ltv / 100000).toFixed(1)} lacs against ${
                  values?.property_against_loan
                } property.
                  
No adversity found at neighbour reference, being check done for the applicant. Neighbours check done from ${
                  values?.applicant_neighbourInfo
                } & reference provided by applicant is ${values?.applicant_referenceInfo}. \n\n ${
                  values?.business_profile
                }`}
              </Text>
            </View>
            {values?.stamp.length > 0 &&
              values?.stamp?.map((item, idx) => (
                <View key={idx} style={{ paddingTop: 8 }}>
                  <Image style={{ width: 120, height: 45 }} source={{ uri: item }} />
                </View>
              ))}
          </View>

          <View
            style={{
              //display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              //alignItems: "center",
              paddingTop: 32,
              paddingBottom: 32,
            }}
            break
          >
            <View
              style={{
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Open Sans",
                  fontWeight: "700",
                  textAlign: "left",
                }}
              >
                HITACHI SERVICES PRIVATE LIMITED
              </Text>
            </View>
            {/* </View> */}{" "}
            {/* Originally closed here before stamp. For stamp to be at bottom, tried this. */}
            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text style={styles.title}>Existing Bank / Loan Facilities:-</Text>
              <Text style={styles.text}>&nbsp; {values.exiting_bank} </Text>
            </View>
            {arr1?.map((item, idx) => (
              <View key={idx} style={[idx === 0 && styles.bt, styles.br, { flexDirection: "row" }]}>
                <View style={styles.section}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 && "600",
                        textDecoration: item?.key1 === "Bank / NBFC" && "underline",
                      },
                    ]}
                  >
                    {item?.key1}
                  </Text>
                </View>
                <View style={[styles.section]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 && "600",
                        textDecoration: item?.key1 === "Bank / NBFC" && "underline",
                      },
                    ]}
                  >
                    {item?.key2}
                  </Text>
                </View>
                <View style={[item?.key3 ? styles.section : styles.w, !item?.key3 && styles.bb]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 && "600",
                        textDecoration: item?.key1 === "Bank / NBFC" && "underline",
                      },
                    ]}
                  >
                    {item?.key3}
                  </Text>
                </View>
                <View style={[item?.key4 ? styles.section : styles.w, !item?.key4 && styles.bb]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 && "600",
                        textDecoration: item?.key1 === "Bank / NBFC" && "underline",
                      },
                    ]}
                  >
                    {item?.key4}
                  </Text>
                </View>
              </View>
            ))}
            <View style={{ flexDirection: "column", marginBottom: 8 }}>
              <Text style={[styles.title, { marginBottom: 8 }]}>Major Debtors & Creditors: -</Text>
              {arr2?.map((item, idx) => (
                <View
                  key={idx}
                  style={[{ flexDirection: "row" }, idx === 0 && styles.bt, styles.br]}
                >
                  <View style={[styles.section]}>
                    <Text style={styles.text}>{item?.key1}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.text}>{item?.key2}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View>
              <Text style={[styles.title, { marginBottom: 8 }]}>
                Asset base & Vehicle Details: -
              </Text>
              <View style={styles.wrapper}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: "Open Sans",
                      fontWeight: "400",
                    },
                  ]}
                >
                  {values.asset_base}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", marginBottom: 8 }}>
              <Text style={[styles.title, { marginBottom: 8 }]}>
                Documents Verified During PD: -
              </Text>
              {arr3?.map((item, idx) => (
                <View
                  key={idx}
                  style={[{ flexDirection: "row" }, idx === 0 && styles.bt, styles.br]}
                >
                  <View style={[styles.section]}>
                    <Text style={styles.text}>{item?.key1}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.text}>{item?.key2}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.text}>{item?.key3}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View
              //style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}
              style={{ paddingTop: 32 }}
            >
              {values?.stamp.length > 0 &&
                values?.stamp?.map((item, idx) => (
                  <View key={idx}>
                    <Image style={{ width: 120, height: 45 }} source={{ uri: item }} />
                  </View>
                ))}
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 32,
              paddingBottom: 32,
            }}
            break
          >
            <View
              style={{
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Open Sans",
                  fontWeight: "700",
                  textAlign: "left",
                }}
              >
                HITACHI SERVICES PRIVATE LIMITED
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column", marginBottom: 8 }}>
            <Text style={[styles.title, { marginBottom: 8 }]}>Property Description: -</Text>
            {arr4?.map((item, idx) => (
              <View key={idx} style={[{ flexDirection: "row" }, idx === 0 && styles.bt, styles.br]}>
                <View style={[styles.section]}>
                  <Text style={styles.text}>{item?.key1}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.text}>{item?.key2}</Text>
                </View>
              </View>
            ))}
          </View>

          <View>
            {arr5?.map((item, idx) => (
              <View key={idx} style={[{ flexDirection: "row" }, idx === 0 && styles.bt, styles.br]}>
                <View style={[styles.section]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 && "600",
                        textDecoration: item?.key1 === "Strengths" && "underline",
                      },
                    ]}
                  >
                    {item?.key1}
                  </Text>
                </View>
                <View style={styles.section}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 && "600",
                        textDecoration: item?.key1 === "Weaknesses" && "underline",
                      },
                    ]}
                  >
                    {item?.key2}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {values?.stamp.length > 0 &&
            values?.stamp?.map((item, idx) => (
              <View key={idx} style={{ paddingTop: 128 }}>
                <Image style={{ width: 120, height: 45 }} source={{ uri: item }} />
              </View>
            ))}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 32,
              paddingBottom: 32,
            }}
            break
          >
            <View
              style={{
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Open Sans",
                  fontWeight: "700",
                  textAlign: "left",
                }}
              >
                HITACHI SERVICES PRIVATE LIMITED
              </Text>
            </View>
          </View>

          <View>
            <View
              style={[
                styles.section,
                { width: "100%", backgroundColor: "#688eff" },
                styles.bt,
                styles.br,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    textAlign: "center",
                  },
                ]}
              >
                Income statement /TRADING, PROFIT AND LOSS ACCOUNT
              </Text>
            </View>
            <View
              style={[
                styles.section,
                { width: "100%", backgroundColor: "#ffb349" },
                styles.bt,
                styles.br,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    textAlign: "center",
                  },
                ]}
              >
                {values.name}
              </Text>
            </View>

            {arr6?.map((item, idx) => (
              <View key={idx} style={[idx === 0 && styles.bt, styles.br, { flexDirection: "row" }]}>
                <View
                  style={[
                    styles.section,
                    {
                      backgroundColor:
                        idx === 0
                          ? "#CCFFFF"
                          : idx === 5 || idx === 12
                          ? "#FFFF99"
                          : (idx === 6 || idx === 13) && "#00CCFF",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {item?.key1}
                  </Text>
                </View>
                <View
                  style={[
                    styles.section,
                    {
                      backgroundColor:
                        idx === 0
                          ? "#CCFFFF"
                          : idx === 1
                          ? "#01FF00"
                          : idx === 5 || idx === 12
                          ? "#FFFF99"
                          : (idx === 6 || idx === 13) && "#00CCFF",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 ? "600" : "400",
                      },
                    ]}
                  >
                    {item?.key2}
                  </Text>
                </View>
                <View
                  style={[
                    item?.key3 ? styles.section : styles.w,
                    !item.key3 && styles.bl,
                    styles.bb,
                    {
                      backgroundColor:
                        idx === 0 ? "#CCFFFF" : (idx === 6 || idx === 13) && "#00CCFF",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: "Open Sans",
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {item?.key3}
                  </Text>
                </View>
                <View
                  style={[
                    item?.key4 ? styles.section : styles.w,
                    !item.key4 && styles.bl,
                    styles.bb,
                    {
                      backgroundColor:
                        idx === 0
                          ? "#CCFFFF"
                          : idx === 1
                          ? "#01FF00"
                          : (idx === 6 || idx === 13) && "#00CCFF",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        paddingLeft: !item.key4 ? 12 : 0,
                        fontFamily: "Open Sans",
                        fontWeight: idx === 0 ? "600" : "400",
                      },
                    ]}
                  >
                    {item?.key4}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {values?.stamp.length > 0 &&
            values?.stamp?.map((item, idx) => (
              <View key={idx} style={{ paddingTop: 48 }}>
                <Image style={{ width: 120, height: 45 }} source={{ uri: item }} />
              </View>
            ))}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 32,
              paddingBottom: 32,
            }}
            break
          >
            <View
              style={{
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Open Sans",
                  fontWeight: "700",
                  textAlign: "left",
                }}
              >
                HITACHI SERVICES PRIVATE LIMITED
              </Text>
            </View>
          </View>

          <View>
            <Text style={[styles.title, { marginBottom: 8 }]}>Notes To Financials: -</Text>
            <View style={styles.wrapper}>
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "Open Sans",
                    fontWeight: "400",
                  },
                ]}
              >
                {`• As per our discussion held with the applicant and ${
                  values.workNature
                } business setup seen, we estimate there are avg. monthly sale of Rs. ${
                  values.monthlySales
                }. So, total sales come to Rs. ${
                  values.yearlySales
                } for the effective 320 days in a year. \n • Purchase Material used for work are estimated to ${(
                  values.purchases / 100000
                ).toFixed(1)} Lacs (Being ${(values.misc_exps / values.yearlySales / 100).toFixed(
                  2
                )} to sale) as discussed with the applicant and by taking care of profit margin of the business. \n • There ${
                  values.employeeCount > 1 ? "are" : "is"
                } ${
                  values.employeeCount
                } employees working in this concern and their average monthly salary is Rs. ${
                  values.avgMonthlySalary
                }/-. \n • There is shop rent is Rs. ${
                  values.shopRent
                }/- per month. Other misc Exp is Rs. ${
                  values.misc_exps
                }/- per annum. • Net Margin is ${
                  values.netMargin
                }%. \n • It is pertinent to note that the business is not seasonal and sale is equally spread throughout the year.`}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 0 }}>
            <View
              style={[
                styles.wrapper,
                { marginTop: 0, borderTopWidth: 0, backgroundColor: "#CC99FF" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    fontSize: 13,
                    textAlign: "center",
                  },
                ]}
              >
                Assumptions/ Explanations for variance PD IS {values?.financial_decision}
              </Text>
            </View>
          </View>

          <View style={{ padding: 16 }}>
            <Text
              style={[
                {
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  fontSize: 8,
                },
              ]}
            >
              Disclaimer:{" "}
              <Text
                style={{ fontSize: 8, marginLeft: 8, textDecoration: "none", fontWeight: "400" }}
              >{`The Confidential Report of Income Estimation has been prepared, as per specific request of the Piramal Capital & Housing
                  Finance Limited. The report has been drawn on the basis of information, explanation, and financial papers/documents provided to us and also subject to personal discussions undertaken with the`}</Text>
              <Text
                style={[
                  {
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    fontSize: 12,
                  },
                ]}
              >
                {" "}
                {values.name}{" "}
              </Text>{" "}
              <Text
                style={{ fontSize: 8, marginLeft: 8, textDecoration: "none", fontWeight: "400" }}
              >{`Estimated profit & loss account and Balance Sheet annexed to
                  the report merely provide data for the decision making of the Piramal Capital & Housing Finance Limited, without any corresponding liabilities on our part. We have conducted reasonable due diligence while estimating the financial state of affairs of the Applicant/s, however, we do not guarantee or certify the financial affairs of the applicant/s and that estimates are solely for the consumption of the Piramal Capital & Housing Finance Limited and not intended for any kind of solicitation, neither we provide any assurance or guarantee..`}</Text>{" "}
            </Text>
          </View>

          {values?.stamp.length > 0 &&
            values?.stamp?.map((item, idx) => (
              <View key={idx} style={{ paddingTop: 48 }}>
                <Image style={{ width: 120, height: 45 }} source={{ uri: item }} />
              </View>
            ))}

          {values?.images?.length !== 0 && (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingTop: 32,
                  paddingBottom: 32,
                }}
                break
              >
                <View
                  style={{
                    paddingRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: "Open Sans",
                      fontWeight: "700",
                      textAlign: "left",
                    }}
                  >
                    HITACHI SERVICES PRIVATE LIMITED
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                {values?.images.length > 0 && (
                  <View
                    style={{
                      marginHorizontal: "auto",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      width: 500,
                      //borderWidth: 1
                    }}
                  >
                    {values?.images?.map((item, idx) => (
                      // <View
                      //   key={idx}
                      // >
                      <View
                        key={idx}
                        style={{
                          //flex: 1,
                          minWidth: values?.images?.length === 1 ? 300 : 100,
                          maxWidth: values?.images?.length === 1 ? 500 : 300,
                          //height: 300,
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 8,
                          marginTop: 4,
                          //borderWidth: 1,
                          //borderColor: '#000'
                        }}
                      >
                        <Image
                          style={[
                            values?.images?.length === 1
                              ? { width: 300, height: 300 }
                              : { width: 240, height: 200 },
                          ]}
                          source={{ uri: item }}
                        />
                      </View>
                      // </View>
                    ))}
                  </View>
                )}
              </View>

              {values?.stamp.length > 0 &&
                values?.stamp?.map((item, idx) => (
                  <View key={idx} style={{ paddingTop: 32 }}>
                    <Image style={{ width: 120, height: 45 }} source={{ uri: item }} />
                  </View>
                ))}
            </>
          )}
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
  section1: {
    padding: 1,
    paddingVertical: 8,
    width: 10,
    paddingLeft: 12,
    flexGrow: 1,
  },
  section: {
    padding: 1,
    paddingVertical: 8,
    width: 10,
    paddingLeft: 12,
    flexGrow: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.1)",
  },
  bt: {
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  br: {
    borderRightWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  bb: {
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  bl: {
    borderLeftWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  text: {
    fontSize: 10,
  },
  w: { width: 140.6 },
  title: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: 10,
    paddingTop: 16,
    textDecoration: "underline",
    paddingLeft: 16,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 16,
    marginTop: 8,
  },
});

export default VendorPDF;
