"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function HomePageClient() {
	const heroRef = useRef(null);
	const featuresRef = useRef(null);
	const statsRef = useRef(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [activeTab, setActiveTab] = useState(0);
	
	const heroInView = useInView(heroRef, { once: true });
	const featuresInView = useInView(featuresRef, { once: true });
	const statsInView = useInView(statsRef, { once: true });

	const handleSearch = () => {
		if (searchQuery.trim()) {
			window.location.href = `/seo-audit?url=${encodeURIComponent(searchQuery)}`;
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const tools = [
		{
			id: 0,
			title: "Competitors analysis",
			description: "Find out who your real search competitors are",
			features: [
				"Get traffic, visibility, number of backlinks, and other SEO metrics",
				"Unveil hidden keyword opportunities based on competitors' keywords",
				"Check the ads of your competitors to speed up PPC campaign creation"
			],
			gradient: "from-blue-500 to-indigo-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			)
		},
		{
			id: 1,
			title: "Site audit",
			description: "Use detailed recommendations to improve your website without an SEO agency",
			features: [
				"Sort out technical issues on your site by their priority",
				"Schedule automatic checks and monitor if the number of issues found is decreasing",
				"Track the growth dynamics of the site optimization level"
			],
			gradient: "from-green-500 to-emerald-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			)
		},
		{
			id: 2,
			title: "Keyword research",
			description: "Fast keywords research on any topic",
			features: [
				"Keywords from 230 countries in Google with keyword difficulty, search volume, and cost per click in one tool",
				"Plan a budget and select only effective keywords for running ads with analyzing keywords PPC metrics"
			],
			gradient: "from-purple-500 to-pink-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			)
		},
		{
			id: 3,
			title: "Rank Tracker",
			description: "Monitor your keyword positions with real-time updates",
			features: [
				"Track keyword positions across multiple search engines",
				"Get alerts when your rankings change",
				"Analyze ranking trends and competitor movements"
			],
			gradient: "from-orange-500 to-red-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
				</svg>
			)
		},
		{
			id: 4,
			title: "API & Data Solutions",
			description: "Access our comprehensive SEO data through powerful APIs",
			features: [
				"Get access to our complete database through RESTful APIs",
				"Real-time data updates and comprehensive documentation",
				"Scalable solutions for enterprise-level applications"
			],
			gradient: "from-indigo-500 to-blue-500",
			icon: (
				<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
			)
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Hero Section */}
			<section ref={heroRef} className="relative overflow-hidden">
				<div className="container mx-auto px-4 py-20">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={heroInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto"
					>
						<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
							AI-Powered SEO Tools
						</h1>
						<p className="text-xl md:text-2xl text-gray-600 mb-8">
							Boost your website's search rankings with our comprehensive suite of SEO tools
						</p>
						
						{/* Search Bar */}
						<div className="max-w-2xl mx-auto mb-12">
							<div className="relative">
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Enter your website URL to analyze..."
									className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<button
									onClick={handleSearch}
									className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
								>
									Analyze
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section ref={featuresRef} className="py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={featuresInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Comprehensive SEO Suite
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Everything you need to dominate search rankings and outperform your competitors
						</p>
					</motion.div>

					{/* Tools Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{tools.map((tool, index) => (
							<motion.div
								key={tool.id}
								initial={{ opacity: 0, y: 20 }}
								animate={featuresInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
							>
								<div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mb-6`}>
									{tool.icon}
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h3>
								<p className="text-gray-600 mb-6">{tool.description}</p>
								<ul className="space-y-3">
									{tool.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="flex items-start">
											<svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
											<span className="text-gray-700">{feature}</span>
										</li>
									))}
								</ul>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section ref={statsRef} className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={statsInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="text-center text-white"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-16">
							Trusted by SEO Professionals
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
							<div>
								<div className="text-4xl font-bold mb-2">10M+</div>
								<div className="text-blue-100">Websites Analyzed</div>
							</div>
							<div>
								<div className="text-4xl font-bold mb-2">500K+</div>
								<div className="text-blue-100">Active Users</div>
							</div>
							<div>
								<div className="text-4xl font-bold mb-2">99.9%</div>
								<div className="text-blue-100">Uptime</div>
							</div>
							<div>
								<div className="text-4xl font-bold mb-2">24/7</div>
								<div className="text-blue-100">Support</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
