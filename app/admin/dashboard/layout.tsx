import AdminHeader from "@/components/navigation/AdminHeader";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div>
				<AdminHeader>{children}</AdminHeader>
			</div>
		</main>
	);
}
