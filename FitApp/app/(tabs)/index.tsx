import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = {
  onNavigate?: (tab: string) => void;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [selectedView, setSelectedView] = useState<'Daily' | 'Weekly'>('Daily');

  /* ------------------ Meal Card ------------------ */
  const MealCard = ({ meal }: { meal: any }) => (
    <View style={{ padding: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text>{meal.title}</Text>
          <Text>{meal.time}</Text>
        </View>

        {meal.hasFood ? (
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={20} color="#999" />
        )}
      </View>

      {meal.food && <Text>{meal.food.name}</Text>}
    </View>
  );

  /* ------------------ Metric Card ------------------ */
  const MetricCard = ({
    icon,
    color,
    title,
    value,
    target,
  }: {
    icon: string;
    color: string;
    title: string;
    value: number;
    target: number;
  }) => {
    const percentage =
      target > 0 ? Math.min((value / target) * 100, 100) : 100;

    const isOverTarget = value > target;

    return (
      <View style={{ padding: 12, backgroundColor: color, borderRadius: 8 }}>
        <Ionicons name={icon as any} size={20} color="white" />
        <Text style={{ color: 'white' }}>{title}</Text>

        <Text style={{ color: 'white' }}>
          {value}/{target} {title === 'Calorie' ? 'kcal' : 'g'}
        </Text>

        <View style={{ height: 6, backgroundColor: '#ddd', marginTop: 6 }}>
          <View
            style={{
              width: `${percentage}%`,
              height: 6,
              backgroundColor: isOverTarget ? '#4682B4' : '#7EC8E3',
            }}
          />
        </View>

        <Text style={{ color: 'white' }}>
          {percentage.toFixed(0)}%
        </Text>
      </View>
    );
  };

  /* ------------------ Sample Data ------------------ */
  const metrics = [
    { icon: 'flame', color: '#4FC3F7', title: 'Calorie', value: 1200, target: 2000 },
    { icon: 'barbell', color: '#87CEEB', title: 'Protein', value: 80, target: 150 },
    { icon: 'leaf', color: '#5DADE2', title: 'Carbs', value: 150, target: 250 },
    { icon: 'water', color: '#00BFFF', title: 'Fat', value: 40, target: 65 },
  ];

  const meals = [
    { title: 'Breakfast', time: '8:00 AM', hasFood: true, food: { name: 'Oatmeal with fruits' } },
    { title: 'Lunch', time: '12:30 PM', hasFood: true, food: { name: 'Grilled chicken salad' } },
    { title: 'Dinner', time: '7:00 PM', hasFood: false, food: null },
    { title: 'Snacks', time: '3:00 PM', hasFood: true, food: { name: 'Protein shake' } },
  ];

  /* ------------------ UI ------------------ */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E0F2FE' }}>
      <ScrollView>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={{ fontSize: 14, color: '#666' }}>JULY 14, 2025</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </View>

          <TouchableOpacity onPress={() => onNavigate?.('Profile')}>
            <Ionicons name="person-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Daily/Weekly Toggle */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => setSelectedView('Daily')}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              backgroundColor: selectedView === 'Daily' ? '#87CEEB' : '#fff',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: selectedView === 'Daily' ? '#fff' : '#666', fontWeight: '600' }}>
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedView('Weekly')}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              backgroundColor: selectedView === 'Weekly' ? '#87CEEB' : '#fff',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: selectedView === 'Weekly' ? '#fff' : '#666', fontWeight: '600' }}>
              Weekly
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text></Text>
          <Text style={{fontSize: 30, textAlign: 'center' }}>Are You Eating</Text>
          <Text style={{fontSize: 80, textAlign: 'center', color: '#0cff08ff', fontWeight: 700}}>Healthy</Text>
        </View>

        {/* Metrics Grid */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#333' }}>
            Today's Progress
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {metrics.map((metric, index) => (
              <View key={index} style={{ width: '47%' }}>
                <MetricCard
                  icon={metric.icon}
                  color={metric.color}
                  title={metric.title}
                  value={metric.value}
                  target={metric.target}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Meals Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#333' }}>
            Meals
          </Text>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            {meals.map((meal, index) => (
              <View key={index}>
                <MealCard meal={meal} />
                {index < meals.length - 1 && (
                  <View style={{ height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 12 }} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;