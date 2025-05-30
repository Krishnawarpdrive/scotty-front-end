
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { interviewSchedulingService } from './InterviewSchedulingService';

interface TimeSlot {
  start: string;
  end: string;
  available?: boolean;
  conflict?: boolean;
}

interface TimeSlotPickerProps {
  panelistId: string;
  duration: number;
  timezone: string;
  onSelect: (slot: TimeSlot) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  panelistId,
  duration,
  timezone,
  onSelect
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    if (selectedDate && panelistId) {
      loadTimeSlots();
    }
  }, [selectedDate, panelistId, duration]);

  const loadTimeSlots = async () => {
    setLoading(true);
    try {
      const suggestions = await interviewSchedulingService.suggestTimeSlots(
        panelistId,
        selectedDate,
        duration
      );
      
      setAvailableSlots(suggestions.map(slot => ({
        ...slot,
        available: true,
        conflict: false
      })));
    } catch (error) {
      console.error('Error loading time slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNextWeekDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends for now (can be made configurable)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        days.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          isToday: date.toDateString() === today.toDateString()
        });
      }
    }
    
    return days;
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone
    });
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    onSelect(slot);
  };

  const weekDays = getNextWeekDays();

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Select Date
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <Button
              key={day.date}
              variant={selectedDate === day.date ? 'default' : 'outline'}
              className={`p-3 h-auto ${day.isToday ? 'ring-2 ring-blue-200' : ''}`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="text-center">
                <div className="text-xs font-medium">{day.display}</div>
                {day.isToday && (
                  <div className="text-xs text-blue-600 mt-1">Today</div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Available Time Slots
          </h4>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array(8).fill(null).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableSlots.map((slot, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedSlot === slot ? 'default' : 'outline'}
                    className={`
                      w-full h-auto p-3 relative
                      ${slot.conflict ? 'border-red-300 bg-red-50' : ''}
                      ${slot.available && !slot.conflict ? 'hover:border-green-300' : ''}
                    `}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={slot.conflict}
                  >
                    <div className="text-center">
                      <div className="font-medium">
                        {formatTime(slot.start)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {duration} min
                      </div>
                      {slot.conflict && (
                        <AlertCircle className="h-3 w-3 text-red-500 mt-1 mx-auto" />
                      )}
                      {selectedSlot === slot && (
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 mx-auto" />
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Available Slots
                </h3>
                <p className="text-gray-600">
                  No time slots are available for this date. Try selecting a different date.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Selection Summary */}
      {selectedSlot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Time Slot Selected</span>
          </div>
          <p className="text-sm text-green-700">
            {new Date(selectedSlot.start).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} at {formatTime(selectedSlot.start)} ({timezone})
          </p>
        </motion.div>
      )}
    </div>
  );
};
