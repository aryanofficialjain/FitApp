import * as SecureStore from "expo-secure-store";

interface PersonalInfo {
    name: string;
    age: string;
    gender: string;
    weight: string;
    height: string;
    activityLevel: string;
    goal: string;
    dietaryRestrictions: string[];
    allergies: string[];
    targetCalories: string;
}

interface Meal {
    id: string;
    title: string;
    time: string;
    food?: any;
    hasFood: boolean;
}

class StorageService {
    private static instance: StorageService;

    private readonly PERSONAL_INFO_KEY = 'personal_info';
    private readonly MEAL_KEY = 'meals_data';
    private readonly GEMINI_API_KEY = 'gemini_api_key';
    private readonly FIRST_TIME_USER = 'first_time_user';

    private constructor() {}

    static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    /* ================= PERSONAL INFO ================= */

    async savePersonalInfo(personalInfo: PersonalInfo): Promise<void> {
        try {
            await SecureStore.setItemAsync(
                this.PERSONAL_INFO_KEY,
                JSON.stringify(personalInfo)
            );
        } catch (error) {
            console.error('Error saving personal info', error);
        }
    }

    async getPersonalInfo(): Promise<PersonalInfo | null> {
        try {
            const data = await SecureStore.getItemAsync(this.PERSONAL_INFO_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting personal info', error);
            return null;
        }
    }

    async clearPersonalInfo(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(this.PERSONAL_INFO_KEY);
        } catch (error) {
            console.error('Error clearing personal info', error);
        }
    }

    /* ================= MEALS ================= */

    async saveMeals(meals: Meal[]): Promise<void> {
        try {
            await SecureStore.setItemAsync(
                this.MEAL_KEY,
                JSON.stringify(meals)
            );
        } catch (error) {
            console.error('Error saving meals', error);
        }
    }

    async getMeals(): Promise<Meal[] | null> {
        try {
            const data = await SecureStore.getItemAsync(this.MEAL_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting meals', error);
            return null;
        }
    }

    async clearMeals(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(this.MEAL_KEY);
        } catch (error) {
            console.error('Error clearing meals', error);
        }
    }

    /* ================= GEMINI API KEY ================= */

    async saveGeminiApiKey(apiKey: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(this.GEMINI_API_KEY, apiKey);
        } catch (error) {
            console.error('Error saving Gemini API key', error);
        }
    }

    async getGeminiApiKey(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(this.GEMINI_API_KEY);
        } catch (error) {
            console.error('Error getting Gemini API key', error);
            return null;
        }
    }

    async clearGeminiApiKey(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(this.GEMINI_API_KEY);
        } catch (error) {
            console.error('Error clearing Gemini API key', error);
        }
    }

    /* ================= FIRST TIME USER ================= */

    async setFirstTimeUser(isFirstTime: boolean): Promise<void> {
        try {
            await SecureStore.setItemAsync(
                this.FIRST_TIME_USER,
                JSON.stringify(isFirstTime)
            );
        } catch (error) {
            console.error('Error setting first time user', error);
        }
    }

    async isFirstTimeUser(): Promise<boolean> {
        try {
            const value = await SecureStore.getItemAsync(this.FIRST_TIME_USER);
            return value ? JSON.parse(value) : true;
        } catch (error) {
            console.error('Error checking first time user', error);
            return true;
        }
    }

    /* ================= UTILITIES ================= */

    async hasCompletedSetup(): Promise<boolean> {
        const personalInfo = await this.getPersonalInfo();
        return !!personalInfo;
    }

    async clearAllData(): Promise<void> {
        try {
            await Promise.all([
                this.clearPersonalInfo(),
                this.clearMeals(),
                this.clearGeminiApiKey(),
                SecureStore.deleteItemAsync(this.FIRST_TIME_USER),
            ]);
        } catch (error) {
            console.error('Error clearing all data', error);
        }
    }

    async getStorageStats(): Promise<{
        hasPersonalInfo: boolean;
        hasMeals: boolean;
        hasApiKey: boolean;
        isFirstTime: boolean;
    }> {
        try {
            const [
                personalInfo,
                meals,
                apiKey,
                isFirstTime
            ] = await Promise.all([
                this.getPersonalInfo(),
                this.getMeals(),
                this.getGeminiApiKey(),
                this.isFirstTimeUser(),
            ]);

            return {
                hasPersonalInfo: !!personalInfo,
                hasMeals: !!meals,
                hasApiKey: !!apiKey,
                isFirstTime,
            };
        } catch (error) {
            console.error("Error getting storage stats", error);
            return {
                hasPersonalInfo: false,
                hasMeals: false,
                hasApiKey: false,
                isFirstTime: true,
            };
        }
    }
}

export default StorageService;