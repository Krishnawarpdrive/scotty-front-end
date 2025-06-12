
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProfile } from "@/hooks/useProfile";
import { useUnifiedToast } from "@/hooks/useUnifiedToast";

const SettingsPage = () => {
  const { profile, updateProfile } = useProfile();
  const toast = useUnifiedToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    try {
      await updateProfile(profile);
      toast.success({
        title: "Settings saved",
        description: "Your preferences have been updated successfully."
      });
    } catch (error) {
      toast.error({
        title: "Error",
        description: "Failed to save settings. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return <div className="p-6">Loading settings...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Email Notifications</Label>
              <Switch
                id="notifications"
                checked={profile.preferences?.notification_preferences?.email_notifications || false}
                onCheckedChange={(checked) => updateProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    notification_preferences: {
                      ...profile.preferences?.notification_preferences,
                      email_notifications: checked
                    }
                  }
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={profile.preferences?.theme || 'light'}
                onValueChange={(value) => updateProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    theme: value
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={profile.timezone || 'UTC'}
                onChange={(e) => updateProfile({
                  ...profile,
                  timezone: e.target.value
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={profile.language || 'en'}
                onChange={(e) => updateProfile({
                  ...profile,
                  language: e.target.value
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
