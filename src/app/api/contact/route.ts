import { z } from 'zod';
import { NextResponse } from 'next/server';

const contactFormSchema = z.object({
    name: z.string()
        .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string()
        .email("L'email doit être valide"),
    message: z.string()
        .min(20, "Le message doit contenir au moins 20 caractères")
        .max(300, "Le message ne doit pas dépasser 300 caractères"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Sleep
        await new Promise(resolve => setTimeout(resolve, 3000));

        const parseResult = contactFormSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({
                errors: parseResult.error.errors.map(error => ({
                    field: error.path[0],
                    message: error.message,
                })),
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "Success",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            errors: [{ message: `Une erreur est survenue: ${error}` }]
        }, { status: 500 });
    }
} 