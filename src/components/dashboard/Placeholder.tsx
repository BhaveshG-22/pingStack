"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateProps {
    Title: String,
    Description: String
}

const Placeholder = ({ Title, Description }: TemplateProps) => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-4">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle>{Title}</CardTitle>
                    <CardDescription>
                        {Description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground">
                        <p>{Title} functionality coming soon...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Placeholder