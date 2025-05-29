
import { useState, useCallback, useEffect } from 'react';
import { 
  aiAssistant, 
  ResumeParsingResult, 
  SkillGapAnalysis, 
  FormSuggestion, 
  AIInsight 
} from '../AIAssistantService';
import { Candidate } from '../../../types/CandidateTypes';

export interface UseAIAssistantReturn {
  // Resume parsing
  parseResume: (resumeText: string) => Promise<void>;
  resumeData: ResumeParsingResult | null;
  isParsingResume: boolean;
  
  // Skill gap analysis
  analyzeSkillGap: (roleRequirements: string[]) => Promise<void>;
  skillGapAnalysis: SkillGapAnalysis | null;
  isAnalyzingSkills: boolean;
  
  // Form suggestions
  generateSuggestions: (formData: any) => Promise<void>;
  formSuggestions: FormSuggestion[];
  isDismissedSuggestion: (suggestion: FormSuggestion) => boolean;
  dismissSuggestion: (suggestion: FormSuggestion) => void;
  isGeneratingSuggestions: boolean;
  
  // AI insights
  generateInsights: (formData: any, roleRequirements?: string[]) => Promise<void>;
  aiInsights: AIInsight[];
  isGeneratingInsights: boolean;
  
  // Combined actions
  refreshAllAI: (formData: any, roleRequirements?: string[]) => Promise<void>;
  
  // State management
  clearAIData: () => void;
  hasAnyAIData: boolean;
}

export const useAIAssistant = (candidate: Candidate): UseAIAssistantReturn => {
  // Resume parsing state
  const [resumeData, setResumeData] = useState<ResumeParsingResult | null>(null);
  const [isParsingResume, setIsParsingResume] = useState(false);
  
  // Skill gap analysis state
  const [skillGapAnalysis, setSkillGapAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [isAnalyzingSkills, setIsAnalyzingSkills] = useState(false);
  
  // Form suggestions state
  const [formSuggestions, setFormSuggestions] = useState<FormSuggestion[]>([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  
  // AI insights state
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  const parseResume = useCallback(async (resumeText: string) => {
    try {
      setIsParsingResume(true);
      const result = await aiAssistant.parseResume(resumeText);
      setResumeData(result);
      console.log('Resume parsed successfully:', result);
    } catch (error) {
      console.error('Failed to parse resume:', error);
    } finally {
      setIsParsingResume(false);
    }
  }, []);

  const analyzeSkillGap = useCallback(async (roleRequirements: string[]) => {
    if (roleRequirements.length === 0) return;
    
    try {
      setIsAnalyzingSkills(true);
      const analysis = await aiAssistant.analyzeSkillGap(candidate, roleRequirements);
      setSkillGapAnalysis(analysis);
      console.log('Skill gap analysis completed:', analysis);
    } catch (error) {
      console.error('Failed to analyze skill gap:', error);
    } finally {
      setIsAnalyzingSkills(false);
    }
  }, [candidate]);

  const generateSuggestions = useCallback(async (formData: any) => {
    try {
      setIsGeneratingSuggestions(true);
      const suggestions = await aiAssistant.generateFormSuggestions(candidate, resumeData || undefined);
      
      // Filter out dismissed suggestions
      const filteredSuggestions = suggestions.filter(suggestion => 
        !dismissedSuggestions.has(`${suggestion.field}-${suggestion.suggestedValue}`)
      );
      
      setFormSuggestions(filteredSuggestions);
      console.log('Form suggestions generated:', filteredSuggestions);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  }, [candidate, resumeData, dismissedSuggestions]);

  const generateInsights = useCallback(async (formData: any, roleRequirements?: string[]) => {
    try {
      setIsGeneratingInsights(true);
      const insights = await aiAssistant.generateAIInsights(candidate, formData, roleRequirements);
      setAIInsights(insights);
      console.log('AI insights generated:', insights);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    } finally {
      setIsGeneratingInsights(false);
    }
  }, [candidate]);

  const dismissSuggestion = useCallback((suggestion: FormSuggestion) => {
    const suggestionKey = `${suggestion.field}-${suggestion.suggestedValue}`;
    setDismissedSuggestions(prev => new Set([...prev, suggestionKey]));
    setFormSuggestions(prev => prev.filter(s => 
      `${s.field}-${s.suggestedValue}` !== suggestionKey
    ));
  }, []);

  const isDismissedSuggestion = useCallback((suggestion: FormSuggestion) => {
    const suggestionKey = `${suggestion.field}-${suggestion.suggestedValue}`;
    return dismissedSuggestions.has(suggestionKey);
  }, [dismissedSuggestions]);

  const refreshAllAI = useCallback(async (formData: any, roleRequirements?: string[]) => {
    const promises = [
      generateSuggestions(formData),
      generateInsights(formData, roleRequirements)
    ];
    
    if (roleRequirements && roleRequirements.length > 0) {
      promises.push(analyzeSkillGap(roleRequirements));
    }
    
    await Promise.all(promises);
  }, [generateSuggestions, generateInsights, analyzeSkillGap]);

  const clearAIData = useCallback(() => {
    setResumeData(null);
    setSkillGapAnalysis(null);
    setFormSuggestions([]);
    setAIInsights([]);
    setDismissedSuggestions(new Set());
  }, []);

  const hasAnyAIData = !!(
    resumeData || 
    skillGapAnalysis || 
    formSuggestions.length > 0 || 
    aiInsights.length > 0
  );

  return {
    // Resume parsing
    parseResume,
    resumeData,
    isParsingResume,
    
    // Skill gap analysis
    analyzeSkillGap,
    skillGapAnalysis,
    isAnalyzingSkills,
    
    // Form suggestions
    generateSuggestions,
    formSuggestions,
    isDismissedSuggestion,
    dismissSuggestion,
    isGeneratingSuggestions,
    
    // AI insights
    generateInsights,
    aiInsights,
    isGeneratingInsights,
    
    // Combined actions
    refreshAllAI,
    
    // State management
    clearAIData,
    hasAnyAIData
  };
};
