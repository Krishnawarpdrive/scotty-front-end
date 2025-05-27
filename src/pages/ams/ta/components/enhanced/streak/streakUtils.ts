
interface DayData {
  date: string;
  calls: number;
  profiles: number;
  interviews: number;
  callsTarget: number;
  profilesTarget: number;
  interviewsTarget: number;
}

export const generateStreakData = (days: number = 90): DayData[] => {
  const data: DayData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic mock data with some patterns
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isRecentWeek = i < 7;
    
    // Lower activity on weekends and higher in recent week
    const activityMultiplier = isWeekend ? 0.3 : (isRecentWeek ? 1.2 : 1);
    
    const calls = Math.floor(Math.random() * 8 * activityMultiplier);
    const profiles = Math.floor(Math.random() * 6 * activityMultiplier);
    const interviews = Math.floor(Math.random() * 3 * activityMultiplier);
    
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
