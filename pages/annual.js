import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {DateTimePicker} from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const annual = () => {
  const [ThroidDate, setThroidDate] = useState(new Date());
  const [AdrenalDate, setAdrenalDate] = useState(new Date());
  const [CeliacDate, setCeliacDate] = useState(new Date());
  const [RenalDate, setRenalDate] = useState(new Date());
  const [LipidsDate, setLipidsDate] = useState(new Date());
  const [BPDate, setBPDate] = useState(new Date());
  const [EyesDate, setEyesDate] = useState(new Date());
  const [LastFluVaccineDate, setLastFluVaccineDate] = useState(new Date());
  const [LastDentalVisitDate, setLastDentalVisitDate] = useState(new Date());

  const [mode, setMode] = useState('date');

  const [showThroid, setShowThroid] = useState(false);
  const [showAdrenal, setShowAdrenal] = useState(false);
  const [showCeliac, setShowCeliac] = useState(false);
  const [showRenal, setShowRenal] = useState(false);
  const [showLipids, setShowLipids] = useState(false);
  const [showBP, setShowBP] = useState(false);
  const [showEye, setShowEyes] = useState(false);
  const [showlFV, setShowLFV] = useState(false);
  const [showLDV, setShowLDV] = useState(false);

  var thDate = moment.utc(ThroidDate).format('DD-MM-YYYY');
  var adDate = moment.utc(AdrenalDate).format('DD-MM-YYYY');
  var ceDate = moment.utc(CeliacDate).format('DD-MM-YYYY');
  var reDate = moment.utc(RenalDate).format('DD-MM-YYYY');
  var liDate = moment.utc(LipidsDate).format('DD-MM-YYYY');
  var bpDate = moment.utc(BPDate).format('DD-MM-YYYY');
  var eyeDate = moment.utc(EyesDate).format('DD-MM-YYYY');
  var lfvDate = moment.utc(LastFluVaccineDate).format('DD-MM-YYYY');
  var ldvate = moment.utc(LastDentalVisitDate).format('DD-MM-YYYY');

  const onChange = (event, selectedDate) => {
    const thyroid_date = selectedDate || ThroidDate;
    setShowThroid(Platform.OS === 'ios');
    setThroidDate(thyroid_date);
  };
  const onChange2 = (event, selectedDate) => {
    const adrenal_date = selectedDate || AdrenalDate;
    setShowAdrenal(Platform.OS === 'ios');
    setAdrenalDate(adrenal_date);
  };
  const onChange3 = (event, selectedDate) => {
    const celiac_date = selectedDate || CeliacDate;
    setShowCeliac(Platform.OS === 'ios');
    setCeliacDate(celiac_date);
  };
  const onChange4 = (event, selectedDate) => {
    const Renal_Date = selectedDate || RenalDate;
    setShowRenal(Platform.OS === 'ios');
    setRenalDate(Renal_Date);
  };
  const onChange5 = (event, selectedDate) => {
    const Lipids_Date = selectedDate || LipidsDate;
    setShowLipids(Platform.OS === 'ios');
    setLipidsDate(Lipids_Date);
  };
  const onChange6 = (event, selectedDate) => {
    const BP_Date = selectedDate || BPDate;
    setShowBP(Platform.OS === 'ios');
    setBPDate(BP_Date);
  };
  const onChange7 = (event, selectedDate) => {
    const Eyes_Date = selectedDate || EyesDate;
    setShowEyes(Platform.OS === 'ios');
    setEyesDate(Eyes_Date);
  };
  const onChange8 = (event, selectedDate) => {
    const LastFluVaccine_Date = selectedDate || LastFluVaccineDate;
    setShowLFV(Platform.OS === 'ios');
    setLastFluVaccineDate(LastFluVaccine_Date);
  };
  const onChange9 = (event, selectedDate) => {
    const LastDentalVisit_Date = selectedDate || LastDentalVisitDate;
    setShowLDV(Platform.OS === 'ios');
    setLastDentalVisitDate(LastDentalVisit_Date);
  };
  const showThroidMode = (currentMode) => {
    setShowThroid(true);
    setMode(currentMode);
  };

  const showAdrenalMode = (currentMode) => {
    setShowAdrenal(true);
    setMode(currentMode);
  };

  const showCeliacMode = (currentMode) => {
    setShowCeliac(true);
    setMode(currentMode);
  };

  const showRenalMode = (currentMode) => {
    setShowRenal(true);
    setMode(currentMode);
  };
  const showLipidsMode = (currentMode) => {
    setShowLipids(true);
    setMode(currentMode);
  };

  const showBPMode = (currentMode) => {
    setShowBP(true);
    setMode(currentMode);
  };
  const showEyeMode = (currentMode) => {
    setShowEyes(true);
    setMode(currentMode);
  };
  const showlFVMode = (currentMode) => {
    setShowLFV(true);
    setMode(currentMode);
  };
  const showLDVMode = (currentMode) => {
    setShowLDV(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showThroid('Year');
  };

  const showDatePicker2 = () => {
    showAdrenal('Year');
  };
  const showDatePicker3 = () => {
    showCeliac('Year');
  };
  const showDatePicker4 = () => {
    showRenal('Year');
  };
  const showDatePicker5 = () => {
    showLipids('Year');
  };
  const showDatePicker6 = () => {
    showBP('Year');
  };
  const showDatePicker7 = () => {
    showEye('Year');
  };
  const showDatePicker8 = () => {
    showlFV('Year');
  };
  const showDatePicker9 = () => {
    showLDV('Year');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E7EFFA', '#E7EFFA', '#AABED8']}
        style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./images/logo.png')}
            
            resizeMode="stretch"
          />
        </View>
      </LinearGradient>
      <ScrollView style={styles.contView}>
        <View>
          <Text style={styles.Annual}>Annual screening test</Text>
          <View>
            <Text style={styles.internalText}>Throid</Text>
            <View style={styles.action}>
              <Text style={styles.text_footer}>Date of Throid:</Text>
              <View style={styles.dateB}>
                <TouchableOpacity onPress={showDatePicker} style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#8CA1BB" />
                  <Text testID="dateOfThroid" style={styles.text_footerD}>
                    {moment.utc('thDate').format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showThroid && (
                <DateTimePicker
                  testID="showDatePicker"
                  value={ThroidDate}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Anti TPO</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="000.00"
                style={styles.inputT}></TextInput>
              <Text style={{fontSize: 15, paddingTop: 15}}>IU/ml </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>TSH</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="00.00"
                style={styles.inputT}></TextInput>
              <Text style={{fontSize: 15, paddingTop: 15}}> mIU/L</Text>
            </View>
            <View>
              <Text style={styles.inpTxt}>FT4</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="00.00"
                style={styles.inputT}></TextInput>
              <Text style={{fontSize: 15, paddingTop: 15}}> pmol/L </Text>
            </View>
          </View>
          <Text>
            ------------------------------------------------------------------------------------------
          </Text>
          <View>
            <Text style={styles.internalText}>Adrenal</Text>
            <View style={styles.action}>
              <Text style={styles.text_footer}>Date of Adrenal:</Text>
              <View style={styles.dateB}>
                <TouchableOpacity
                  onPress={showDatePicker2}
                  style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#8CA1BB" />
                  <Text testID="dateOfAdrenal" style={styles.text_footerD}>
                    {moment.utc('adDate').format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showAdrenal && (
                <DateTimePicker
                  testID="showDatePicker2"
                  value={AdrenalDate}
                  mode={mode}
                  display="default"
                  onChange={onChange2}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Morning cortisol</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="000.00"
                style={styles.inputT}></TextInput>
              <Text style={{fontSize: 15, paddingTop: 15}}>nmol/L </Text>
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>Na </Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="000.00"
                style={styles.inputT}></TextInput>
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L</Text>
            </View>
            <View>
              <Text style={styles.inpTxt}>K</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="0.00"
                style={styles.inputT}></TextInput>
              <Text style={{fontSize: 15, paddingTop: 15}}> mmol/L </Text>
            </View>
            <Text>
              ------------------------------------------------------------------------------------------
            </Text>
            <View>
              <Text style={styles.internalText}>Celiac</Text>
              <Text style={styles.inpTxt}>Date</Text>
              <View style={styles.action}>
                <Text style={styles.text_footer}>Date of Celiac:</Text>
                <View style={styles.dateB}>
                  <TouchableOpacity
                    onPress={showDatePicker3}
                    style={styles.dateB}>
                    <MaterialIcons
                      name="date-range"
                      size={30}
                      color="#8CA1BB"
                    />
                    <Text testID="dateOfCeliac" style={styles.text_footerD}>
                      {moment.utc('ceDate').format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
                {showCeliac && (
                  <DateTimePicker
                    testID="showDatePicker3"
                    value={CeliacDate}
                    mode={mode}
                    display="default"
                    onChange={onChange3}
                  />
                )}
              </View>
              <View style={styles.vNext}>
                <Text style={styles.inpTxt}>IgA</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="000.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}> gm/L </Text>
              </View>
              <View style={styles.vNext}>
                <Text style={styles.inpTxt}>tTG IgA </Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}> U/ml </Text>
              </View>
              <View>
                <Text style={styles.inpTxt}>tTG IgG </Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}> U/ml </Text>
              </View>
              <View>
                <Text style={styles.inpTxt}>Deamidated gliadin IgA </Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}> U/ml </Text>
              </View>
              <View>
                <Text style={styles.inpTxt}>Deamidated gliadin IgG </Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}> U/ml </Text>
              </View>
            </View>
            <Text>
              ------------------------------------------------------------------------------------------
            </Text>
          </View>
          <View>
            <Text style={styles.internalText}>Renal</Text>
            <View style={styles.action}>
              <Text style={styles.text_footer}>Date of Renal:</Text>
              <View style={styles.dateB}>
                <TouchableOpacity
                  onPress={showDatePicker4}
                  style={styles.dateB}>
                  <MaterialIcons name="date-range" size={30} color="#8CA1BB" />
                  <Text testID="dateOfRenal" style={styles.text_footerD}>
                    {moment.utc('reDate').format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
              </View>
              {showRenal && (
                <DateTimePicker
                  testID="showDatePicker4"
                  value={RenalDate}
                  mode={mode}
                  display="default"
                  onChange={onChange4}
                />
              )}
            </View>
            <View style={styles.vNext}>
              <Text style={styles.inpTxt}>ACR</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="00.00"
                style={styles.inputT}></TextInput>
              <Text style={{fontSize: 15, paddingTop: 15}}>mg/g </Text>
            </View>
            <Text>
              ------------------------------------------------------------------------------------------
            </Text>
            <View>
              <Text style={styles.internalText}>Lipids</Text>
              <View style={styles.action}>
                <Text style={styles.text_footer}>Date of Lipids:</Text>
                <View style={styles.dateB}>
                  <TouchableOpacity
                    onPress={showDatePicker5}
                    style={styles.dateB}>
                    <MaterialIcons
                      name="date-range"
                      size={30}
                      color="#8CA1BB"
                    />
                    <Text testID="dateOfLipids" style={styles.text_footerD}>
                      {moment.utc('liDate').format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>
                {showLipids && (
                  <DateTimePicker
                    testID="showDatePicker5"
                    value={LipidsDate}
                    mode={mode}
                    display="default"
                    onChange={onChange5}
                  />
                )}
              </View>
              <View style={styles.vNext}>
                <Text style={styles.inpTxt}>TG</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}>mmol/L </Text>
              </View>
              <View style={styles.vNext}>
                <Text style={styles.inpTxt}>LDL</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}>mmol/L </Text>
              </View>
              <View style={styles.vNext}>
                <Text style={styles.inpTxt}>HDL</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}>mmol/L </Text>
              </View>
              <View style={styles.vNext}>
                <Text style={styles.inpTxt}>Cholesterol</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholder="00.00"
                  style={styles.inputT}></TextInput>
                <Text style={{fontSize: 15, paddingTop: 15}}>mmol/L </Text>
              </View>
              <Text>
                ------------------------------------------------------------------------------------------
              </Text>
              <View>
                <Text style={styles.internalText}>Blood Pressure</Text>
                <View style={styles.action}>
                  <Text style={styles.text_footer}>
                    Date of Blood Pressure:
                  </Text>
                  <View style={styles.dateB}>
                    <TouchableOpacity
                      onPress={showDatePicker6}
                      style={styles.dateB}>
                      <MaterialIcons
                        name="date-range"
                        size={30}
                        color="#8CA1BB"
                      />
                      <Text testID="dateOfBP" style={styles.text_footerD}>
                        {moment.utc('bpDate').format('DD/MM/YYYY')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showBP && (
                    <DateTimePicker
                      testID="showDatePicker6"
                      value={BPDate}
                      mode={mode}
                      display="default"
                      onChange={onChange6}
                    />
                  )}
                </View>
                <View style={styles.vNext}>
                  <Text style={styles.inpTxt}>BP reading</Text>
                  <TextInput
                    keyboardType="decimal-pad"
                    placeholder="000.00"
                    style={styles.inputT}></TextInput>
                  <Text style={{fontSize: 15, paddingTop: 15}}>mmHg </Text>
                </View>
                <Text>
                  ------------------------------------------------------------------------------------------
                </Text>
              </View>
              <View>
                <Text style={styles.internalText}>Eyes</Text>
                <View style={styles.action}>
                  <Text style={styles.text_footer}>Date:</Text>
                  <View style={styles.dateB}>
                    <TouchableOpacity
                      onPress={showDatePicker7}
                      style={styles.dateB}>
                      <MaterialIcons
                        name="date-range"
                        size={30}
                        color="#8CA1BB"
                      />
                      <Text testID="dateOfEye" style={styles.text_footerD}>
                        {moment.utc('eyeDate').format('DD/MM/YYYY')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showEye && (
                    <DateTimePicker
                      testID="showDatePicker7"
                      value={EyesDate}
                      mode={mode}
                      display="default"
                      onChange={onChange7}
                    />
                  )}
                </View>
                <View style={styles.vNext}>
                  <Text style={styles.inpTxt}>Findings</Text>
                  <ModalDropdown
                    style={styles.ddown}
                    options={[
                      'Evidence of retinopathy',
                      'No evidence of retinopathy',
                    ]}
                    defaultValue="----------------"
                  />
                </View>
              </View>
              <Text>
                ------------------------------------------------------------------------------------------
              </Text>
              <View>
                <Text style={styles.internalText}>Last Flu Vaccine</Text>
                <View style={styles.action}>
                  <Text style={styles.text_footer}>
                    Date of last flu vaccine:
                  </Text>
                  <View style={styles.dateB}>
                    <TouchableOpacity
                      onPress={showDatePicker8}
                      style={styles.dateB}>
                      <MaterialIcons
                        name="date-range"
                        size={30}
                        color="#8CA1BB"
                      />
                      <Text testID="dateOfLFV" style={styles.text_footerD}>
                        {moment.utc('lfvDate').format('DD/MM/YYYY')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showlFV && (
                    <DateTimePicker
                      testID="showDatePicker8"
                      value={LastFluVaccineDate}
                      mode={mode}
                      display="default"
                      onChange={onChange8}
                    />
                  )}
                </View>
              </View>
              <Text>
                ------------------------------------------------------------------------------------------
              </Text>
              <View>
                <Text style={styles.internalText}>Last Dental Visit</Text>
                <View style={styles.action}>
                  <Text style={styles.text_footer}>
                    Date of last dental visit:
                  </Text>
                  <View style={styles.dateB}>
                    <TouchableOpacity
                      onPress={showDatePicker9}
                      style={styles.dateB}>
                      <MaterialIcons
                        name="date-range"
                        size={30}
                        color="#8CA1BB"
                      />
                      <Text testID="dateOfLDV" style={styles.text_footerD}>
                        {moment.utc('ldvDate').format('DD/MM/YYYY')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showLDV && (
                    <DateTimePicker
                      testID="showDatePicker9"
                      value={LastDentalVisitDate}
                      mode={mode}
                      display="default"
                      onChange={onChange9}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AABED8',
  },
  text: {
    fontSize: 15,
    fontWeight: '200',
    color: '#415979',
  },
  internalText: {
    color: '#415979',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 15,
    fontWeight: '800',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 17,
  },
  contView: {
    //Conten's view
    backgroundColor: '#fff',
    height: 550,
    width: 360,
    alignSelf: 'center',
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 7,
  },
  Annual: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#415979',
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 15,
  },
  conViews: {
    //Conten's view
    backgroundColor: '#fff',
    height: 230,
    width: 330,
    alignSelf: 'center',
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 7,
  },
  vNext: {
    // to make items next to each other
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 30,
  },
  inpTxt: {
    //lables
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 18,
  },
  inputT: {
    //inputs field

    width: 110,
    fontSize: 16,
    shadowColor: '#000',
    height: 50,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
  },
  ddown: {
    //drop down list style

    paddingLeft: 0,
    paddingTop: 13,
    shadowColor: '#000',

    height: 40,
    width: 160,

    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,

    elevation: 2,
    backgroundColor: '#f5f5f5',
  },
  dateB: {
    flexDirection: 'row',
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CACDD1',
    marginTop: 15,
  },
  action: {
    flex: 0,
    flexWrap: 'wrap',
    marginTop: 10,
    paddingBottom: 25,
  },
  text_footerD: {
    color: '#05375a',
    fontSize: 18,
    paddingLeft: 15,
  },
});
export default annual;
