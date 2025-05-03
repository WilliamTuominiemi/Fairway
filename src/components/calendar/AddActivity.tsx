
"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
 
export default function AddActivity() {
    const { data: session } = useSession()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        date: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       
        console.log(formData)

        if (!session) {
            console.error('Please sign in to add activities')
            return
        }

        setIsSubmitting(true)
        
        try {
            const response = await fetch("/api/activities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Failed to add activity")
            }

            router.refresh()

            const data = await response.json()
            console.log("Activity added successfully:", data)

            setFormData({ date: '' })
        } catch (error) {
            console.error("Error adding activity:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    return (
    <div className="flex flex-col gap-4 p-5 m-5 bg-white rounded-lg text-black">
        <h1>Add activity</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date
        </label>
        <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter date"
        />
        <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
        >
            {isSubmitting ? 'Adding...' : 'Add activity'}
        </button>
        </form>
    </div>
  )
}
