import { CustomBottomNav, Nav_Items } from '@/components/ui/CustomNavigationBar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './index';





export default function TabLayout() {
  const [activeTab, setActiveTab] = useState('home');


  const handleTabPrss = (tabId: string) => {
    setActiveTab(tabId);
  }

  const renderScreen = () => {
    switch(activeTab){
      case 'home':
        return <HomeScreen />;
      case 'meals':
        return <View><Text>Meals</Text></View>
      case 'profile':
        return <View><Text>Profile</Text></View>
      case 'settings':
        return <View><Text>Settings</Text></View>      
      default:
        return <HomeScreen />  
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <CustomBottomNav items={Nav_Items} activeTab={activeTab} onTabPress={handleTabPrss} />

     
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#E0F2FE'

  },

  content: {
    flex:1,

  },
})
