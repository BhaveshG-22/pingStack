"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

interface FormData {
    name: string;
    company: string;
    email: string;
}

export default function AddNewLead() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        company: "",
        email: ""
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            // Simulate API call - replace with your actual API endpoint
            await new Promise<void>(resolve => setTimeout(resolve, 1500));

            console.log("New lead data:", formData);
            setMessage("Successfully added to email list!");

            // Reset form
            setFormData({
                name: "",
                company: "",
                email: ""
            });
        } catch (error: unknown) {
            setMessage("Error adding to email list. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-lg mx-auto">
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                                Add New Lead
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Enter contact details to add them to your outreach list
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                                        Company *
                                    </Label>
                                    <Input
                                        id="company"
                                        name="company"
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        className="h-12"
                                    />
                                </div>

                                {message && (
                                    <div className={`p-4 rounded-md flex items-center space-x-2 ${message.includes("Error")
                                            ? "bg-red-50 border border-red-200 text-red-700"
                                            : "bg-green-50 border border-green-200 text-green-700"
                                        }`}>
                                        <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            {message.includes("Error") ? (
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            ) : (
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            )}
                                        </svg>
                                        <span className="text-sm font-medium">{message}</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 text-base font-medium"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding Lead...
                                        </>
                                    ) : (
                                        "Add to Email List"
                                    )}
                                </Button>
                            </form>

                            <p className="text-sm text-gray-500 text-center mt-6">
                                * Required fields
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}