import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit2,
  Loader2,
  Camera,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { z } from "zod";

// Zod schema for form validation
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(2, "Location must be at least 2 characters long"),
  bio: z.string().max(200, "Bio must be 200 characters or less"),
});

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    joinDate: "January 2022",
    bio: "Passionate football enthusiast and avid reader of sports journalism.",
    avatar: "/profile.jpg",
  });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setNewAvatar(null);
      setErrors([]); // Clear errors on cancel
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data using Zod schema
    const result = profileSchema.safeParse(profile);
    if (!result.success) {
      // If validation fails, set errors and stop submission
      setErrors(result.error.issues);
      setIsLoading(false);
      return;
    }

    // Simulate saving process (e.g., backend call)
    setTimeout(() => {
      if (newAvatar) {
        setProfile((prev) => ({
          ...prev,
          avatar: URL.createObjectURL(newAvatar),
        }));
      }
      setIsEditing(false);
      setIsLoading(false);
      setNewAvatar(null);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const getError = (field: keyof typeof profile) => {
    const error = errors.find((err) => err.path[0] === field);
    return error ? error.message : null;
  };

  return (
    <div className="container px-3 py-8 mx-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Profile</CardTitle>
            <Button onClick={handleEdit} variant="outline" size="sm">
              <Edit2 className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
          <CardDescription>Manage your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar
                    className="w-20 h-20 cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <AvatarImage
                      src={
                        newAvatar
                          ? URL.createObjectURL(newAvatar)
                          : profile.avatar
                      }
                      alt={profile.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-sm text-gray-500">
                    Member since {profile.joinDate}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {getError("name") && (
                    <p className="text-sm text-red-500">{getError("name")}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {getError("email") && (
                    <p className="text-sm text-red-500">{getError("email")}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {getError("location") && (
                    <p className="text-sm text-red-500">
                      {getError("location")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    value={profile.joinDate}
                    disabled
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                />
                {getError("bio") && (
                  <p className="text-sm text-red-500">{getError("bio")}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <Button
                type="submit"
                className="mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap items-center justify-start gap-2 text-sm text-gray-500">
            <p className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{profile.name}</span>
            </p>
            <span className="hidden sm:inline">|</span>{" "}
            {/* Hide the pipe on mobile screens */}
            <p className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{profile.joinDate}</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
