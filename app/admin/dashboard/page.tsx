"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export default function AdminDashboard() {
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
		router.push("/admin/login");
	};

	return (
		<main>
			{/* Add your admin dashboard content here */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="p-6 bg-card rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-4 text-[#3f3f47]">
						Quick Actions
					</h2>
					{/* Add action buttons/links */}
				</div>

				<div className="p-6 bg-card rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-4 text-[#3f3f47]">
						Recent Activity
					</h2>
					{/* Add activity list */}
				</div>

				<div className="p-6 bg-card rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-4 text-[#3f3f47]">
						Statistics
					</h2>
					{/* Add statistics */}
				</div>
			</div>
		</main>
	);
}
