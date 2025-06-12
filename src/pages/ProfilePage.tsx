
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonaProfileCard } from '@/components/profile/PersonaProfileCard';
import { useProfile } from '@/hooks/useProfile';
import { getPersonaFromPath } from '@/utils/persona';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Shield, Activity, Settings, Briefcase, Eye } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const persona = getPersonaFromPath(location.pathname) || 'ams';
  const { profile, loading, error } = useProfile(persona);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>
            {error || 'Failed to load profile information.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <PersonaProfileCard profile={profile} />
        </div>

        {/* Profile Details Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Professional
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Name</label>
                    <p className="mt-1">{profile.first_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="mt-1">{profile.last_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1">{profile.phone || 'Not provided'}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Bio</label>
                    <p className="mt-1">{profile.bio || 'No bio available'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Professional Information</h3>
                <div className="space-y-4">
                  {Object.entries(profile.professional_data).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/_/g, ' ')}
                      </label>
                      <p className="mt-1">
                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <h3 className="text-lg font-semibold">User Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Theme</label>
                    <p className="mt-1 capitalize">{profile.preferences.theme}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Compact Mode</label>
                    <p className="mt-1">{profile.preferences.compact_mode ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Language</label>
                    <p className="mt-1">{profile.language.toUpperCase()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Timezone</label>
                    <p className="mt-1">{profile.timezone}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                      Setup 2FA
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Active Sessions</h4>
                      <p className="text-sm text-gray-500">Manage your active login sessions</p>
                    </div>
                    <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                      View Sessions
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Privacy Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Profile Visibility</label>
                    <p className="mt-1 capitalize">{profile.privacy_settings.profile_visibility}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Activity Visibility</label>
                    <p className="mt-1">{profile.privacy_settings.activity_visibility ? 'Visible' : 'Hidden'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data Sharing</label>
                    <p className="mt-1">{profile.privacy_settings.data_sharing_consent ? 'Allowed' : 'Restricted'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Marketing Communications</label>
                    <p className="mt-1">{profile.privacy_settings.marketing_consent ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Profile updated</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Logged in from new device</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Password changed</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
