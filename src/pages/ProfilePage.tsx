
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/useProfile";
import { useUnifiedToast } from "@/hooks/useUnifiedToast";
import { UserProfile } from "@/types/profile";

const ProfilePage = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const toast = useUnifiedToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else {
      // Default user data for demo
      const defaultUser: UserProfile = {
        id: "demo-user",
        name: "John Doe",
        email: "john.doe@company.com",
        role: "Senior Developer",
        department: "Engineering",
        avatarUrl: undefined,
        bio: "Passionate developer with 5+ years of experience in full-stack development.",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        joinDate: "2020-01-15",
        skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
        achievements: ["Employee of the Month", "Technical Excellence Award"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/johndoe",
          github: "https://github.com/johndoe",
          twitter: "https://twitter.com/johndoe"
        },
        preferences: {
          theme: "light",
          notifications: true,
          emailUpdates: true
        },
        privacy_settings: {
          profile_visibility: "public",
          contact_visibility: "connections",
          activity_visibility: "private"
        }
      };
      setFormData(defaultUser);
    }
  }, [profile]);

  const handleSave = async () => {
    if (!formData) return;

    try {
      const savePromise = updateProfile(formData);
      
      await toast.promise(savePromise, {
        loading: "Saving profile changes...",
        success: "Profile updated successfully!",
        error: "Failed to update profile. Please try again."
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData(profile);
    }
    setIsEditing(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading profile...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!formData) {
    return <div className="flex items-center justify-center h-screen">No profile data available</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.avatarUrl} />
                <AvatarFallback>{formData.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              
              {isEditing ? (
                <div className="w-full space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              ) : (
                <h2 className="text-xl font-semibold text-center">{formData.name}</h2>
              )}
              
              <Badge variant="secondary">{formData.role}</Badge>
              <p className="text-sm text-gray-600 text-center">{formData.department}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Contact Information</h3>
              <p className="text-sm">{formData.email}</p>
              <p className="text-sm">{formData.phone}</p>
              <p className="text-sm">{formData.location}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Member Since</h3>
              <p className="text-sm">{new Date(formData.joinDate || '').toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detailed Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bio Section */}
            <div>
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <textarea
                  id="bio"
                  className="w-full mt-1 p-2 border rounded-md"
                  rows={3}
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-gray-700">{formData.bio}</p>
              )}
            </div>

            <Separator />

            {/* Skills */}
            <div>
              <h3 className="font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills?.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Achievements */}
            <div>
              <h3 className="font-medium mb-2">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {formData.achievements?.map((achievement, index) => (
                  <Badge key={index} className="bg-yellow-100 text-yellow-800">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Social Links */}
            <div>
              <h3 className="font-medium mb-2">Social Links</h3>
              <div className="space-y-2">
                {formData.socialLinks && Object.entries(formData.socialLinks).map(([platform, url]) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <span className="capitalize font-medium w-20">{platform}:</span>
                    {isEditing ? (
                      <Input
                        value={url || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            [platform]: e.target.value
                          }
                        })}
                      />
                    ) : (
                      <a href={url || '#'} className="text-blue-600 hover:underline text-sm">
                        {url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
