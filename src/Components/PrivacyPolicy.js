import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, Button,StyleSheet } from 'react-native';

const PrivacyPolicy = ({ navigation }) => {
    const [showButton, setShowButton] = useState(false);
  
    const handleScroll = (event) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const reachedEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height;
      setShowButton(reachedEnd);
    };
   
    const handleButtonPress = () => {
        navigation.navigate('Register')
      // Handle button press event here
    };
  
    return (
      <ScrollView onScroll={handleScroll} style={styles.container}>
        <View style={styles.content}> 
       
             <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.section}>Introduction</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis, lectus nec aliquet efficitur, urna velit elementum odio, in molestie neque ex id odio.</Text>
        <Text style={styles.section}>Collection of Information</Text>
        <Text style={styles.text}>Suspendisse molestie massa eu felis ultricies, sed gravida nibh ultricies. Etiam feugiat sapien at eros efficitur, in molestie velit mollis. Proin eu nisl at mi commodo fringilla sed nec elit.</Text>
        <Text style={styles.section}>Use of Information</Text>
        <Text style={styles.text}>Nulla commodo lectus quis orci molestie, vitae tincidunt massa pretium. Morbi sodales eu eros in tincidunt. Curabitur in dolor in risus cursus auctor.</Text>
        <Text style={styles.section}>Contact Us</Text>
        <Text style={styles.text}>If you have any questions about this Privacy Policy, please contact us at privacy@yourcompany.com</Text>
   
          <Button title="ยอมรับเงื่อนไข" style={{ backgroundColor: '#11690d', flex: 0.05 }} onPress={handleButtonPress} />
        </View>
      </ScrollView>
    );
  };
  
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    content: {
      paddingBottom: 50,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    section: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      marginBottom: 20,
    },
  });
  
export default PrivacyPolicy
