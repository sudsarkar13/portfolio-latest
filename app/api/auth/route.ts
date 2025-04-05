import { NextResponse } from "next/server";

// In a real app, use environment variables and proper hashing
const ADMIN_PIN = "123456";

export async function POST(request: Request) {
	try {
		const { pin } = await request.json();

		if (pin === ADMIN_PIN) {
			return NextResponse.json({
				success: true,
				token: "admin-token", // In production, use proper JWT tokens
			});
		}

		return NextResponse.json(
			{
				success: false,
				message: "Invalid PIN",
			},
			{ status: 401 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "Server error",
			},
			{ status: 500 }
		);
	}
}
