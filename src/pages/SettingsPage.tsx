import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProfile } from '@/hooks/useProfile';
import { getPersonaFromPath } from '@/utils/persona';
import { Settings, Bell, Palette, Shield, Users, Zap, Database, Globe } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SettingsPage: React.FC = () => {
  const location = useLocation();
  const { profile, loading, error, updateProfile } = useProfile();
  const [saving, setSaving] = useState(false);

  const handlePreferenceChange = async (key: string, value: any) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      await updateProfile({
        preferences: {
          ...profile.preferences,
          [key]: value
        }
      });
    } catch (err) {
      console.error('Failed to update preference:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationChange = async (key: string, value: any) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      await updateProfile({
        preferences: {
          ...profile.preferences,
          notification_preferences: {
            ...profile.preferences.notification_preferences,
            [key]: value
          }
        }
      });
    } catch (err) {
      console.error('Failed to update notification preference:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>
            {error || 'Failed to load settings.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="workspace" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Workspace
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Advanced
          </TabsTrigger>
          <TabsTrigger value="localization" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Localization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input 
                    type="text" 
                    value={profile.first_name || ''}
                    className="w-full p-2 border rounded-md"
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input 
                    type="text" 
                    value={profile.last_name || ''}
                    className="w-full p-2 border rounded-md"
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    className="w-full p-2 border rounded-md"
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input 
                    type="tel" 
                    value={profile.phone || ''}
                    className="w-full p-2 border rounded-md"
                    disabled={saving}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea 
                  value={profile.bio || ''}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  disabled={saving}
                />
              </div>
              <Button disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={profile.preferences.notification_preferences.email_notifications}
                    onCheckedChange={(checked) => handleNotificationChange('email_notifications', checked)}
                    disabled={saving}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Receive push notifications</p>
                  </div>
                  <Switch
                    checked={profile.preferences.notification_preferences.push_notifications}
                    onCheckedChange={(checked) => handleNotificationChange('push_notifications', checked)}
                    disabled={saving}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">In-App Notifications</h4>
                    <p className="text-sm text-gray-500">Show notifications in the application</p>
                  </div>
                  <Switch
                    checked={profile.preferences.notification_preferences.in_app_notifications}
                    onCheckedChange={(checked) => handleNotificationChange('in_app_notifications', checked)}
                    disabled={saving}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Digest Frequency</label>
                <Select
                  value={profile.preferences.notification_preferences.digest_frequency}
                  onValueChange={(value) => handleNotificationChange('digest_frequency', value)}
                  disabled={saving}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <Select
                  value={profile.preferences.theme}
                  onValueChange={(value) => handlePreferenceChange('theme', value)}
                  disabled={saving}
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
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Compact Mode</h4>
                  <p className="text-sm text-gray-500">Use smaller spacing and components</p>
                </div>
                <Switch
                  checked={profile.preferences.compact_mode}
                  onCheckedChange={(checked) => handlePreferenceChange('compact_mode', checked)}
                  disabled={saving}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Dashboard Layout</label>
                <Select
                  value={profile.preferences.dashboard_layout}
                  onValueChange={(value) => handlePreferenceChange('dashboard_layout', value)}
                  disabled={saving}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="expanded">Expanded</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      📅
                    </div>
                    <div>
                      <h4 className="font-medium">Calendar Sync</h4>
                      <p className="text-sm text-gray-500">Sync interviews with your calendar</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      📧
                    </div>
                    <div>
                      <h4 className="font-medium">Email Integration</h4>
                      <p className="text-sm text-gray-500">Connect your email for automated communications</p>
                    </div>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      🔗
                    </div>
                    <div>
                      <h4 className="font-medium">Slack Integration</h4>
                      <p className="text-sm text-gray-500">Get notifications in Slack</p>
                    </div>
                  </div>
                  <Button variant="outline">Install</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500">
                Team management features are available for HR and AMS roles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Team Members</h4>
                  <p className="text-sm text-gray-500 mt-1">Manage team member access and permissions</p>
                  <Button variant="outline" className="mt-3">Manage Team</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Delegation Rules</h4>
                  <p className="text-sm text-gray-500 mt-1">Set up automatic task delegation</p>
                  <Button variant="outline" className="mt-3">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Visibility</label>
                  <Select value={profile.privacy_settings.profile_visibility}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="team">Team Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Activity Visibility</h4>
                    <p className="text-sm text-gray-500">Show your activity to team members</p>
                  </div>
                  <Switch checked={profile.privacy_settings.activity_visibility === 'public'} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Sharing</h4>
                    <p className="text-sm text-gray-500">Allow sharing of anonymized data for analytics</p>
                  </div>
                  <Switch checked={profile.privacy_settings.data_sharing_consent} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg border-yellow-200 bg-yellow-50">
                  <h4 className="font-medium text-yellow-800">Data Export</h4>
                  <p className="text-sm text-yellow-700 mt-1">Download all your data</p>
                  <Button variant="outline" className="mt-3">Export Data</Button>
                </div>
                
                <div className="p-4 border rounded-lg border-red-200 bg-red-50">
                  <h4 className="font-medium text-red-800">Delete Account</h4>
                  <p className="text-sm text-red-700 mt-1">Permanently delete your account and all data</p>
                  <Button variant="destructive" className="mt-3">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select value={profile.language || 'en'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Select value={profile.timezone || 'America/New_York'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
