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
import { applicationProfileArr } from "../../pages/pd-cum-verify";

const DdaPDF =({values})=> {
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

    return(
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                    <View style={{paddingVertical: 16, paddingHorizontal: 8}}>
                      <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 'bold', fontFamily: 'Open Sans'}}>
                        PUNJAB & SIND BANK - H.O. Credit Monitoring and Policy Dept. 21, Rajendra Place, New Delhi 
                      </Text>
                      <Text 
                        style={{
                          textAlign: 'center', 
                          fontSize: 10, 
                          fontWeight: 'bold', 
                          fontFamily: 'Open Sans', 
                          textDecoration: 'underline',
                          marginVertical: 8
                        }}
                      >
                        REG: FRAMEWORK FOR EMPANELMENT OF EXTERNAL DUE DILIGENCE AGENCIES (DDA) 
                      </Text>
                      <Text 
                        style={{
                          fontSize: 10, 
                          fontWeight: 'bold', 
                          fontFamily: 'Open Sans', 
                          textAlign: 'right', 
                          alignSelf: 'flex-end'
                        }}
                      > Annexure V-B </Text> 
                      <Text 
                        style={{
                          marginTop: 12,
                          fontSize: 10, 
                          fontWeight: 'bold', 
                          fontFamily: 'Open Sans', 
                          textAlign: 'justify', 
                          alignSelf: 'center'
                        }}
                      > 
                        DUE DILIGENCE REPORT ON PROSPECTIVE HOME BORROWER/ LOAN AGAINST PROPERTY/ MORTGAGE 
BACKED LOANS/ VEHICLE LOANS/ OTHER RETAIL LOANS 
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{borderWidth: 0, padding: 6}}>
                    <View style={{borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, padding: 6}}>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginLeft: 4}}> 
                        1.  Borrower 
                      </Text>
                    </View> 
                    {
                      [
                        {
                          label: 'Name of Applicant',
                          value: values?.name,
                        },
                        {
                          label: 'Permanent Current Address',
                          value: values?.applicant_fullResidentialAddress,
                        },
                        {
                          label: 'Telephone Number',
                          value: values?.telephone_mobile,
                        },
                        {
                          label: 'Type of Loan',
                          value: values?.loan_type,
                        },
                        {
                          label: 'Trade License',
                          value: values?.trade_license,
                        },
                        {
                          label: 'Date and Time of Visit',
                          value: values?.visitDate,
                          checkMark: 'bottomBorder'
                        }
                      ].map((item, idx)=> (
                        <View 
                          key={idx}
                          style={[
                            {flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1},
                            item?.checkMark && {borderBottomWidth: 1}
                          ]}
                        >
                          <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                              {item.label} 
                            </Text>
                          </View>
                          <View style={{width: '50%', padding: 6}}>
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                              {item.value}
                            </Text>
                          </View>
                        </View>
                      ))
                    }
                    <View style={{borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, padding: 6}}> 
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginVertical: 2}}>Whether the applicant is existing account holder? {values?.existing_bank}</Text>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginVertical: 2}}> If yes, dealing with bank since {values?.existing_bank_time} years {values?.business_bank_name} a/c no: {values?.business_bank_account}</Text>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginVertical: 2}}> In case, applicant is banking with other banks, </Text>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginVertical: 2}}> Whether confidential opinion called for:- {values?.confidential_opinion}</Text>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginVertical: 2}}> If so, whether opinion is satisfactory:- {values?.confidential_opinion_status}</Text>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginVertical: 2}}> Other observations, if any:- Found ok</Text>
                    </View>
                    <View style={{borderLeftWidth: 1, borderRightWidth: 1, padding: 6}}>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginLeft: 4}}> 
                        2.  Vehicle Dealer Verification{`(in case of vehicle loans)`} Name {values?.auto_dealer_name} {'\n'}
                        and Address of the vehicle dealer {`(Applicable for Vehicle Loans Only)`} Mansa Road, Bathinda.
                      </Text>
                    </View>
                    {
                      [
                        {
                          label: 'Year of Establishment',
                          value: values?.auto_dealer_established,
                        },
                        {
                          label: 'Whether Authorized Dealer (If yes, since when)',
                          value: values?.auto_dealer_authorized,
                          secondValue: values?.authorization_year,
                        },
                      ].map((item, idx)=> (
                        <View key={idx} style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1}}>
                          <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                              {item.label} 
                            </Text>
                          </View>
                          <View style={{width: '50%', padding: 6}}>
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                              {item.value} {item?.secondValue}
                            </Text>
                          </View>
                        </View>
                      ))
                    } 
                    <View style={{borderWidth: 1}}>
                    {
                      [
                        {
                          label: 'a). Local Dealer of same or similar product',
                          value: values?.local_dealer_check,
                          checkmark: 'label_heading'
                        },
                        {
                          label: 'b). The Manufacturer / Their Reg. Office',
                          value: values?.vehicle_manufacturer,
                        },
                        {
                          label: 'c). Visit Made (if)',
                          value: values?.visit_mode,
                        }
                      ].map((item, idx)=> (
                        <View key={idx} style={{flexDirection: 'row'}}>
                          <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                            {
                              item?.checkmark && (
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginBottom: 8}}> Reference made: </Text>
                              )
                            }
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                              {item.label} 
                            </Text>
                          </View>
                          <View style={{width: '50%', padding: 6}}>
                            {
                              item?.checkmark && (
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginBottom: 8}}>  </Text>
                              )
                            }
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                              {item.value}
                            </Text>
                          </View>
                        </View>
                      ))
                    }
                    </View> 
                    <View style={{position: 'relative', bottom: -32, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                        Page 1 
                      </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ padding: 32 }}>
                          <Image style={{ width: 120, height: 48 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingTop: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                    <View style={{borderWidth: 1, padding: 6, marginTop: 16}}>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginLeft: 4}}> 
                        3.  Residence Verification 
                      </Text>
                    </View>
                    <View>
                      <View style={{borderLeftWidth: 1, borderRightWidth: 1, padding: 6}}>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginLeft: 4}}> 
                          Following information is to be obtained if the applicant and his family members are contacted
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', borderRightWidth: 1}}>
                      {
                        [
                          {
                            label: 'No. of Residents in House',
                            value: values?.noOfChildren + values?.noOfAdults,
                          },
                          {
                            label: 'Years of Current Residence since year',
                            value: values?.currentResidenceTime,
                          },
                        ].map((item, idx)=> (
                          <View key={idx} style={{flexDirection: 'row', borderLeftWidth: 1, borderTopWidth: 1}}>
                            <View style={{width: '50%', padding: 6}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label} {item.value} 
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                      </View>
                      <View style={{flexDirection: 'row', borderRightWidth: 1}}>
                      {
                        [
                          {
                            label: 'No. of earning family members',
                            value: values?.noOfEarningMembers,
                          },
                          {
                            label: 'Residential Status',
                            value: values?.parentsResidenceType,
                          },
                        ].map((item, idx)=> (
                          <View key={idx} style={{flexDirection: 'row', borderLeftWidth: 1, borderTopWidth: 1}}>
                            <View style={{width: '50%', padding: 6}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label} {item.value} 
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                      </View>
                      <View style={{flexDirection: 'row', borderRightWidth: 1, borderBottomWidth: 1}}>
                      {
                        [
                          {
                            label: 'Vehicles: ',
                            value: 
                              `Tw-${values?.twVehicle ? values?.twVehicle : 'No'}, Fw-${values?.fwVehicle ? values?.fwVehicle : 'No'}`,
                          },
                          {
                            label: '',
                            value: '',
                          },
                        ].map((item, idx)=> (
                          <View key={idx} style={{flexDirection: 'row', borderLeftWidth: 1, borderTopWidth: 1}}>
                            <View style={{width: '50%', padding: 6}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label} {item.value} 
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                      </View>
                      <View style={{borderLeftWidth: 1, borderRightWidth: 1, padding: 6}}>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginLeft: 4}}> 
                          Following are based on verifier's observation and are not to be asked from applicant:
                        </Text>
                      </View>
                      <View>
                        {
                          [
                            {
                              label: 'Location',
                              value: values?.residence_locality,
                            },
                            {
                              label: 'Locality/Surroundings',
                              value: values?.residence_locality_scene,
                            },
                            {
                              label: 'Is the entrance motorable',
                              value: values?.motorable_entrance,
                            },
                            {
                              label: 'Is the address confirmed',
                              value: values?.address_confirmed,
                            },
                            {
                              label: 'Correct Pin Code',
                              value: values?.pincode,
                            },
                            {
                              label: 'Prominent Landmark',
                              value: values?.landmark,
                            },
                            {
                              label: 'Types of Accommodation',
                              value: values?.accommodation_type,
                            },
                            {
                              label: 'Standard of Living',
                              value: values?.living_standard,
                            },
                            {
                              label: 'Colour of House/Complex',
                              value: values?.house_colour,
                            },
                            {
                              label: 'Interior Conditions',
                              value: values?.interiors,
                            },
                          ].map((item, idx)=> (
                            <View key={idx} style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1}}>
                              <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                  {item.label} 
                                </Text>
                              </View>
                              <View style={{width: '50%', padding: 6}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ))
                        }
                      </View>
                      <View style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1}}>
                        <View style={{padding: 6, width: '50%', borderRightWidth: 1}}>
                          <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> Assets Seen </Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '50%'}}>
                            {
                              [0,1,2].map((item, idx)=> (
                                <View 
                                  key={idx} 
                                  style={[
                                    {padding: 6, width: '33.33%'},
                                    item!==2 && {borderRightWidth: 1}
                                  ]}
                                >
                                  <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                    {values?.assets_seen?.split(',')[item]}
                                  </Text>
                                </View>
                              ))
                            }
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', borderLeftWidth: 1}}>
                        {
                          [
                            {
                              label: 'No. of storeys',
                              checkmark: 'moreWidth',
                              value: values?.noOfStoreys,
                            },
                            {
                              label: 'Watchman',
                              value: values?.watchman,
                            },
                            {
                              label: 'Lift',
                              value: values?.lift,
                            },
                          ].map((item, idx)=> (
                            <View 
                              key={idx} 
                              style={[
                                item?.checkmark ? {width: '49.95%'} : {width: '25.1%'},
                                {padding: 6, borderTopWidth: 1, borderRightWidth: 1}
                              ]}
                            >
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label}- {item.value}
                              </Text>
                            </View>
                          ))
                        }
                      </View>
                      <View>
                        {
                          [
                            {
                              label: 'Society Board and Name in the register of society',
                              value: values?.society_board,
                            },
                            {
                              label: 'Applicant Name outside door/gate',
                              value: values?.residence_name_plate,
                            },
                            {
                              label: 'No. of cars seen in and around residence',
                              value: `${values?.fwVehicle > 0 ? values?.fwVehicle : 'No'}`,
                            },
                            {
                              label: 'External appearance of the building/Society',
                              value: values?.external_appearance,
                            },
                            {
                              label: 'Separate parking slot allotted',
                              value: values?.parking_slot,
                            },
                            {
                              label: 'Person Contacted',
                              value: values?.name,
                            },
                            {
                              label: 'Relationship',
                              value: 'Self',
                            },
                            {
                              label: 'Approximate size of flat/house (sq/sq. yards/grounds)',
                              value: values?.currentResidenceSize,
                            },
                            {
                              label: 'Observation/Remarks: ',
                              value: values?.residence_remarks,
                              checkmark: 'endPageBorder',
                            },
                          ].map((item, idx)=> (
                            <View 
                              key={idx} 
                              style={[
                                {flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1},
                                item?.checkmark && {borderBottomWidth: 1}
                              ]}
                            >
                              <View style={{width: '50%', padding: 4, borderRightWidth: 1}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                  {item.label} 
                                </Text>
                              </View>
                              <View style={{width: '50%', padding: 6}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ))
                        }
                      </View>
                    </View>
                    <View style={{position: 'relative', bottom: -16, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                        Page 2 
                      </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ paddingVertical: 8, paddingHorizontal: 32 }}>
                          <Image style={{ width: 110, height: 40 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                  </View>
                  <View style={{padding: 6}}>
                    <View style={{width: '50%', paddingTop: 12}}>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                      If the house is found to be locked after 2 visit 
Attempts, following information is to be obtained 
From neighbors/ third party: 
                      </Text>
                      <View style={{padding: 12}}>
                      {
                        [
                          {
                            label: 'a). No. of Residents in House',
                            value: values?.noOfChildren + values?.noOfAdults,
                          },
                          {
                            label: 'b). Years lived at Residence',
                            value: values?.applicant_residence_time,
                          },
                          {
                            label: 'c). Occupation',
                            value: values?.client_occupation,
                          },
                        ].map((item, idx)=> (
                          <View key={idx} style={{alignItems: 'flex-start'}}>
                            <View style={{padding: 4}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label}- {item.value} 
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                      </View>
                    </View>
                    <View style={{paddingTop: 8}}>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                        4. SOURCE 
                      </Text>
                      <View style={{padding: 8}}>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}>  
                          Borrower Identification is made through {values?.identification_mode}: PAN Card of {values?.name} {values?.applicant_pan} and {values?.coApplicant_name}
                          {values?.coApplicant_pan} 
                        </Text>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 12}}>  
                          Address Verification is done through {values?.address_verify_mode}: Adhaar Card of {values?.name} {values?.applicant_aadhaar} and {values?.coApplicant_name}
                          {values?.coApplicant_aadhaar} 
                        </Text>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 12}}>
                          Employment / Occupation verification is made through: ITR
                        </Text>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginTop: 12}}>
                          Telephone Fax verification, both office and residence by making calls, searching directory listing etc. 
                        </Text>
                        <View style={{paddingTop: 12}}>
                          {
                            [
                              {
                                label: 'Date and time called',
                                value: '5 May 2023 - TIME 1:06 A.M.',
                              },
                              {
                                label: 'Name of the person contacted',
                                value: 'SELF',
                              },
                              {
                                label: 'E-Mail ID- ',
                                value: 'NA',
                              },
                              {
                                label: 'Information collected: ',
                                value: `Details confirmed from self about ${values?.loan_type}.`,
                              },
                            ].map((item, idx)=> (
                              <View key={idx} style={{alignItems: 'flex-start', marginTop: 12}}>
                                <View>
                                  <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                    {item.label}- {item.value} 
                                  </Text>
                                </View>
                              </View>
                            ))
                          }
                        </View>
                      </View>
                    </View>
                    { (!values?.loan_type?.includes("Auto") || !values?.loan_type?.includes("Vehicle") || !values?.loan_type?.includes("auto")) &&
                    <View style={{paddingTop: 8, width: '65%'}}>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                        5. PROPERTY PROPOSED TO BE MORTGAGED Identification of the Property: {`(Proposed to be Mortgaged to the bank `}
{`a).`} {values?.name} {values?.applicant_fullResidentialAddress}  
                      </Text>
                      <View style={{paddingTop: 8}}>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginLeft: 4, marginTop: 8}}> 
                            Name: Not Applicable due to auto loan applied.
                        </Text>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginLeft: 4, marginTop: 8}}>
                          Address
                        </Text>
                        <View>
                          <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginLeft: 4, marginTop: 8}}>
                            {`b).`} Date of visit to the spot
                          </Text>
                          <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginLeft: 4}}>
                            Whether original Title Deeds / Tax receipts verified Yes / No {`d).`} Others {`(specify)`}
                          </Text>
                        </View>
                      </View>
                    </View>
                    }
                    <View style={{position: 'relative', bottom: -84, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                          Page 3 
                        </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ paddingHorizontal: 32, paddingVertical: 84 }}>
                          <Image style={{ width: 120, height: 64 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                  </View>
                  <View style={{padding: 8}}>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 16}}> 
                      6. In case of Builders: {values?.builder_established!=="" ? 'Yes' : 'NA'}
                    </Text>
                    <View style={{paddingTop: 8}}>
                      {
                        [
                          {
                            label: 'Established Since: ',
                            value: values?.builder_established,
                          },
                          {
                            label: 'Number of Projects executed, so far: ',
                            value: values?.builder_totalProjects,
                          },
                          {
                            label: 'Number of flats sold: ',
                            value: values?.builder_soldFlats,
                          },
                          {
                            label: 'Number of flats constructed: ',
                            value: values?.builder_builtFlats,
                          },
                          {
                            label: 'Market enquiries on reputation: ',
                            value: values?.builder_marketEnquiry,
                          },
                          // {
                          //   label: 'Enquiry source 1',
                          //   value: '',
                          // },
                          // {
                          //   label: 'Enquiry source 2',
                          //   value: '',
                          // },
                          {
                            label: 'Quality of Construction [as per Market Report]: ',
                            value: values?.builder_buildQuality,
                          },
                          {
                            label: 'Nature of Property: ',
                            value: values?.propertyNature,
                          },
                          {
                            label: 'Whether project approved by Zonal Office: ',
                            value: values?.projectApproved,
                          },
                        ].map((item, idx)=> (
                          <View key={idx} style={{alignItems: 'flex-start', marginTop: 12}}>
                            <View>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label}{item.value} 
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                    </View>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 20}}> 
                      7. TAKEOVER: NA
                    </Text>
                    <View style={{paddingTop: 8}}>
                      {
                        [
                          {
                            label: 'In case of takeover of loans, ',
                            value: values?.takeover_reason!=="" ? 'Yes' : 'NA',
                          },
                          {
                            label: 'Reason/ s for takeover: ',
                            value: values?.takeover_reason,
                          },
                          {
                            label: 'Amount of Original Advance: ',
                            value: values?.original_advance_amount,
                          },
                          {
                            label: 'Amount Outstanding: ',
                            value: values?.outstanding_amount,
                          },
                          {
                            label: 'Whether regular: ',
                            value: values?.takeover_regular_check,
                          },
                          {
                            label: 'Residual Period of the loan: ',
                            value: values?.loan_residual_period,
                          },
                          {
                            label: 'Verification of Pass Book/ Loan account sheet etc., Verified on: ',
                            value: values?.takeover_doc_verify_date,
                          },
                          {
                            label: 'Confidential opinion from other banks with who party is banking: ',
                            value: values?.confidential_opinion_banks,
                          }
                        ].map((item, idx)=> (
                          <View key={idx} style={{alignItems: 'flex-start', marginTop: 12}}>
                            <View>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label}{item.value} 
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                    </View>
                    <View style={{position: 'relative', bottom: -84, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                          Page 4 
                        </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ paddingHorizontal: 32, paddingVertical: 84 }}>
                          <Image style={{ width: 120, height: 64 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                    <View style={{padding: 8}}>
                      <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 16}}> 
                        8. LATEST ITR VERIFICATION REPORT
                      </Text>
                    { [0,1].map((item, idx)=> (
                      <View key={idx} style={item===0 ? {paddingTop: 16} : {paddingTop: 48}}>
                        <View style={{flexDirection: 'row', borderLeftWidth: 1, borderTopWidth: 1, borderRightWidth: 1}}>
                          <View style={{flexDirection: 'column', borderRightWidth: 1}}>
                            <View style={{borderBottomWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', margin: 4}}> S.No. </Text>
                            </View>
                            {
                              Array.from(Array(9)).map((item, idx)=> (
                                <View key={idx} style={{borderBottomWidth: 1}}>
                                  <View style={{padding: 4}}>
                                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> {idx+1} </Text>
                                  </View>
                                </View>
                              ))
                            }
                          </View>
                          <View style={{flexDirection: 'column', borderRightWidth: 1}}>
                            <View style={{borderBottomWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginHorizontal: 20, marginVertical: 4}}> 
                                Particular 
                              </Text>
                            </View>
                            
                            {
                              ["Acknowledgement Number", "Whether PAN No. OK", "Whether ITR Filed Properly", "Gross Total Income",
                              "Total Taxable income", "Total Tax as per ITR", "TDS", "Self assessment Tax Paid ", "Date of Filing"
                              ].map((item, idx)=> (
                                <View key={idx} style={{borderBottomWidth: 1}}>
                                  <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginVertical: 4, marginHorizontal: 16}}> 
                                    {item} 
                                  </Text>
                                </View>
                              ))
                            }
                            
                          </View>
                          <View style={{flexDirection: 'row'}}>
                          {
                            (item===0 ? values?.applicant_itr_periods 
                            :values?.coApplicant_itr_periods)?.map((item, idx)=> (
                              <View key={idx} style={{borderRightWidth: 1}}>
                                <View style={{alignItems: 'center', width: '100%'}}>
                                  <View style={{borderBottomWidth: 1}}>
                                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginHorizontal: 20, marginVertical: 4}}> 
                                      {item?.session} 
                                    </Text>
                                  </View>
                                  {/* <View style={{flexDirection: 'column'}}> */}
                                    {
                                      [item?.acknowledgementNo, item?.PAN, item?.itr_filed_correctly, item?.gross_total_income, 
                                      item?.total_taxable_income, item?.total_itr_tax, item?.TDS, item?.self_assess_paidTax, 
                                      item?.filing_date].map((field, idx)=> (
                                        <View key={idx} style={{borderBottomWidth: 1, width: '100%', alignItems: 'center'}}>
                                          <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', margin: 4}}> 
                                            {field} 
                                          </Text>
                                        </View>
                                      ))
                                    }
                                  {/* </View> */}
                                </View>
                              </View>
                            ))
                          }
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', borderWidth: 1}}>
                          <View style={{width: 39.6, borderRightWidth: 1, paddingHorizontal: 4}}/>
                          <View style={{flexDirection: 'row', width: '84%', paddingVertical: 4, paddingLeft: 20}}>
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                              Remarks / Observations on ITR: 
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}>
                                &nbsp;&nbsp;Applicant {values?.name} ITR details are checked online processed and mentioned as per ITR produced.
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                    </View>
                    <View style={{position: 'relative', bottom: -16, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                          Page 5 
                        </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ paddingHorizontal: 32, paddingVertical: 16 }}>
                          <Image style={{ width: 120, height: 64 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                  </View>
                  <View style={{padding: 8}}>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 16}}> 
                      9. DETAIL OF BANK ACCOUNT VERIFICATION
                    </Text>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 16}}> 
                        Last 6 month's Bank account verification Report for the Borrower or the Co-applicant who forms major 
contributor for repayment.
                    </Text>
                    <View style={{paddingTop: 8}}>
                      <View style={{flexDirection: 'row', borderLeftWidth: 1}}>
                        {
                          ["S.No.", "Particulars", "Remarks"].map((item, idx)=> (
                            <View key={idx} style={{width: '25%', borderRightWidth: 1, borderTopWidth: 1, padding: 4}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> {item} </Text>
                            </View>
                          ))
                        }
                      </View>
                      <View style={{borderBottomWidth: 1, width: '75%'}}>
                      {
                        [
                          {
                            serialNo: '1.',
                            label: 'Name of the Applicant',
                            value: values?.name,
                          },
                          {
                            serialNo: '2.',
                            label: 'Bank Account No.',
                            value: values?.business_bank_account,
                          },
                          {
                            serialNo: '3.',
                            label: 'Name of the Bank and Branch',
                            value: values?.business_bank_name,
                          },
                          {
                            serialNo: '4.',
                            label: 'Observations/Remarks on the major/regular debits in the account like credit cards, debit Cards, EMI charges for the bank if observed.',
                            value: 'Normal Banking',
                          },
                        ].map((item, idx)=> (
                          <View key={idx} style={{width: '100%', flexDirection: 'row', borderLeftWidth: 1, borderTopWidth: 1}}>
                            <View style={{width: '50%', paddingVertical: 4, paddingHorizontal: 8, borderRightWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                {item.serialNo} 
                              </Text>
                            </View>
                            <View style={{width: '50%', padding: 4, borderRightWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label} 
                              </Text>
                            </View>
                            <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.value}
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                      </View>
                    </View>
                  </View>
                  <View style={{padding: 8}}>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 16}}> 
                      10. VERIFICATION OF THE BALANCE SHEET AND PROFIT AND LOSS ACCOUNT PROVIDED WITH THE 
RELEVANT ITR FILED WITH INCOME TAX DEPARTMENT & BALANCE SHEETWITH MCA WEBSITE FOR THE 
FY ENDED
                    </Text>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal', marginTop: 16}}>
                      Not applicable due to auto loan applied.
                    </Text>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 24, marginHorizontal: 24}}>
                      VERIFICATION OF INCOME DETAILS {`(IN CASE OF SALARIED PERSONS)`}
                    </Text>
                    <View style={{paddingTop: 16}}>
                      <View style={{flexDirection: 'row', borderLeftWidth: 1}}>
                        {
                          ["Source", "Amount", "Remarks"].map((item, idx)=> (
                            <View key={idx} style={{width: '25%', borderRightWidth: 1, borderTopWidth: 1, padding: 4}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> {item} </Text>
                            </View>
                          ))
                        }
                      </View>
                      <View style={{borderBottomWidth: 1, width: '75%'}}>
                      {
                        [
                          {
                            //serialNo: '1.',
                            label: 'Salary (Net)',
                            valueOne: 'NA',
                            valueTwo: 'NA',
                          },
                          {
                            //serialNo: '2.',
                            label: 'Rental Income',
                            valueOne: 'NA',
                            valueTwo: 'NA',
                          },
                          {
                            //serialNo: '3.',
                            label: 'Other Source of Income',
                            valueOne: 'NA',
                            valueTwo: 'NA',
                          }
                        ].map((item, idx)=> (
                          <View key={idx} style={{width: '100%', flexDirection: 'row', borderLeftWidth: 1, borderTopWidth: 1}}>
                            <View style={{width: '50%', paddingVertical: 4, paddingHorizontal: 8, borderRightWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                {item.label} 
                              </Text>
                            </View>
                            <View style={{width: '50%', padding: 4, borderRightWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.valueOne} 
                              </Text>
                            </View>
                            <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.valueTwo}
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                      </View>
                    </View> 
                    <View style={{position: 'relative', bottom: -84, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                          Page 6
                        </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ paddingHorizontal: 32, paddingTop: 84 }}>
                          <Image style={{ width: 120, height: 64 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
              {
                [0,1].map(item=> (
                <React.Fragment key={item}>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                  </View>
                  <View style={{padding: 8}}>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', marginTop: 16}}>
                      {item===0 ? '11.' : '11A .'} BUSINESS VERIFICATION REPORT {`(Strictly Private and Confidential)`} {`[Self employed 
 Employed in service/ Business]`}
                    </Text>
                    <View style={{paddingTop: 8, borderBottomWidth: 1}}>
                      {
                        [
                          {
                            label: 'Name',
                            value: values?.name,
                          },
                          {
                            label: 'Address and email-address',
                            value: values?.applicant_fullResidentialAddress + values?.businessEmail,
                          },
                          {
                            label: 'Telephone No.',
                            value: values?.telephone_mobile,
                          },
                          {
                            label: 'Electricity Bill',
                            value: values?.electricity_bill,
                          },
                          {
                            label: 'Date and Time of Visit',
                            value: values?.visitDate,  //Time to be added...
                          },
                          {
                            label: 'Type of Business/Co.',
                            value: values?.business_type,
                          },
                          {
                            label: 'Type of Loan',
                            value: values?.loan_type + `-${values?.loan_amt_req}`,
                          },
                          {
                            label: 'Landmark',
                            value: values?.landmark,
                          },
                          {
                            label: 'Locality of Office',
                            value: values?.business_locality,
                          },
                          {
                            label: 'Ownership Status of business Premises',
                            value: values?.businessPremiseType,
                          },
                          {
                            label: 'Type of Office',
                            value: values?.business_office_type,
                          },
                          {
                            label: 'Working Hours',
                            value: values?.business_hours,
                          },
                          {
                            label: 'Describe the Building',
                            value: 'Office',   //Input from the user?(TBD)
                          },
                          {
                            label: 'Website of Co./Employer',
                            value: values?.business_website,
                          },
                          {
                            label: 'No. of Employees',
                            value: values?.employeeCount,
                          },
                          {
                            label: 'Nature of Business',
                            value: values?.workNature,
                          },
                          {
                            label: 'No. of Branches',
                            value: values?.business_branches,
                          },
                          {
                            label: 'Terms of employment (for employee)',
                            value: values?.employment_terms,
                          },
                          {
                            label: 'Grade (employee)',
                            value: 'Other',
                          },
                          {
                            label: 'Years of employment / business established since',
                            value: 'From last ' + values?.business_time + ' years',
                          },
                          // {
                          //   label: 'If the business is conducted in own residence, is there separate area earmarked',
                          //   value: 'No',
                          // }, //TBD
                          {
                            label: `Company's name place seen outside premises`,
                            value: values?.business_name_plate,
                          },
                        ].map((item, idx)=> (
                          <View key={idx} style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1}}>
                            <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.label} 
                              </Text>
                            </View>
                            <View style={{width: '50%', padding: 6}}>
                              <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                {item.value}
                              </Text>
                            </View>
                          </View>
                        ))
                      }
                    </View>
                    <View style={{position: 'relative', bottom: -48, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                          Page {item===0 && 7 || item===1 && 9} 
                        </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ paddingHorizontal: 32, paddingTop: 48 }}>
                          <Image style={{ width: 120, height: 64 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                  <View className="Header">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingVertical: 16,
                        }}
                    >
                        <View
                            style={{
                            paddingRight: 4,
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 10,
                                color: 'blue',
                                fontFamily: "Open Sans",
                                fontWeight: "400",
                                textAlign: "right",
                            }}
                            >
                                Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                                Bathinda. Mobile Number 9356200300
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                  </View>
                  <View style={{padding: 8}}>
                    <View style={{paddingTop: 8}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, width: '100%', alignItems: 'flex-start', justifyContent: 'center', padding: 24}}>
                          <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> Status of Premises </Text>
                        </View>
                        <View style={{borderTopWidth: 1, borderRightWidth: 1, width: '100%', paddingVertical: 12}}>
                        {
                          [
                            {
                              label: 'Reception Area',
                              value: values?.business_reception,
                              //value: 'Yes'
                            },
                            {
                              label: 'Security Guard',
                              value: values?.business_security,
                              //value: 'Yes'
                            },
                            {
                              label: 'Cabin',
                              value: values?.business_cabin,
                              //value: 'Yes'
                            },
                            {
                              label: 'Security/Typist',
                              value: values?.business_typist,
                            },
                            {
                              label: 'Air Conditioner',
                              value: values?.business_ac,
                            },
                            {
                              label: 'Xerox',
                              value: values?.business_xerox,
                            },
                            {
                              label: 'Fax',
                              value: values?.business_fax,
                            },
                            {
                              label: 'Computer',
                              value: values?.business_computer,
                            },
                          ].map((item, idx)=> (
                            <View key={idx} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              <View style={{paddingVertical: 8, paddingLeft: 24}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                  {item.label} 
                                </Text>
                              </View>
                              <View style={{paddingVertical: 8, paddingRight: 24}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ))
                        }
                        </View>
                      </View>
                      <View style={{borderBottomWidth: 1}}>
                        {
                          [
                            {
                              label: 'Business Activity Seen',
                              value: 'Yes',
                            },
                            {
                              label: 'Assets Seen',
                              value: 'Others',
                            },
                            {
                              label: 'Approximate size of Office',
                              value: values?.officeArea,
                            },
                            {
                              label: 'Amount of Business',
                              value: 'Active',
                            },
                            {
                              label: 'Briefly describe the nature of Business',
                              value: values?.workNature,
                            },
                            {
                              label: 'No. of employees',
                              value: values?.employeeCount,
                            },
                            {
                              label: 'Neighbourhood Check',
                              value: 'Positive',
                            }
                          ].map((item, idx)=> (
                            <View key={idx} style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1}}>
                              <View style={{width: '50%', padding: 6, borderRightWidth: 1}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                  {item.label} 
                                </Text>
                              </View>
                              <View style={{width: '50%', padding: 6}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ))
                        }
                      </View>
                    </View>
                    <View style={{position: 'relative', bottom: -48, width: '100%'}}>
                      <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                        <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                          Page {item===0 && 8 || item===1 && 10} 
                        </Text>
                    </View>
                    {values?.stamp.length > 0 &&
                      values?.stamp?.map((item, idx) => (
                      <View key={idx} style={{ paddingHorizontal: 32, paddingVertical: 84 }}>
                          <Image style={{ width: 120, height: 64 }} source={{ uri: item }} />
                      </View>
                    ))}
                  </View>
                </Page>
              </React.Fragment>
              ))}
              <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                <View className="Header">
                  <View
                      style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingVertical: 16,
                      }}
                  >
                      <View
                          style={{
                          paddingRight: 4,
                          }}
                      >
                          <Text
                          style={{
                              fontSize: 10,
                              color: 'blue',
                              fontFamily: "Open Sans",
                              fontWeight: "400",
                              textAlign: "right",
                          }}
                          >
                              Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                              2907 GH, G.T. Road , Near Zila Parishad, {'\n'} 
                              Bathinda. Mobile Number 9356200300
                          </Text>
                      </View>
                  </View>
                  <View style={{width: '100%', height: 1, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                </View>
                <View style={{padding: 8}}>
                  <View style={{flexDirection: 'row', paddingTop: 12}}>
                    <View style={{width: '25%'}}>
                      <Text 
                        style={{
                          fontSize: 10, 
                          fontFamily: 'Open Sans', 
                          fontWeight: 'bold', 
                          textDecoration: 'underline'
                        }}
                      >Additional Comments </Text>
                    </View>
                    <View style={{width: '75%'}}>
                      <Text 
                        style={{
                          fontSize: 10, 
                          fontFamily: 'Open Sans', 
                          fontWeight: 'normal', 
                          textAlign: 'justify'
                        }}
                      > 
                        {`Applicant ${values?.name} had applied for ${values?.loan_type} of Rs.${values?.loan_amt_req} Lakh. Applicant is`} 
{` running cosmetic, general goods and spices wholesale business in the name of ${values?.business_entity}`} 
{` situated at ${values?.full_business_address.split(',').slice(1).join(',')} from last ${values?.business_time} years. Client is`} 
{` distributor of various brands like (lotus, Laborates, Nimson, All-out, Kaveri Mehandi, and Homeking`} 
{` Spices). Client is running their business in ${values?.businessPremiseType} premises and shop built in area of ${values?.officeArea}. Client`} 
{` is also running another firm in the name of M/s. DM Marketing since 2017; his wife ${values?.coApplicant_name} is proprietor`} 
{` of said firm. Client has already availed Rs.30 lakh CC limit from ${values?.existing_bank} and Rs.10 lakh house loan`} 
{` running from LIC finance. During visit to their address found their living and working status is reasonable.`}
                      </Text>
                    </View>
                  </View>
                  <View style={{paddingTop: 24}}>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                      {values?.name} CIBIL Score: <Text style={{fontWeight: 'bold'}}> {values?.applicant_cibil} </Text> {values?.coApplicant_name} CIBIL Score: <Text style={{fontWeight: 'bold'}}> {values?.coApplicant_cibil} </Text> 
                    </Text>
                  </View>
                  <Text 
                    style={{
                      marginTop: 24,
                      fontSize: 10, 
                      fontFamily: 'Open Sans', 
                      fontWeight: 'bold', 
                      textDecoration: 'underline'
                    }}
                  >Case is Positive </Text>
                  <Text 
                    style={{
                      marginTop: 24,
                      fontSize: 10, 
                      fontFamily: 'Open Sans', 
                      fontWeight: 'bold', 
                      textDecoration: 'underline'
                    }}
                  >
                    Picture of Applicant Current residence house and Shop                  
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    {values?.images.length > 0 && (
                    <View
                        style={{
                        marginHorizontal: "auto",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: 500,
                        }}
                    >
                        {values?.images?.map((item, idx) => (
                        <View
                            key={idx}
                            style={{
                            minWidth: values?.images?.length === 1 ? 300 : 100,
                            maxWidth: values?.images?.length === 1 ? 500 : 300,
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 8,
                            marginTop: 4,
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
                        ))}
                    </View>
                    )}
                  </View>
                  <View style={{position: 'relative', bottom: values?.images?.length <= 4 ? -24 : -480, width: '100%'}}>
                    <View style={{width: '100%', height: 2, backgroundColor: 'rgba(31,49,51,0.5)'}}/>
                    <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold', textAlign: 'center', alignSelf: 'flex-end'}}> 
                      Page 11 
                    </Text>
                  </View>
                  {values?.stamp.length > 0 &&
                    values?.stamp?.map((item, idx) => (
                    <View key={idx} style={{ paddingHorizontal: 32, paddingTop: values?.images?.length <= 4 ? 16 : 500 }}>
                        <Image style={{ width: 120, height: 64 }} source={{ uri: item }} />
                    </View>
                  ))}
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
});

export default DdaPDF;