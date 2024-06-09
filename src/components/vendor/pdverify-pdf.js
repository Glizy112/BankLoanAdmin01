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

const PDVerifyPDF =({values})=> {
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

    const userDataArr = [
        {
            label: 'Marital Status',
            statValues: applicationProfileArr[0].maritalStatus
        },
        {
            applicationSummaryArr: [
                {
                    label: 'Date',
                    value: values?.visitDate,
                },
                {
                    label: 'Prospect No.',
                    value: values?.application_id,
                },
                {
                    label: 'Status of PD',
                    value: values?.pd_status,
                },
            ]
        }, 
        {
            applicationSummaryArr1: [
                {
                    label: 'Details of KYC Verified',
                    value: values?.aadhar_card,
                },
                {
                    label: 'Venue Type',
                    value: 'Office',
                },
                {
                    label: 'Address of Venue',
                    value: values?.visitDate_business_setup,
                },
            ]
        },
        {
            basicDetailsArr: [
                {
                    label: 'Name',
                    value: values?.name,
                },
                {
                    label: 'Marital Status',
                    value: applicationProfileArr[0].maritalStatus,
                },
                {
                    label: 'Educational Qualification',
                    value: applicationProfileArr[0].educationQualification,
                },
                {
                    label: 'Category',
                    value: applicationProfileArr[0].category,
                },
                {
                    label: 'Number of Dependants',
                    value: 4,
                },
                {
                    label: 'Number of years in Current Residence',
                    value: applicationProfileArr[0]?.currentResidenceTime,
                },
                {
                    label: 'Current residence house size',
                    value: applicationProfileArr[0]?.currentResidenceSize,
                },
                {
                    checkmark: 'ifPrevious',
                    label: 'If <=1 Year, then Previous Address',
                    value: [
                        {
                            value: values?.previousAddress,
                        },
                        {
                            value: 'Number of years stayed at that address',
                        },
                        {
                            value: values?.previousAddressTime,
                        },
                    ],
                },
                // {
                //     label: 'Number of years stayed at that address',
                //     value: values?.previousAddressTime,
                // },
                // {
                //     previousAddressArr: [
                //         {
                //             label: 'If <= 1Year, then Previous Address',
                //             value: values?.previousAddress,
                //         },
                //         {
                //             label: 'Number of Years stayed at that address',
                //             value: values?.previousAddressTime,
                //         }
                //     ]
                // },
                {
                    label: 'Number of Years in Current City',
                    value: applicationProfileArr[0]?.currentCityYears,
                },
            ]
        },
    ];

    const totalAnnualRev = values?.sales_receipt;
    const totalMonthlyExp = values?.purchases+values?.shopRent+values?.salaries+values?.electricity+ 
    values?.petrol_expenses+values?.misc_exps;
    const netAnnualProfit = totalAnnualRev-totalMonthlyExp;
    const netMonthlyProfit = Math.abs(netAnnualProfit/12);

    return(
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                    <View className="Header">
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 24,
                            }}
                        >
                            <View
                                style={{
                                paddingRight: 10,
                                }}
                            >
                                <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: "Open Sans",
                                    fontWeight: "400",
                                    textAlign: "center",
                                }}
                                >
                                    Vijay Raj Jindal Co., Chartered Accountants, G.T. Road {'\n'}
                                    2907 GH, G.T. Road , Near Zila Parishad, {'\n'}
                                    Bathinda. Mobile Number 9356200300
                                </Text>
                            </View>
                        </View>
                        <View style={{alignSelf: 'center', justifyContent: 'center', paddingBottom: 16}}>
                            <Text style={styles.title}> Personal Discussion Report </Text>
                            <Text style={[styles.text, {alignSelf: 'center'}]}> {`(On Agency's Letterhead)`} </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16}}>
                            <View style={[{flexDirection: 'column', width: 220}, styles.bl, styles.br, styles.bt]}>
                            {
                                userDataArr[1]?.applicationSummaryArr?.map((item, idx)=> (    
                                    <View key={idx} style={[styles.bb, { flexDirection: "row" }]}>
                                        <View style={[styles.section, { backgroundColor: '#B7B7B7', width: 108 }]}>
                                            <Text
                                                style={[styles.text, {fontWeight: 'bold', fontSize: 10, fontFamily: 'Open Sans'}]}
                                            >
                                                {item?.label}
                                            </Text>
                                        </View>
                                        <Text style={[styles.text, {alignSelf: 'center', marginLeft: 4}]}> {item?.value} </Text> 
                                    </View>
                                ))
                            }
                            </View>
                            <View style={[{flexDirection: 'column', width: 300}, styles.bl, styles.br, styles.bt]}>
                            {
                                userDataArr[2]?.applicationSummaryArr1?.map((item, idx)=> (
                                    <View key={idx} style={[styles.bb, { flexDirection: "row" }]}>
                                        <View style={[styles.section, { backgroundColor: '#B7B7B7', width: 150 }]}>
                                            <Text
                                                style={[styles.text, {fontWeight: 'bold', fontSize: 10, fontFamily: 'Open Sans'}]}
                                            >
                                                {item?.label}
                                            </Text>
                                        </View>
                                        <View style={{width: 108}}>
                                            <Text style={[styles.text, {marginLeft: 4, paddingVertical: 8}]}> {item?.value} </Text> 
                                        </View>
                                    </View>
                                ))
                            }
                            </View>
                        </View>
                        <View style={{paddingTop: 16}}>
                            <Text style={styles.text}> To, {`\n\n`} <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}>India Infoline Housing Finance Ltd.{` (IIFL HFC)`}</Text>  Branch office at ..................... Bathinda.</Text>
                            <Text style={[styles.text, {marginTop: 12}]}> Dear Sir / Madam </Text>
                            <Text style={[styles.title, {marginTop: 8, textDecoration: 'none'}]}> Sub: PD Report of Mr./ Ms./ M/s_{values?.visitDate_business_setup.split(',')[0]}, {values?.name} S/o. Amar Singh</Text>
                            <Text style={[styles.text, {marginTop: 2}]}> Please refer to your instructions on the captioned matter. In this connection, we submit our report as under: </Text>
                        </View>
                        <View 
                            style={{
                                alignSelf: 'center', 
                                justifyContent: 'center', 
                                marginVertical: 16, 
                                backgroundColor: '#B7B7B7', 
                                width:'100%', 
                                height: '4%'
                            }}
                        >
                            <Text style={[styles.title, {fontSize: 14, textDecoration: 'none', padding: 0, alignSelf: 'center'}]}>PD-cum-verification Sheet - Self Employed/Salaried Applicant</Text>
                        </View>
                        <View style={styles.sectionHeader}>
                            <View style={{width: '20%', height: '100%', borderRightWidth: 1, padding: 4, backgroundColor: '#B7B7B7', justifyContent: 'center'}}>
                                <Text style={[styles.title, {textDecoration: 'none', padding: 4}]}> Prospect No. </Text>        
                            </View>
                            <View style={{width: '25%', borderRightWidth: 1}}>
                                <Text style={[styles.text, {paddingVertical: 4}]}> {values?.application_id} </Text>        
                            </View>
                            <View style={{width: '10%', borderRightWidth: 1}}/>
                            <View style={{width: '45%', padding: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fac090'}}>
                                <Text style={[styles.title, {textDecoration: 'none', paddingTop: 0}]}>NOTE: Please tick/circle as applicable</Text>
                            </View>
                        </View>
                        
                        <View style={[styles.sectionHeader, {height: '4%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                            <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Basic Details </Text>
                        </View>
                        <View style={{flexDirection: 'column', marginTop: 16}}>
                        {
                            userDataArr[3]?.basicDetailsArr?.map((item, idx)=> (
                                <View key={idx} style={[styles.bl, styles.bt, { flexDirection: "row" }]}>
                                    <View style={[styles.section, { backgroundColor: '#B7B7B7', paddingLeft: 4, paddingRight: 4, paddingVertical: 0, width: 110}]}>
                                        <Text
                                            style={[styles.text, {fontSize: 8, fontWeight: 'bold', fontFamily: "Open Sans"}]}
                                        >
                                            {item?.label}
                                        </Text>
                                    </View>
                                    {item?.value?.constructor === Array ? (
                                        item?.value?.map((singleItem, idx)=> (
                                            <View key={idx}
                                                style={[
                                                    styles.br,
                                                    (Object.values(values).includes(singleItem?.value)) && {backgroundColor: '#fac090'}, 
                                                    { justifyContent: 'center', width: 72 }, 
                                                    (item?.checkmark==="ifPrevious" && singleItem?.value===item?.value[1].value) 
                                                    && {backgroundColor: '#B7B7B7', width: 180},
                                                    (item?.checkmark==="ifPrevious" && singleItem?.value===item?.value[0].value && singleItem?.value===item?.value[2].value)
                                                    && {width: 136}
                                                ]}
                                            >
                                                <Text 
                                                    style={[
                                                        styles.text, 
                                                        {fontSize: 8, alignSelf: 'center', paddingVertical: 8},
                                                        (item?.checkmark==="ifPrevious" && singleItem?.value===item?.value[1].value) 
                                                        && {fontWeight: 'bold', fontFamily: 'Open Sans'}
                                                    ]}
                                                > {singleItem?.value} </Text> 
                                            </View>
                                        ))  
                                    )
                                    :
                                    (<View style={{width: 108, flexGrow: 1, borderRightWidth: 1}}>
                                        <Text style={[styles.text, {marginLeft: 4, paddingVertical: 8}]}> {item?.value} </Text> 
                                    </View>)
                                    }
                                </View>
                            ))
                        }
                         <View style={[styles.bw, {flexDirection: 'row'}]}>
                            <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br]}>
                                <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                    If {'<'}3 Years in current city, then mention 
                                </Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[{backgroundColor: '#B7B7B7', padding: 8, width: 100}, styles.br]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            Previous City
                                        </Text>
                                    </View>
                                    <View style={[{padding: 4, width: 150}, styles.br]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {values?.previousCityName}
                                        </Text>
                                    </View>
                                    <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 170, justifyContent: 'center'}, styles.br]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            Number of Years in that city
                                        </Text>
                                    </View>
                                    <View style={[{padding: 4, width: 150}]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {values?.previousCityTime}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[{flexDirection: 'row', flexGrow: 1}, styles.bt]}>
                                    <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 100}, styles.br]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            Reason for Change
                                        </Text>
                                    </View>
                                    <View style={[{padding: 4, width: 150}]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {values?.previousCityChangeReason}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                         </View>
                        </View>
                    </View>
                </Page>

                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                <View className="Header" style={{paddingVertical: 16}}>
                    <View style={[styles.bl, styles.bt, {flexDirection: 'row'}]}>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Parents Staying with? 
                            </Text>
                        </View>
                        <View style={[{padding: 4, width: 150, justifyContent: 'center', flexGrow: 1}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                {values?.livingWithParents==='Y' ? "Yes" : "No"} 
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.bl, styles.bt, styles.bb, {flexDirection: 'row'}]}>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 193, justifyContent: 'center'}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                If Parents living separately, then mention 
                            </Text>
                        </View>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 80, justifyContent: 'center'}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Residing City
                            </Text>
                        </View>
                        <View style={[{padding: 4, width: 150, justifyContent: 'center', flexGrow: 1}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                {values?.parentsResidingCity} 
                            </Text>
                        </View>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Residing location ownership status
                            </Text>
                        </View>
                        <View style={[{padding: 4, width: 150, justifyContent: 'center', flexGrow: 1}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                {values?.parentsResidenceType} 
                            </Text>
                        </View>
                    </View>
                    
                    <View style={[styles.sectionHeader, {height: '4%', borderLeftWidth: 1, borderRight: 0, borderTop: 0, borderBottom: 0, paddingTop: 12}]}>
                        <Text style={[styles.title, {textDecoration: 'none', padding: 0}]}> Assets and Investment Details </Text>
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl, styles.bt]}>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 127, justifyContent: 'center'}, styles.br, styles.bb]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Assets Owned
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column', flexGrow: 1}}>
                            <View style={{flexDirection: 'row', flexGrow: 1}}>
                                {
                                    applicationProfileArr[0]?.assets?.slice(0,5)?.map((item, idx)=> (
                                        <View key={idx}
                                            style={[
                                                styles.br, 
                                                styles.bb, 
                                                (values?.ownedAssets?.includes(item?.value)) && {backgroundColor: '#fac090'},
                                                {width: 84, padding: 2, flexGrow: 1}
                                            ]}
                                        >
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'normal'}}> {item.value} </Text>
                                        </View>  
                                    ))
                                }
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {
                                    applicationProfileArr[0]?.assets?.slice(5)?.map((item, idx)=> (    
                                        <View key={idx}
                                            style={[
                                                styles.br, 
                                                styles.bb, 
                                                (values?.ownedAssets?.includes(item?.value)) && {backgroundColor: '#fac090'},
                                                {width: 87, padding: 2}
                                            ]}
                                        >
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'normal'}}> {item.value} </Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl]}>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 245, justifyContent: 'center'}, styles.br, styles.bb]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Investments (Mention Amount if he owns or invest in any instrument)
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row'}}>
                                {
                                    applicationProfileArr[0]?.investments?.map((item, idx)=> (
                                        <View key={idx}
                                            style={[
                                                styles.br, 
                                                styles.bb, 
                                                (item?.value==="Post Office Savings") && styles.bt,
                                                (values?.investments?.includes(item?.value)) && {backgroundColor: '#fac090'},
                                                {width: '30%', padding: 4, justifyContent: 'center'}
                                            ]}
                                        >
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'normal'}}> {item.value} </Text>
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                        Is Post Office savings monthly ?
                                    </Text>
                                </View>
                                <View style={[{padding: 4, width: 75, justifyContent: 'center'}, styles.br, styles.bb]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                        Yes
                                    </Text>
                                </View>
                                <View style={[{padding: 4, width: 75, justifyContent: 'center'}, styles.br, styles.bb]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                        No
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                        Any Recurring Deposit ?
                                    </Text>
                                </View>
                                <View style={[{padding: 4, width: 75, justifyContent: 'center'}, styles.br, styles.bb]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                        Yes
                                    </Text>
                                </View>
                                <View style={[{padding: 4, width: 75, justifyContent: 'center'}, styles.br, styles.bb]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                        No
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl]}>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 126, justifyContent: 'center'}, styles.br, styles.bb]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Do you consume Nicotine Products or Alcohol ?
                            </Text>
                        </View>
                        <View style={[{padding: 4, width: 150.5, justifyContent: 'center'}, styles.br, styles.bb]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Yes
                            </Text>
                        </View>
                        <View style={[{padding: 4, width: 150.5, justifyContent: 'center'}, styles.br, styles.bb]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                No
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.sectionHeader, {height: '4%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                        <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Employment Details </Text>
                    </View>
                    <View style={{flexDirection: 'column', width: '100%', marginTop: 16}}>
                        <View style={[{flexDirection: 'row'}, styles.bl, styles.bt]}>
                            {
                                [
                                    {label: "Name of Current Business Firm", value: values?.visitDate_business_setup},
                                    {label: "Person Met, Contact No. & Designation", value: values?.business_type},
                                ].map((item, idx)=> (
                                    <>
                                        <View key={idx} style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                                {item.label}
                                            </Text>
                                        </View>
                                        <View key={idx+'_sib'} style={[{padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {item.value}
                                            </Text>
                                        </View>
                                    </>
                                ))
                            }
                        </View>
                        <View style={[{flexDirection: 'row'}, styles.bl]}>
                            {
                                [
                                    {label: "Type of Business Firm", value: values?.business_type},
                                    {label: "If Partnership, % shareholding", value: values?.shareholdingsPercentage},
                                ].map((item, idx)=> (
                                    <>
                                        <View key={idx} style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                                {item.label}
                                            </Text>
                                        </View>
                                        <View key={idx+'_sib'} style={[{padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {item.value}
                                            </Text>
                                        </View>
                                    </>
                                ))
                            }
                        </View>
                        <View style={[{flexDirection: 'row'}, styles.bl]}>
                            {
                                [
                                    {label: "Date of commencement of Business", value: values?.businessStartDate},
                                    {label: "Place of Incorporation", value: 'Same as Above'},
                                ].map((item, idx)=> (
                                    <>
                                        <View key={idx} style={[{backgroundColor: '#B7B7B7', padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                                {item.label}
                                            </Text>
                                        </View>
                                        <View key={idx+'_sib'} style={[{padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {item.value}
                                            </Text>
                                        </View>
                                    </>
                                ))
                            }
                        </View>
                    </View>
                    <View style={[styles.sectionHeader, {height: '4%', borderLeftWidth: 1, borderRight: 0, borderTop: 0, borderBottom: 0, paddingTop: 12}]}>
                        <Text style={[styles.title, {textDecoration: 'none', padding: 0}]}> If above less than 3 years, provide following details </Text>
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl, styles.bt]}>
                        {
                            [
                                {label: "Name of Previous Business", value: values?.previousBusinessName==="" ? 'NA' : values?.previousBusinessName},
                                {label: "Number of years worked there", value: values?.previousBusinessTime===0 ? '' : values?.previousBusinessTime},
                                {label: "Reason for Change/Closing the Previous Business", value: values?.previousBusinessChangeReason==="" ? '' : values?.previousBusinessChangeReason},
                            ].map((item, idx)=> (
                                <>
                                    <View 
                                        key={idx}
                                        style={[
                                            {backgroundColor: '#B7B7B7', padding: 4, width: 220, justifyContent: 'center'}, 
                                            (item?.label==="Name of Previous Business") && {width: 230},
                                            styles.br, 
                                            styles.bb
                                        ]}
                                    >
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {item.label}
                                        </Text>
                                    </View>
                                    <View key={idx+'_sib'} style={[{padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                            {item.value}
                                        </Text>
                                    </View>
                                </>
                            ))
                        }
                    </View>
                    <View style={[{flexDirection: 'column'}, styles.bl]}>
                        {
                            [
                                {label: "Total Work Experience", value: values?.previousWorkExperience==="" ? 'NA' : values?.previousWorkExperience},
                                {label: "Official/Business Email-ID", value: values?.businessEmail==="" ? 'NA' : values?.businessEmail},
                                {label: "Official Landline Number", value: (values?.businessLandline==="" || values?.businessLandline===0) ? 'NA' : values?.businessLandline},
                            ].map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 115.5, justifyContent: 'center'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {item.label}
                                        </Text>
                                    </View>
                                    <View style={[{padding: 4, width: 185.5, justifyContent: 'center'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                            {item.value}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View style={[styles.sectionHeader, {height: '4%', borderLeftWidth: 1, borderRight: 0, borderTop: 0, borderBottom: 0, paddingTop: 12}]}>
                        <Text style={[styles.title, {textDecoration: 'none', padding: 0}]}> Business Details </Text>
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl, styles.bt]}>
                        {
                            [
                                {label: 'Type of Industry', value: ['Trading', 'Services']}, 
                                {label: 'Other, Please specify', value: values?.business_type}
                            ].map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 160, justifyContent: 'center'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {item.label}
                                        </Text>
                                    </View>
                                    {
                                        item?.value.constructor===Array ? item?.value?.map((singleItem, idx)=> (
                                            <View key={idx} style={[{padding: 4, width: 150, justifyContent: 'center'}, (values?.industryType===singleItem) && {backgroundColor: '#fac090'}, styles.br, styles.bb]}>
                                                <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                    {singleItem}
                                                </Text>
                                            </View>
                                        ))
                                        :
                                        (
                                        <View style={[{padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {item.value}
                                            </Text>
                                        </View>
                                        )
                                    }
                                </View>
                            ))
                        }
                    </View>
                    <View style={[{flexDirection: 'row', marginTop: 4}, styles.bl, styles.bt]}>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 118, justifyContent: 'center'}, styles.br, styles.bb]}>
                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Business Profile
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row'}}>
                            {
                            applicationProfileArr[0]?.businessProfile?.slice(0,5).map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{padding: 4, width: 90, justifyContent: 'center'}, (values?.businessProfile===item?.value) && {backgroundColor: '#fac090'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                            {item.value}
                                        </Text>
                                    </View>
                                </View>
                            ))
                            }
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            {
                            applicationProfileArr[0]?.businessProfile?.slice(5,10).map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{padding: 4, width: 90, justifyContent: 'center'}, (values?.businessProfile===item?.value) && {backgroundColor: '#fac090'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                            {item.value}
                                        </Text>
                                    </View>
                                </View>
                            ))
                            }
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            {
                            applicationProfileArr[0]?.businessProfile?.slice(10,15).map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{padding: 4, width: 90, justifyContent: 'center'}, (values?.businessProfile===item?.value) && {backgroundColor: '#fac090'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                            {item.value}
                                        </Text>
                                    </View>
                                </View>
                            ))
                            }
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            {
                            applicationProfileArr[0]?.businessProfile?.slice(15).map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{padding: 4, width: 89.2, justifyContent: 'center'}, (values?.businessProfile===item?.value) && {backgroundColor: '#fac090'}, styles.br, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                            {item.value}
                                        </Text>
                                    </View>
                                </View>
                            ))
                            }
                            </View>
                        </View>
                    </View>
                </View>
                </Page>
                
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                    <View className="Header" style={{paddingVertical: 16}}>
                        <View style={[{flexDirection: 'column', marginTop: 4}, styles.bl]}>
                        {
                            [
                                {label: 'Business Premises Ownership', value: applicationProfileArr[0]?.businessPremiseType},
                                {label: 'Area of Office', value: applicationProfileArr[0]?.officeArea},
                                {label: 'Stocks/Assets seen at Premises', value: values?.stocksAssetsAtPremises, valueExtra: {label: 'Others (Please specify all major assets seen)', value: 'NA'}},
                                {label: 'Locality of Business Premises', value: applicationProfileArr[0]?.premisesLocality},
                                {label: 'Annual Turnover', value: values?.sales_receipt},
                                {label: 'Net Profit Margin', value: values?.net_profit},
                                {label: 'Is Business Seasonal ?', value: 'NA'},
                                {label: 'Number of Employees ?', value: values?.employeeCount},
                            ].map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 120, justifyContent: 'center'}, styles.br, styles.bb, , styles.bt]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {item.label}
                                        </Text>
                                    </View>
                                    {
                                        item?.value.constructor===Array ? item?.value?.map((singleItem, idx)=> (
                                            <View 
                                                key={idx} 
                                                style={[
                                                    {padding: 4, width: 80, justifyContent: 'center'}, 
                                                    (singleItem?.value===values?.businessPremiseType) && {backgroundColor: '#fac090'},
                                                    (singleItem?.value===values?.officeArea) && {backgroundColor: '#fac090'},
                                                    (singleItem?.value===values?.premisesLocality) && {backgroundColor: '#fac090'}, 
                                                    styles.br, styles.bb, styles.bt
                                                ]}
                                            >
                                                <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                    {singleItem?.value}
                                                </Text>
                                            </View>
                                        ))
                                        :
                                        <View style={[{padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {item?.value}
                                            </Text>
                                        </View>
                                    }
                                    {    
                                    item?.valueExtra!==undefined &&
                                    <>
                                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 120, justifyContent: 'center'}, styles.br, styles.bb]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                                {item?.valueExtra?.label}
                                            </Text>
                                        </View>
                                        <View style={[{padding: 4, width: 150, justifyContent: 'center'}, styles.br, styles.bb, styles.bt]}>
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {item?.valueExtra?.value}
                                            </Text>
                                        </View>
                                    </>
                                    }
                                </View>
                            ))
                        }
                        </View>
                        {/* Profile Description of employee / staff pending */}
                        <View style={[{flexDirection: 'column'}, (values?.businessEmployeeProfile?.length < 4) && {marginVertical: 32}]}>
                            <View style={[{flexDirection: 'row', marginTop: 4}, styles.bl]}>
                                <View style={[{flexDirection: 'column', width: 120, padding: 4, backgroundColor: '#B7B7B7'}, styles.bt, styles.br]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                        Designation of Employee/Staff Member 
                                    </Text>
                                </View>
                                <View style={[{flexDirection: 'column', width: 120, padding: 4, backgroundColor: '#B7B7B7'}, styles.bt, styles.br]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                        No. of employees in that role
                                    </Text>
                                </View>
                            </View>
                            <View>
                                {
                                    // ['NA', 'NA', 'NA', 'NA'].map((item, idx)=> (
                                    //     <View key={idx} style={[styles.bt, styles.br, {width: 120, alignItems: 'center', padding: 4}]}>
                                    //         <Text style={styles.text}> {item} </Text>
                                    //     </View>
                                    // ))
                                    values?.businessEmployeeProfile.map((item, idx)=> (
                                        <View key={idx} style={{flexDirection: 'row'}}>
                                            <View style={[styles.bl, styles.bb, styles.bt, {padding: 4, width: 120}]}>
                                                <Text style={styles.text}> {item?.designationName} </Text>
                                            </View>
                                            <View style={[styles.br, styles.bl, styles.bb, styles.bt, {padding: 4, width: 120.5}]}>
                                                <Text style={styles.text}> {item?.totalEmployees} </Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                            {/* <View style={[{flexDirection: 'column', marginTop: 4}]}>
                                <View style={[{flexDirection: 'column', width: 120, padding: 4, backgroundColor: '#B7B7B7'}, styles.bt, styles.br]}>
                                    <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                        No. of employees in that role
                                    </Text>
                                </View>
                                <View style={[styles.bb, {width: 120}]}>
                                    {
                                        ['NA', 'NA', 'NA', 'NA'].map((item, idx)=> (
                                            <View key={idx} style={[styles.bt, styles.br, {width: 120, alignItems: 'center', padding: 4}]}>
                                                <Text style={styles.text}> {item} </Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View> */}
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[{flexDirection: 'column', width: 120, padding: 4, backgroundColor: '#B7B7B7'}, styles.bl, styles.bb]}>
                                <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                    No. of Years for which Business running in this Premises
                                </Text>
                            </View>
                            <View style={[{flexDirection: 'column', width: 120, padding: 4, alignItems: 'center', justifyContent: 'center'}, styles.bl, styles.bb]}>
                                <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                    {values?.business_time ? `${values?.business_time} Years` : 'NA'}
                                </Text>
                            </View>
                            <View style={[{flexDirection: 'column', width: 120, padding: 4, backgroundColor: '#B7B7B7'}, styles.bl, styles.bt, styles.bb]}>
                                <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                    If less than 3 years- Provide address details from where it was operating earlier 
                                </Text>
                            </View>
                            <View style={[{flexDirection: 'column', width: 120, padding: 4, alignItems: 'center', justifyContent: 'center'}, styles.bl, styles.bt, styles.br, styles.bb]}>
                                <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}>
                                    {values?.previousBusinessAddress ? values?.previousBusinessAddress : 'NA'}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            {
                                 [
                                    {label: 'Popularity in Local Market', value: applicationProfileArr[0]?.businessPopularity}, 
                                    {label: 'No. of competitors in Nearby Market', value: ['NA', '', '']},
                                    {label: 'Final Product/Service of Business', value: values?.visitDate_business_setup, checkmark: 'flexWidth'},
                                    {label: 'Business Started By', value: applicationProfileArr[0]?.businessStartedBy, checkmark: 'diffLabelWidth'},
                                    {label: 'If Self-Started, then source of Initial Funds', value: applicationProfileArr[0]?.initialFunds, checkmark: 'diffLabelWidth'},
                                ].map((item, idx)=> (
                                <View key={idx} style={[{flexDirection: 'row'}, styles.bl]}>
                                    <View 
                                        style={[
                                            {backgroundColor: '#B7B7B7', padding: 4, width: 121, justifyContent: 'center'}, 
                                            (item?.checkmark==="diffLabelWidth") && {width: 121},
                                            styles.br, 
                                            styles.bb
                                        ]}
                                    >
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {item.label}
                                        </Text>
                                    </View>
                                    {
                                        item?.value.constructor===Array ? item?.value?.map((singleItem, idx)=> (
                                            <View key={idx}
                                                style={[
                                                    {padding: 4, width: 119.5, justifyContent: 'center'}, 
                                                    (item?.checkmark==='diffLabelWidth') && {width: 80},
                                                    (singleItem?.value===values?.businessPopularity) && {backgroundColor: '#fac090'},
                                                    (singleItem?.value===values?.personStartingBusiness) && {backgroundColor: '#fac090'},
                                                    (singleItem?.value===values?.businessInitialFunds) && {backgroundColor: '#fac090'},
                                                    styles.br, 
                                                    styles.bb
                                                ]}
                                            >
                                                <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                    {singleItem?.value}
                                                </Text>
                                            </View>
                                        ))
                                        :
                                        (
                                        <View 
                                            style={[
                                                {padding: 4, width: 120, justifyContent: 'center'}, 
                                                (item?.checkmark==='flexWidth') && {width: 320},
                                                styles.br, 
                                                styles.bb
                                            ]}
                                        >
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {item.value}
                                            </Text>
                                        </View>
                                        )
                                    }
                                </View>
                                ))
                            }
                        </View>
                        <View style={[styles.sectionHeader, {height: '4%', borderLeftWidth: 1, borderRight: 0, borderTop: 0, borderBottom: 0, paddingTop: 12}]}>
                            <Text style={[styles.title, {textDecoration: 'none', padding: 0}]}> Past Employment/Business Details </Text>
                        </View>
                        <View style={[{flexDirection: 'row'}, styles.bt, styles.bb, styles.br]}>
                            {
                                [
                                    {label: 'Employer/Business Name', value: 'NA'},
                                    {label: 'Designation', value: 'NA'},
                                    {label: 'From', value: 'NA'},
                                    {label: 'To', value: 'NA'},
                                    {label: 'Reason for Movement', value: 'NA'},
                                    {label: 'Contact Person Name & Number', value: 'NA'},
                                ].map((item, idx)=> (
                                    <View key={idx} style={[{flexDirection: 'column', width: '20%'}, styles.bl]}>
                                        <View style={[{padding: 4, backgroundColor: '#B7B7B7', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', height: 32}, styles.bb]}>
                                            <Text style={styles.text}>{item.label}</Text>
                                        </View>
                                        <View style={{padding: 8, width: 100}}>
                                            <Text style={styles.text}> {item.value} </Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={[styles.sectionHeader, {height: '4%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                            <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Business Income Computation {`(Monthly Basis)`} </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[{flexDirection: 'row'}]}>
                            {
                                [
                                    {label: 'Revenue', value: ['Sale', 'Receipts', 'Total Annual Revenue (A)']},
                                    {label: 'Amount (in Rs.)', value: [values?.sales_receipt, 0, totalAnnualRev]},
                                ].map((item, idx)=> (
                                    <View key={idx} style={[{flexDirection: 'column'}, styles.bt]}>
                                        <View style={[{justifyContent: 'center', padding: 4}, styles.bl]}>
                                            <Text style={[styles.text, {fontFamily: 'Open Sans', fontWeight: 'medium'}]}>{item.label}</Text>
                                        </View>
                                        <View style={{flexDirection: 'column'}}>
                                        {
                                            item?.value?.map((singleItem, idx)=> (
                                                <View 
                                                    key={idx}
                                                    style={[
                                                        {padding: 4, fontFamily: 'Open Sans'},
                                                        (item?.label!=="Amount (in Rs.)") && {fontWeight: 'bold'},
                                                        (singleItem==="Total Annual Revenue (A)" || singleItem > 0) && styles.bb,  
                                                        styles.bt, styles.bl
                                                    ]}
                                                >
                                                    <Text style={styles.text}> {singleItem} </Text>
                                                </View>
                                            ))
                                        }
                                        </View>
                                    </View>
                                ))
                            }
                            </View>
                            <View style={[{flexDirection: 'row'}, styles.br]}>
                            {
                                [
                                    {
                                        label: 'Expenditure', 
                                        value: ['Purchases', 'Shop Rent', 'Employees Salary', 'Utility Expenses(Gas/Elec.)', 
                                        'Conveyance/Petrol', 'Other expenses', 'Total Monthly Expenses (B)'
                                        ]
                                    },
                                    {   
                                        label: 'Amount (in Rs.)', 
                                        value: [values?.purchases, values?.shopRent, values?.salaries, values?.electricity, 
                                        values?.petrol_expenses, values?.misc_exps, totalMonthlyExp
                                        ]
                                    },
                                ].map((item, idx)=> (
                                    <View key={idx} style={[{flexDirection: 'column'}, styles.bt]}>
                                        <View style={[{justifyContent: 'center', padding: 4}, styles.bl]}>
                                            <Text style={[styles.text, {fontFamily: 'Open Sans', fontWeight: 'medium'}]}>{item.label}</Text>
                                        </View>
                                        <View style={{flexDirection: 'column'}}>
                                        {
                                            item?.value?.map((singleItem, idx)=> (
                                                <View
                                                    key={idx} 
                                                    style={[
                                                        {padding: 4, fontFamily: 'Open Sans'},
                                                        //(item?.label!=="Amount (in Rs.)") && {fontWeight: 'bold'},
                                                        (singleItem==="Total Monthly Expenses (B)" || singleItem > 0) && styles.bb,  
                                                        styles.bt, styles.bl
                                                    ]}
                                                >
                                                    <Text style={[styles.text, item?.value[6] && {fontWeight: 'bold'}]}> {singleItem} </Text>
                                                </View>
                                            ))
                                        }
                                        </View>
                                    </View>
                                ))
                            }
                            </View>
                        </View>
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl]}>
                        {
                            [
                                {label: 'Net Annual Profit (=A-B)', value: netAnnualProfit},
                                {label: 'Net Monthly Profit (=A-B)', value: netMonthlyProfit}
                            ].map((item, idx)=> (
                                <View key={idx} 
                                    style={[
                                        {flexDirection: 'row', alignItems: 'center', backgroundColor: '#B7B7B7'},
                                        styles.bt, styles.br, styles.bb,
                                        {width: '40%'}
                                    ]}
                                >
                                    <View style={{padding: 4, width: '130%'}}>
                                        <Text style={[styles.text, {fontWeight: 'bold', fontFamily: 'Open Sans'}]}> {item.label} </Text>
                                    </View>
                                    <View style={[styles.bl, {padding: 4,justifyContent: 'center', width: '70%'}]}>
                                        <Text style={[styles.text, {fontWeight: 'bold', fontFamily: 'Open Sans'}]}> {item.value} </Text> 
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View style={[styles.sectionHeader, {height: '4%', borderLeftWidth: 1, borderRight: 0, borderTop: 0, borderBottom: 0, paddingTop: 12}]}>
                        <Text style={[styles.title, {textDecoration: 'none', padding: 0}]}> Other Monthly Income </Text>
                    </View>
                    <View style={[{flexDirection: 'column', width: '80%'}, styles.bt, styles.bl]}>
                        {
                            [
                                {label: 'Rental Income', value: [{label: 'Cash Amount: ', value: 0}, {label: 'Cheque Amount: ', value: 0}]},
                                {label: 'Incentives/Perks', value: [{label: 'Cash Amount: ', value: 0}, {label: 'Cheque Amount: ', value: 0}]},
                                {label: 'Monthly Bonus', value: [{label: 'Cash Amount: ', value: 0}, {label: 'Cheque Amount: ', value: 0}]},
                            ].map((item, idx)=> (
                                <View key={idx} style={[{flexDirection: 'row'}, item.label!=='Monthly Bonus' && styles.bb]}>
                                    <View style={[{padding: 4, backgroundColor: '#B7B7B7', width: '30%'}, styles.br]}>
                                        <Text style={styles.text}> {item.label} </Text>
                                    </View>  
                                    {
                                        item.value?.map((singleItem, idx)=> (
                                            <View key={idx} style={[{flexDirection: 'row', padding: 4, alignItems: 'center', width: '50%'}, styles.br]}>
                                                <Text style={styles.text}> {singleItem.label} </Text>
                                                <Text style={[styles.text, {marginLeft: 4}]}> {singleItem.value} </Text>
                                            </View>
                                        ))
                                    }  
                                </View>
                            ))
                        }
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl]}>
                        {
                            [
                                {label: 'Others, please specify source type', value: 'NA'},
                                {
                                    label: 'Monthly Income', 
                                    value: [{label: 'Cash Amount: ', value: 0}, {label: 'Cheque Amount: ', value: 0}]
                                }
                            ].map((item, idx)=> (
                                <View key={idx} style={[{flexDirection: 'row'}, styles.bb, styles.bt]}>
                                    <View style={[{padding: 4, backgroundColor: '#B7B7B7', justifyContent: 'center'}, styles.br, item.label==="Monthly Income" ? {width: 87} : {width: 104}]}>
                                        <Text style={styles.text}> {item.label} </Text>
                                    </View>
                                    {
                                        item?.value?.constructor===Array ? item?.value?.map((singleItem, idx)=> (
                                            <View key={idx} style={[{flexDirection: 'row', padding: 4, alignItems: 'center', width: 120}, styles.br]}>
                                                <Text style={styles.text}> {singleItem.label} </Text>
                                                <Text style={[styles.text, {fontSize: 8}]}> {singleItem.value} </Text>
                                            </View>
                                        ))
                                        :
                                        (
                                            <View style={{width: 85, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                <Text style={styles.text}> {item.value} </Text>
                                            </View>
                                        )
                                    }
                                </View>
                            ))
                        }
                    </View>
                    <View style={[styles.sectionHeader, {height: '4%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                        <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Existing or Past Loan Details </Text>
                    </View>
                    <View style={[{flexDirection: 'row', marginTop: 8}, styles.bt, styles.bb, styles.br]}>
                        {
                            [
                                {label: 'Loan Type', value: values?.loan_type},
                                {label: 'Lending Institution Name', value: values?.existing_bank},
                                {label: 'Loan Amount (in Rs.)', value: values?.loan_amt},
                                {label: 'Tenure Remaining', value: values?.remainingPastLoanTenure},
                                {label: 'EMI', value: values?.emi},
                            ].map((item, idx)=> (
                                <View key={idx} style={[{flexDirection: 'column', width: '20%'}, styles.bl]}>
                                    <View style={[{padding: 4, backgroundColor: '#B7B7B7', alignItems: 'center', justifyContent: 'center', width: '100%', height: 32}, styles.bb]}>
                                        <Text style={[styles.text, {fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'medium'}]}>{item.label}</Text>
                                    </View>
                                    <View style={{padding: 8, width: 100}}>
                                        <Text style={styles.text}> {item.value} </Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View style={[styles.sectionHeader, {height: '4%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                        <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Loan Details </Text>
                    </View>
                    <View style={[{flexDirection: 'row'}, styles.bl, styles.bt]}>
                        <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 127, justifyContent: 'center'}, styles.br]}>
                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                Purpose of Loan
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column', flexGrow: 1}}>
                            <View style={{flexDirection: 'row', flexGrow: 1}}>
                                {
                                    applicationProfileArr[0]?.loanPurpose?.slice(0,5)?.map((item, idx)=> (
                                        <View key={idx}
                                            style={[
                                                styles.br, 
                                                styles.bb, 
                                                (values?.ownedAssets?.includes(item?.value)) && {backgroundColor: '#fac090'},
                                                {width: 84, padding: 2, flexGrow: 1}
                                            ]}
                                        >
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'normal'}}> {item.value} </Text>
                                        </View>  
                                    ))
                                }
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {
                                    applicationProfileArr[0]?.loanPurpose?.slice(5)?.map((item, idx)=> (    
                                        <View key={idx}
                                            style={[
                                                styles.br, 
                                                //styles.bb, 
                                                (values?.ownedAssets?.includes(item?.value)) && {backgroundColor: '#fac090'},
                                                {width: 87, padding: 2}
                                            ]}
                                        >
                                            <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'normal'}}> {item.value} </Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                    <View style={[{flexDirection: 'column'}, styles.bl]}>
                        {
                            [
                                {label: 'Minimum Loan Amount Required', value: `${values?.loan_amt_req} Lakh`},
                                {label: 'Tenure Required', value: `${values?.loan_tenure_req} Month`},
                                {label: 'Monthly Household Expenses', value: `${values?.monthlyHouseExpenses}`},
                                {label: 'Comfortable EMI', value: values?.emi},
                                {label: 'Status of Property to be Purchased', value: applicationProfileArr[0]?.propToPurchaseStatus},
                                {label: 'Usage of Property after Purchase', value: applicationProfileArr[0]?.usageOfPurchasedProp},
                            ].map((item, idx)=> (
                                <View key={idx} style={{flexDirection: 'row'}}>
                                    <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 127, justifyContent: 'center'}, styles.br, styles.bt, styles.bb]}>
                                        <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                            {item.label}
                                        </Text>
                                    </View>
                                    {
                                        item?.value?.constructor===Array ? item?.value?.map((singleItem, idx)=> (
                                            <View 
                                                key={idx} 
                                                style={[
                                                    {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 4, width: 108}, 
                                                    (singleItem?.value===values?.statusOfPropToPurchase) && {backgroundColor: '#fac090'}, 
                                                    (singleItem?.value===values?.propertyUsage) && {backgroundColor: '#fac090'},
                                                    styles.bt, styles.br, styles.bb
                                                ]}
                                            >
                                                <Text style={styles.text}> {singleItem?.value} </Text>
                                            </View>
                                        ))
                                        :
                                        (
                                            <View style={[{alignItems: 'flex-start', justifyContent: 'center', padding: 4, width: 174}, styles.bt, styles.br]}>
                                                <Text style={styles.text}> {item?.value} </Text> 
                                            </View>
                                        )
                                    }
                                </View>
                            ))
                        }
                    </View>
                    <View style={[styles.sectionHeader, {height: '4%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                        <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Cost and Funds Information{' (Loan Details)'} </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.text, {fontWeight: 'bold', fontFamily: 'Open Sans', marginTop: 4}]}> Funds Required </Text>
                            <View style={[{flexDirection: 'column', width: 250, marginTop: 4}, styles.bl, styles.bb]}>
                                {
                                    [
                                        {label: 'Purchase Cost', value: values?.purchase_cost},
                                        {label: 'Construction Estimate', value: values?.construct_estimate},
                                        {label: 'Registration/Stamp Duty Charges', value: values?.reg_charges},
                                        {label: 'Other Expenses', value: values?.other_loan_expenses},
                                        {
                                            label: 'Total Transaction (Total of all the above costs)', 
                                            value: values?.purchase_cost+values?.construct_estimate+values?.reg_charges+values?.other_loan_expenses,
                                            checkmark: 'boldText'
                                        }
                                    ].map((item, idx)=> (
                                        <View key={idx} style={[{flexDirection: 'row'}]}>
                                            <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 127, justifyContent: 'center'}, styles.br, styles.bt]}>
                                                <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                                    {item.label}
                                                </Text>
                                            </View>
                                            <View style={[{alignItems: 'flex-start', justifyContent: 'center', padding: 4, width: 120}, styles.bt, styles.br]}>
                                                <Text 
                                                    style={[
                                                        styles.text, 
                                                        item?.checkmark==="boldText" && {fontFamily: 'Open Sans', fontWeight: 'bold', fontSize: 8}
                                                    ]}
                                                > {item?.value} </Text> 
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.text, {fontWeight: 'bold', fontFamily: 'Open Sans', marginTop: 4}]}> Source of Own Funds {'(OCR)'} </Text>
                            <View style={[{flexDirection: 'column', width: 290, marginTop: 4}, styles.bl, styles.bb]}>
                                {
                                    [
                                        {label: 'Savings', value: values?.own_fund_saving},
                                        {label: 'Family/Friends', value: values?.own_fund_family},
                                        {label: 'Other Loan Taken', value: values?.own_fund_other_loan},
                                        {
                                            label: 'Total Amount Spent (Total of all the above)', 
                                            value: values?.own_fund_saving+values?.own_fund_familyvalues?.own_fund_other_loan
                                        },
                                        {
                                            label: 'Mode of Payment to Seller', 
                                            value: [{label: 'Cash Amount', value: 0},{label: 'Cheque Amount', value: 0}]
                                        },
                                    ].map((item, idx)=> (
                                        <View key={idx} style={[{flexDirection: 'row'}]}>
                                            <View style={[{backgroundColor: '#B7B7B7', padding: 4, width: 127, justifyContent: 'center'}, styles.br, styles.bt]}>
                                                <Text style={{fontSize: 8, fontFamily: 'Open Sans', fontWeight: 'bold'}}> 
                                                    {item.label}
                                                </Text>
                                            </View>
                                            {
                                                item?.value?.constructor===Array ? item?.value?.map((singleItem, idx)=> (
                                                    <View key={idx} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center'}, styles.br, styles.bt]}>
                                                            <Text style={styles.text}> {singleItem?.label} </Text>
                                                            <Text style={[styles.text, {marginLeft: 4}]}> {singleItem?.value} </Text>
                                                        </View>
                                                    </View>
                                                ))
                                                :
                                                (
                                                    <View style={[{alignItems: 'flex-start', justifyContent: 'center', padding: 4, width: 75}, styles.bt, styles.br]}>
                                                        <Text style={styles.text}> {item?.value} </Text> 
                                                    </View>
                                                )
                                            }
                                            
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                    
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                    <View className="Header" style={{paddingVertical: 16}}>
                        <View style={[styles.sectionHeader, {height: '5%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                            <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Other Family Member Details </Text>
                        </View>
                        <View style={[{flexDirection: 'row', marginTop: 8}, styles.bt, styles.bb, styles.br]}>
                            {
                                [
                                    //{label: 'Name', value: 'NA'},
                                    'Name', 
                                    'Gender', 
                                    'Age', 
                                    'Employment Type', 
                                    'Educational Qualification(Also mention if Govt. or Private Institution',
                                    'Contact No.',
                                    'Staying with Applicant'
                                    // {label: 'Gender', value: 'NA'},
                                    // {label: 'Age', value: 'NA'},
                                    // {label: 'Employment Type', value: 'NA'},
                                    // {
                                    //     label: 'Educational Qualification(Also mention if Govt. or Private Institution', 
                                    //     value: 'NA', 
                                    //     checkmark: 'diffWidth'
                                    // },
                                    // {label: 'Contact No.', value: 'NA'},
                                    // {label: 'Staying with Applicant', value: 'No'},
                                ].map((item, idx)=> (
                                    <View key={idx} style={[{flexDirection: 'row'}, styles.bl, item.at(4) ? {width: '30%'} : {width: '20%'}]}>
                                        <View style={[{padding: 4, backgroundColor: '#B7B7B7', alignItems: 'center', justifyContent: 'center', width: '100%', height: 54}, styles.bb]}>
                                            <Text style={[styles.text, {fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'medium'}]}>{item}</Text>
                                        </View>
                                        {/* <View style={{padding: 8, width: 100}}>
                                            <Text style={styles.text}> {item.value} </Text>
                                        </View> */}
                                    </View>
                                ))
                            }
                        </View>
                        <View style={[{flexDirection: 'column', width: '100%'}, styles.bl, styles.bb]}>
                            {
                                values?.familyDetail?.map((item, idx)=> (
                                    <View key={idx} style={{flexDirection: 'row', width: '100%'}}>
                                        <View style={{padding: 4, width: '10.5%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                                {item?.name} 
                                            </Text>
                                        </View> 
                                        <View style={{padding: 4, width: '15.8%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                                {item?.gender} 
                                            </Text>
                                        </View>
                                        <View style={{padding: 4, width: '10.5%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                                {item?.age} 
                                            </Text>
                                        </View>
                                        <View style={{padding: 4, width: '15.8%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                                {item?.employmentType} 
                                            </Text>
                                        </View>
                                        <View style={{padding: 4, width: '15.8%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                                {item?.education} 
                                            </Text>
                                        </View>
                                        <View style={{padding: 4, width: '15.8%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                                {item?.contact} 
                                            </Text>
                                        </View>
                                        <View style={{padding: 4, width: '15.8%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
                                            <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'normal'}}> 
                                                {item?.stayingTogether} 
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={[styles.sectionHeader, {height: '5%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                            <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> References {'(Business Parties)'} </Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12}}>
                            {
                                values?.businessRefs.map((item, idx)=> (
                                    <View key={idx} style={[{flexDirection: 'column'}, styles.bl, styles.bt]}>
                                        <View style={[{flexDirection: 'row', justifyContent: 'space-between', padding: 4}, styles.br, styles.bb]}>
                                            <Text style={{fontWeight: 'bold', fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {/* {item?.headingLabel}  */}
                                                Reference
                                            </Text>
                                            {/* <View style={[styles.bl, {width: 1, height: 12, backgroundColor: '#000'}]}/> */}
                                            <Text style={{fontWeight: 'bold', fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {/* {item?.headingImageLabel}  */}
                                                Photo with Applicant
                                            </Text>
                                        </View>
                                        <View style={[{flexDirection: 'column'}, styles.br, styles.bb]}>
                                            {/* {
                                                item?.map((singleItem, idx)=> ( */}
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 140, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Name </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.name} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 140, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Address </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.address} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 140, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Relationship </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.relationship} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 140, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Contact </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.contact} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 140, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Email </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.email} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 140, backgroundColor: '#B7B7B7'}]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> No. of years known the applicant </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.knowingTime} Years </Text>
                                                        </View>
                                                    </View>
                                                {/* ))
                                            }  */}
                                            {/* {
                                                item?.values?.map((singleValue, idx)=> (
                                                    <View key={idx} style={{padding: 4, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                        <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {singleValue} </Text>
                                                    </View>
                                                ))
                                            } */}
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={[styles.sectionHeader, {height: '5%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                            <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> Business Firm Check {'(From Neighbour)'} </Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12}}>
                            {
                                values?.neighbourRefs.map((item, idx)=> (
                                    <View key={idx} style={[{flexDirection: 'column'}, styles.bl, styles.bt]}>
                                        <View style={[{flexDirection: 'row', justifyContent: 'space-between', padding: 4, width: 210}, styles.br, styles.bb]}>
                                            <Text style={{fontWeight: 'bold', fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {/* {item?.headingLabel}  */}
                                                Reference
                                            </Text>
                                            {/* <View style={[styles.bl, {width: 1, height: 12, backgroundColor: '#000'}]}/> */}
                                            <Text style={{fontWeight: 'bold', fontSize: 8, fontFamily: 'Open Sans'}}> 
                                                {/* {item?.headingImageLabel}  */}
                                                Business Card Collected
                                            </Text>
                                        </View>
                                        <View style={[{flexDirection: 'column'}, styles.br, styles.bb]}>
                                            {/* {
                                                item?.map((singleItem, idx)=> ( */}
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 125, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Name of the Person </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.name} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 125, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Name of Business Firm </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.businessFirmName} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 125, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Address </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.address} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 125, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> No. of Years know the firm </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.knowingTime} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 125, backgroundColor: '#B7B7B7'}, styles.bb]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Contact Number </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bb, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.contact} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 125, backgroundColor: '#B7B7B7'}]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Feedback about the Applicant/Firm </Text>
                                                        </View>
                                                        <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 84}, styles.bl]}>
                                                            <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {item?.feedbackAboutApplicant} </Text>
                                                        </View>
                                                    </View>
                                                {/* ))
                                            }  */}
                                            {/* {
                                                item?.values?.map((singleValue, idx)=> (
                                                    <View key={idx} style={{padding: 4, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                        <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> {singleValue} </Text>
                                                    </View>
                                                ))
                                            } */}
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={[styles.sectionHeader, {height: '5%', borderWidth: 0, backgroundColor: '#B7B7B7', marginTop: 16, justifyContent: 'center'}]}>
                            <Text style={[styles.title, {textDecoration: 'none', alignSelf: 'center', padding: 4}]}> To be filled by PD Officer </Text>
                        </View>
                        <View style={[{flexDirection: 'row'}, styles.bl, styles.bt]}>
                            <View style={{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 150, backgroundColor: '#B7B7B7'}}>
                                <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Brief Comments/Observations of the case </Text>
                            </View>
                            <View style={[{padding: 8, alignItems: 'flex-start', width: '98%'}, styles.bl, styles.br]}>
                                <Text style={styles.text}> 
                                    Client {values?.name} had applied for {values?.loan_type} of Rs. {values?.loan_amt_req} Lakh. During visit, client provided address at {values?.visitDate_business_setup} met self who confirmed all the details. Applicant and his family are
                                    residing in {values?.parentsResidenceType} from last 1.5 years and stay in city since 3.5 years. There are {values?.noOfChildren + values?.noOfAdults} and working member Self. Neighbour check is ok, confirmed from nearby. Client is running {values?.business_type}
                                    and sale in the name of {values?.visitDate_business_setup?.split(',')[0]} from last {values?.business_time} total experience running since {values?.previousWorkExperience}. Client is running
                                    their business in {values?.businessPremiseType==="Others" ? "rented" : values?.businessPremiseType} premises and business built in area of {values?.officeArea} sq.ft. {(values?.employeeCount > 0 && (values?.employeeCount===1 ? `There is ${values?.employeeCount} working and ` : `There are ${values?.employeeCount} working and `))} sign board available. During visit to their address found their living working status is average. Case
                                    is {values?.pd_status}.
                                </Text>
                            </View>
                        </View>
                        <View style={[{flexDirection: 'row'}, styles.bl, styles.bt, styles.br, styles.bb]}>
                            <View style={{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 119.5, backgroundColor: '#B7B7B7'}}>
                                <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Name of PD Officer </Text>
                            </View>
                            <View style={[{padding: 4, alignItems: 'flex-start'}, styles.bl]}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> Anshuman Nagpal </Text>
                            </View>
                        </View>
                        <View style={[{flexDirection: 'row'}, styles.bl, styles.bb, styles.br]}>
                            <View style={{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 119.5, backgroundColor: '#B7B7B7'}}>
                                <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Date of Discussion </Text>
                            </View>
                            <View style={[{padding: 4, alignItems: 'flex-start', width: 100}, styles.bl, styles.br]}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}> {values?.discussionDate?.split('-').reverse().join('-')} </Text>
                            </View>
                            <View style={[{padding: 4, alignItems: 'flex-start', justifyContent: 'center', width: 120, backgroundColor: '#B7B7B7'}, styles.br]}>
                                <Text style={{fontFamily: 'Open Sans', fontSize: 8, fontWeight: 'bold'}}> Signature of PD Officer </Text>
                            </View>
                            <View style={{padding: 4, alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 10, fontFamily: 'Open Sans', fontWeight: 'bold'}}>  </Text>
                            </View>
                        </View>
                        {/* Disclaimer shifted to next page */}
                    </View>
                </Page>
                <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                    <View className="Header" style={{paddingVertical: 16}}>
                    <View style={{marginTop: 24, flexDirection: 'column'}}>
                        <Text style={[styles.text, {fontFamily: 'Open Sans', fontWeight: 'bold'}]}> Disclaimer Clause: </Text>
                        <Text style={{fontStyle: 'italic', fontSize: 9, fontWeight: 'normal', marginTop: 8}}> This report has been prepared on the basis of information provided and discussions by the person contacted. India Infoline Housing Finance Ltd will be solely responsible for any actions taken on this report and any liabilities directly or indirectly accruing from such actions.  will not be held liable in any case. </Text>
                    </View>
                        {/* Images to be added now... */}
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
                            <View key={idx} style={{ padding: 48 }}>
                                <Image style={{ width: 150, height: 64 }} source={{ uri: item }} />
                            </View>
                        ))}
                    </View>
                </Page>
                {/* <Page size="A4" style={{ paddingRight: 16, paddingLeft: 16 }} wrap>
                    <View className="Header" style={{paddingVertical: 16}}> */}
                        
                    {/* </View>
                </Page> */}
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
    bt: {
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    br: {
        borderRightWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    bl: {
        borderLeftWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    bb: {
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    bw: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    section: {
        paddingVertical: 8,
        //width: 84,
        paddingLeft: 12,
        paddingRight: 24,
        //flexGrow: 1,
        
        borderRightWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        //borderLeftWidth: 1,
        //borderBottomWidth: 1,
        //borderStyle: "solid",
        //borderColor: "rgba(0,0,0,0.1)",
    },
    text: {
        fontSize: 10,
    },
    title: {
        fontFamily: "Open Sans",
        fontWeight: "600",
        fontSize: 10,
        paddingTop: 16,
        paddingBottom: 4,
        textDecoration: "underline",
        //paddingLeft: 16,
    },
    sectionHeader: {
        width: '100%', 
        height: '5%', 
        borderWidth: 1, 
        borderColor: "rgba(0,0,0,0.1)",
        flexDirection: 'row',
    },
});

export default PDVerifyPDF;