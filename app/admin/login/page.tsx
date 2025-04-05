"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export default function AdminLogin() {
	const [pin, setPin] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ pin }),
			});

			const data = await res.json();

			if (data.success) {
				// Store token in localStorage
				localStorage.setItem("adminToken", data.token);
				router.push("/admin/dashboard");
			} else {
				setError(data.message);
			}
		} catch (err) {
			setError("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-8 space-y-6 bg-[#3f3f47] rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center text-background">
					Admin Login
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							type="password"
							placeholder="Enter PIN"
							value={pin}
							onChange={(e) => setPin(e.target.value)}
							className="w-full p-3 border rounded-md bg-[#dadadf] text-foreground"
							maxLength={6}
						/>
					</div>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Loading..." : "Login"}
					</Button>
				</form>
			</div>
		</div>
	);
}
