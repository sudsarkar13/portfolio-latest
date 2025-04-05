"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export default function AdminDashboard({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		// Check if admin token exists
		const token = localStorage.getItem("adminToken");
		if (!token) {
			router.push("/admin/login");
		}
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("adminToken");
		router.push("/");
	};

	return (
		<div className="min-h-screen bg-foreground p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-2xl font-bold text-white">
						Admin Dashboard
					</h1>
					<Button onClick={handleLogout} variant="primary" className={`hover:bg-red-600 hover:text-white`}>
						Logout
					</Button>
				</div>
				{children}
			</div>
		</div>
	);
}
