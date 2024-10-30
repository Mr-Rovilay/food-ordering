import React, { useState, useRef, FormEvent } from "react"
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit2,
  Loader2,
  Camera,
  Phone,
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { z } from "zod"
import { useUserStore } from "@/store/useUserStore"

const profileSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(2, "Location must be at least 2 characters long"),
  contact: z.string()
  .min(11, "Contact number must be at least 11 digits")
  .max(13, "Contact number cannot exceed 13 digits (including +234)")
  .refine((val) => /^(\+234|0)[789][01]\d{8}$/.test(val), {
    message: "Invalid Nigerian phone number format",
  }),
  bio: z.string().max(200, "Bio must be 200 characters or less"),
  profilePicture: z.string().optional(),
  joinDate: z.string().optional(),
})

type ProfileData = z.infer<typeof profileSchema>

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user, updateProfile } = useUserStore()
  const [profileData, setProfileData] = useState<ProfileData>({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    joinDate: user?.joinedAt?.toString() || "",
    bio: user?.bio || "",
    contact: user?.contact || "",
    profilePicture: user?.profilePicture || "",
  })
  const [errors, setErrors] = useState<z.ZodIssue[]>([])
  const imageRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      setErrors([])
    }
  }

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProfileData((prevData) => ({ ...prevData, [name]: value }))
  }

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const result = profileSchema.safeParse(profileData)
      
      if (!result.success) {
        setErrors(result.error.issues)
        return
      }

      await updateProfile(profileData)
      setIsEditing(false)
      setErrors([])
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarClick = () => {
    if (isEditing && imageRef.current) {
      imageRef.current.click()
    }
  }

  const getError = (field: keyof ProfileData) => {
    const error = errors.find((err) => err.path[0] === field)
    return error ? error.message : null
  }

  return (
    <div className="container px-3 py-8 mx-auto mt-16">
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
          <form onSubmit={updateProfileHandler}>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar
                    className="w-20 h-20 cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <AvatarImage
                      src={profileData.profilePicture}
                      alt={profileData.fullname}
                      className="object-cover"
                    />
                    <AvatarFallback>{profileData.fullname.charAt(0)}</AvatarFallback>
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </Avatar>
                  <input
                    type="file"
                    ref={imageRef}
                    className="hidden"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{profileData.fullname}</h2>
                  <p className="text-sm text-gray-500">
                    Member since {profileData.joinDate ? new Date(profileData.joinDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullname">Name</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    value={profileData.fullname}
                    onChange={changeHandler}
                    disabled={!isEditing}
                  />
                  {getError("fullname") && (
                    <p className="text-sm text-red-500">{getError("fullname")}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={changeHandler}
                    disabled={!isEditing}
                  />
                  {getError("email") && (
                    <p className="text-sm text-red-500">{getError("email")}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Location</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={changeHandler}
                    disabled={!isEditing}
                  />
                  {getError("address") && (
                    <p className="text-sm text-red-500">{getError("address")}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    name="contact"
                    type="tel"
                    value={profileData.contact}
                    onChange={changeHandler}
                    disabled={!isEditing}
                  />
                  {getError("contact") && (
                    <p className="text-sm text-red-500">{getError("contact")}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    value={profileData.joinDate ? new Date(profileData.joinDate).toISOString().split('T')[0] : ''}
                    disabled
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={changeHandler}
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
              <span>{profileData.fullname}</span>
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{profileData.email}</span>
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profileData.address}</span>
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{profileData.contact}</span>
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{profileData.joinDate ? new Date(profileData.joinDate).toLocaleDateString() : 'N/A'}</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}