import StorageService from "@/services/StorageService";
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";


interface MealPlanContextType{
    meals: Meal[];
    loading: boolean;
    error: string | null;
    adMeal: (meal: Meal) => void;
    updateMeal: (meal: Meal) => void;
    deleteMeal: (mealId: string) => void;
}

interface FoodItem{
    id:string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    category: string;

}

interface Meal{
    id: string;
    title: string;
    time: string;
    food?: FoodItem;
    hasFood: boolean;

}


interface NutitionalData{
    calories: number;
    protien: number;
    carbs: number;
    fat: number;

}


