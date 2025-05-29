
interface DayData {
  date: string;
  calls: number;
  profiles: number;
  interviews: number;
  callsTarget: number;
  profilesTarget: number;
  interviewsTarget: number;
}

// Static seed for consistent data generation
const STATIC_SEED = 12345;

// Simple seeded random number generator
class SeededRandom {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

export const generateStreakData = (days: number = 90): DayData[] => {
  const data: DayData[] = [];
  const today = new Date();
  const random = new SeededRandom(STATIC_SEED);
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic mock data with some patterns
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isRecentWeek = i < 7;
    
    // Lower activity on weekends and higher in recent week
    const activityMultiplier = isWeekend ? 0.3 : (isRecentWeek ? 1.2 : 1);
    
    const calls = Math.floor(random.next() * 8 * activityMultiplier);
    const profiles = Math.floor(random.next() * 6 * activityMultiplier);
    const interviews = Math.floor(random.next() * 3 * activityMultiplier);
    
    data.push({
      date: date.toISOString().split('T')[0],
      calls,
      profiles,
      interviews,
      callsTarget: 5,
      profilesTarget: 4,
      interviewsTarget: 2
    });
  }
  
  return data;
};

export const calculateCurrentStreak = (streakData: DayData[]): number => {
  let streak = 0;
  
  // Calculate from the most recent day backwards
  for (let i = streakData.length - 1; i >= 0; i--) {
    const day = streakData[i];
    const hasActivity = day.calls > 0 || day.profiles > 0 || day.interviews > 0;
    
    if (hasActivity) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const calculateLongestStreak = (streakData: DayData[]): number => {
  let longestStreak = 0;
  let currentStreak = 0;
  
  streakData.forEach(day => {
    const hasActivity = day.calls > 0 || day.profiles > 0 || day.interviews > 0;
    
    if (hasActivity) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });
  
  return longestStreak;
};

export const getIntensityLevel = (dayData: DayData): number => {
  const totalAchieved = [
    dayData.calls >= dayData.callsTarget,
    dayData.profiles >= dayData.profilesTarget,
    dayData.interviews >= dayData.interviewsTarget
  ].filter(Boolean).length;

  const totalActivity = dayData.calls + dayData.profiles + dayData.interviews;

  if (totalActivity === 0) return 0;
  if (totalAchieved === 3) return 4; // All targets met
  if (totalAchieved === 2) return 3; // 2 targets met
  if (totalAchieved === 1) return 2; // 1 target met
  return 1; // Activity but no targets met
};

export const getBackgroundColor = (level: number): string => {
  switch (level) {
    case 0: return "bg-gray-100"; // No activity
    case 1: return "bg-red-200"; // Activity but no targets
    case 2: return "bg-yellow-300"; // 1 target met
    case 3: return "bg-orange-400"; // 2 targets met
    case 4: return "bg-green-500"; // All targets met
    default: return "bg-gray-100";
  }
};
