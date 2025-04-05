"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getGithubStats } from "@/utils/github";
import { motion } from "framer-motion";
import { username } from "@/utils/github";

// Types
interface GithubStats {
	commitCount: number;
	collaborations: number;
	joinedYear: number;
}

interface Experience {
	value: number;
	unit: "Years" | "Months";
}

interface StatItem {
	num: number;
	text: string;
	showPlus?: boolean;
	loading?: boolean;
}

const Stats: React.FC = () => {
	// State
	const [githubStats, setGithubStats] = useState<GithubStats>({
		commitCount: 0,
		collaborations: 0,
		joinedYear: new Date().getFullYear(),
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Calculate experience with decimal precision
	const calculateExperience = (): Experience => {
		const startDate = new Date(2024, 3); // April 2024 (month is 0-based)
		const currentDate = new Date();

		const diffInMonths =
			(currentDate.getFullYear() - startDate.getFullYear()) * 12 +
			(currentDate.getMonth() - startDate.getMonth()) +
			(currentDate.getDate() - startDate.getDate()) / 30;

		if (diffInMonths < 0) return { value: 0, unit: "Months" };

		// Convert to years with 1 decimal place
		const years = +(diffInMonths / 12).toFixed(1);

		if (years < 1) {
			return {
				value: Math.max(0, Math.round(diffInMonths)),
				unit: "Months",
			};
		}

		return {
			value: years,
			unit: "Years",
		};
	};

	// Fetch GitHub stats
	const fetchStats = async () => {
		try {
			setIsLoading(true);
			if (!username) throw new Error("Username is required");

			const stats = await getGithubStats(username);
			setGithubStats({
				commitCount: stats.totalCommits,
				collaborations: stats.collaborations,
				joinedYear: stats.joinedYear,
			});
		} catch (error) {
			console.error("Error fetching GitHub stats:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Setup periodic stats fetch
	useEffect(() => {
		fetchStats();
		const intervalId = setInterval(fetchStats, 10000);
		return () => clearInterval(intervalId);
	}, []);

	const experience = calculateExperience();

	// Stats configuration
	const stats: StatItem[] = [
		{
			num: experience.value,
			text: `${experience.unit} of Experience`,
			showPlus: experience.unit === "Years",
		},
		{
			num: 4,
			text: "Projects Completed",
		},
		{
			num: 5,
			text: "Technologies Hands On Experience",
		},
		{
			num: githubStats.commitCount,
			text: "GitHub Commits",
			loading: isLoading,
		},
	];

	// Animation variants
	const containerAnimation = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { delay: 2, duration: 0.4, ease: "easeIn" },
		},
	};

	const itemAnimation = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
		},
	};

	return (
		<main>
			<section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
				<div className="container mx-auto">
					<motion.div
						{...containerAnimation}
						className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none pb-4">
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								{...itemAnimation}
								className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
								<div className="relative">
									<div className="flex items-center">
										<CountUp
											end={stat.num}
											duration={2}
											delay={0}
											decimals={stat.num % 1 !== 0 ? 1 : 0}
											className="text-4xl xl:text-6xl font-extrabold"
										/>
										{stat.showPlus && (
											<span className="text-4xl xl:text-6xl font-extrabold">
												+
											</span>
										)}
									</div>
									{stat.loading && (
										<span className="absolute top-4 md:-top-4 -right-28 md:-right-24 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
									)}
								</div>
								<p
									className={`${
										stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
									} leading-snug text-white/80`}>
									{stat.text}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</main>
	);
};

export default Stats;
